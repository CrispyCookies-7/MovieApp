import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { MasonryLayout } from "./MasonryLayout";
import { Sort } from "./Sort";
import { AiOutlineArrowUp } from "react-icons/ai";
import "./styles.css";

export function FilmsList({ setPage }) {
  const [isButtonToTopVisible, setIsButtonToTopVisible] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const intersectionRef = useRef(null);
  const { films, loading, error } = useSelector((state) => state.films);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onScroll = useCallback(() => {
    setIsButtonToTopVisible(window.scrollY > 1000);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [onScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    if (intersectionRef.current) {
      observer.observe(intersectionRef.current);
    }

    return () => {
      if (intersectionRef.current) {
        observer.unobserve(intersectionRef.current);
      }
    };
  }, [setPage]);

  const sortedFilms = React.useMemo(() => {
    return films.slice().sort((a, b) => {
      const dateA = new Date(a.Year.split("–")[0]);
      const dateB = new Date(b.Year.split("–")[0]);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [films, sortOrder]);

  if (error) {
    return (
      <h3 className="mt-5 text-2xl font-bold text-red-600">
        {error === "Incorrect IMDb ID." ? "Enter movie name." : error}
        <div className="h-10 w-full" ref={intersectionRef} />
      </h3>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
      <div className="flex flex-row flex-wrap items-center justify-center">
        {!error && <MasonryLayout films={sortedFilms} />}
        {loading && (
          <div className="h-8 w-full text-center text-2xl font-bold text-black dark:text-white">
            Loading...
          </div>
        )}
        {isButtonToTopVisible && (
          <button
            className="fixed bottom-0 mb-6 rounded-full bg-pink-500 px-4 py-4 font-bold text-white hover:bg-pink-700"
            onClick={scrollToTop}
          >
            <AiOutlineArrowUp fontSize={32} fontWeight="bold" />
          </button>
        )}
        <div className="h-10 w-full" ref={intersectionRef} />
      </div>
    </div>
  );
}