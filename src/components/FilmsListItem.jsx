import { useEffect } from "react";
import { motion } from "framer-motion";
import { getHigherResolutionImage, validateIsStringApplicable } from "../utils/helperFunctions";
import { useActions } from "../hooks/useActions";
import { fadeIn } from "../utils/animation";
import { useNavigate } from "react-router-dom";
import noPoster from "../assets/no-poster.jpg";

export function FilmsListItem({ idx, film }) {
  const navigate = useNavigate();
  const { fetchFilmPlot } = useActions();

  useEffect(() => {
    fetchFilmPlot(film.imdbID);
  }, [fetchFilmPlot, film.imdbID]);

  const handleNavigation = () => {
    navigate(`/${film.imdbID}`);
  };

  const posterSrc = validateIsStringApplicable(film.Poster)
    ? getHigherResolutionImage(film.Poster, 1000)
    : noPoster;

  const plotText = validateIsStringApplicable(film.Plot)
    ? film.Plot
    : "No plot available";

  return (
    <motion.div
      className="film-item my-6 w-full cursor-pointer rounded-lg border-gray-700 bg-gray-800 shadow-lg md:my-8"
      variants={fadeIn(idx % 2 === 0 ? "right" : "left", "spring", 0.2, 0.5)}
      initial="hidden"
      whileInView="show"
      whileHover={{ scale: 1.05 }}
      onClick={handleNavigation}
    >
      <img
        className="w-full rounded-t-lg"
        src={posterSrc}
        alt="Film Poster"
      />
      <div className="content p-4">
        <h5 className="title mb-2 text-2xl font-bold tracking-tight text-white">
          {film.Title}
        </h5>
        <div className="details">
          <p className="mb-3 text-sm font-semibold text-gray-200">
            {`Released: ${film.Year}`}
          </p>
          <p className="mb-3 font-normal text-white">
            {plotText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}