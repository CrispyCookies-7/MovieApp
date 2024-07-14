import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FilmsList, Search } from "../components";
import { getStorageValue } from "../utils/helperFunctions";
import { useActions } from "../hooks/useActions";
import { useDebounce } from "../hooks/useDebounce.js";
import { textVariant } from "../utils/animation.js";
import './MainPage.css';

export function MainPage() {
  const [searchQuery, setSearchQuery] = useState(
    getStorageValue("searchQuery", "Star Wars")
  );
  const [page, setPage] = useState(1);
  const { fetchFilms, resetFilms } = useActions();
  const { error, totalResults } = useSelector((state) => state.films);
  const debouncedFetchFilms = useDebounce(fetchFilms, 500);

  useEffect(() => {
    if (page > Math.ceil(totalResults / 10)) {
      return;
    }

    debouncedFetchFilms(page, searchQuery.trim());
  }, [page, searchQuery]);

  useEffect(() => {
    resetFilms();
    setPage(1);
    window.localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  return (
    <div className="main-container dark-mode md-my-10">
      <motion.h1
        className="iridescent-gradient md-text-7xl"
        variants={textVariant(0.5)}
        initial="hidden"
        animate="show"
      >
        What will we watch today?
      </motion.h1>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <FilmsList setPage={setPage} />
      {page > Math.ceil(totalResults / 10) && !error && (
        <div className="no-more-films">
          No more films
        </div>
      )}
    </div>
  );
}