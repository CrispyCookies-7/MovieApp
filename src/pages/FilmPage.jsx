import { useCallback, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux"; 
import { useNavigate, useParams } from "react-router-dom"; 
import noPoster from "../assets/no-poster.jpg"; 
import { motion } from "framer-motion"; 
import { validateIsStringApplicable, validateStringStartsWith, getHigherResolutionImage } from "../utils/helperFunctions"; 
import { useActions } from "../hooks/useActions"; 
import { singleFilmActions } from "../store/filmSlice.js"; 
import { fadeIn } from "../utils/animation"; 
import './FilmPage.css'; 

export function FilmPage() { 
  const dispatch = useDispatch(); 
  const { id } = useParams(); 
  const { fetchFilm } = useActions(); 
  const { film, loading, error } = useSelector((state) => state.singleFilm); 
  const navigate = useNavigate(); 

  const handleBack = useCallback(() => { 
    navigate("/"); 
  }, [navigate]); 

  useEffect(() => { 
    if (!validateStringStartsWith(id, "tt")) { 
      dispatch(singleFilmActions.fetchFilmError("Incorrect IMDb ID.")); 
      return; 
    } 

    fetchFilm(id); 
  }, [id]); 

  if (loading) { 
    return ( 
      <div className="film-page"> 
        <h1 className="loading-text">Loading...</h1> 
      </div> 
    ); 
  } 

  if (error) { 
    return ( 
      <div className="film-page"> 
        <h1 className="error-text">{error}</h1> 
        <motion.button 
          whileHover={{ scale: 1.1 }} 
          className="back-button" 
          onClick={handleBack} 
        > 
          Back 
        </motion.button> 
      </div> 
    ); 
  } 

  return ( 
    <div className="film-page"> 
      <div className="film-content"> 
        <motion.div 
          className="poster-container" 
          variants={fadeIn("right", "spring", 0.3, 0.5)} 
          initial="hidden" 
          animate="show" 
        > 
          <img 
            src={ 
              validateIsStringApplicable(film.Poster) 
                ? getHigherResolutionImage(film.Poster, 1000) 
                : noPoster 
            } 
            className="poster-image" 
            alt="Film Poster" 
          /> 
        </motion.div> 
        <div className="film-details"> 
          <motion.h1 
            className="film-title" 
            variants={fadeIn("up", "spring", 0.5, 0.5)} 
            initial="hidden" 
            animate="show" 
          > 
            {`${film.Title} (${film.Year})`} 
          </motion.h1> 
          <motion.p 
            className="film-plot" 
            variants={fadeIn("up", "spring", 0.7, 0.5)} 
            initial="hidden" 
            animate="show" 
          > 
            {validateIsStringApplicable(film.Plot) 
              ? film.Plot 
              : "No plot available."} 
          </motion.p> 
          <motion.h3 
            className="about-film" 
            variants={fadeIn("up", "spring", 0.9, 0.5)} 
            initial="hidden" 
            animate="show" 
          > 
            About the film: 
          </motion.h3> 
          <motion.div 
            className="film-info-grid" 
            variants={fadeIn("up", "spring", 1.1, 0.5)} 
            initial="hidden" 
            animate="show" 
          > 
            <div className="info-label" data-icon="&#xf073;"> 
              Released 
            </div> 
            <div className="info-value">{film.Released}</div> 
            <div className="info-label" data-icon="&#xf007;"> 
              Director 
            </div> 
            <div className="info-value">{film.Director}</div> 
            <div className="info-label" data-icon="&#xf0f3;"> 
              Actors 
            </div> 
            <div className="info-value">{film.Actors}</div> 
            <div className="info-label" data-icon="&#xf02d;">
              Genres 
            </div> 
            <div className="info-value">{film.Genre}</div> 
            <div className="info-label" data-icon="&#xf017;"> 
              Runtime 
            </div> 
            <div className="info-value">{film.Runtime}</div> 
            <div className="info-label" data-icon="&#xf0ac;"> 
              Country 
            </div> 
            <div className="info-value">{film.Country}</div> 
            <div className="info-label" data-icon="&#xf005;"> 
              IMDb Rating 
            </div> 
            <div className="info-value">{film.imdbRating}</div> 
          </motion.div> 
        </div> 
      </div> 
      <motion.button 
        variants={fadeIn("up", "spring", 1.3, 0.5)} 
        initial="hidden" 
        animate="show" 
        whileHover={{ scale: 1.1 }} 
        className="back-button" 
        onClick={handleBack} 
      > 
        Back 
      </motion.button> 
    </div> 
  ); 
}