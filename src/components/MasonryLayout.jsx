import Masonry from "react-masonry-css";
import { FilmsListItem } from "./FilmsListItem";

const breakpointColumns = {
  default: 4,
  4000: 8,
  3000: 6,
  2000: 5,
  1200: 3,
  1000: 2,
  500: 1,
};

export function MasonryLayout({ films }) {
  return (
    <Masonry
      className="masonry-layout mb-5 flex overflow-x-hidden"
      columnClassName="masonry-column mx-3"
      breakpointCols={breakpointColumns}
    >
      {films.map((film, idx) => (
        <FilmsListItem key={film.imdbID} idx={idx} film={film} />
      ))}
    </Masonry>
  );
}