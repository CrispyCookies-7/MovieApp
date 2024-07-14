import axios from 'axios';
import { filmsActions } from '../filmSlice.js';

const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_KEY;

export const fetchFilms = (page, searchQuery) => async (dispatch, getState) => {
  const filmList = getState().films.films;
  dispatch(filmsActions.filmsFetch());

  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: API_KEY,
        s: searchQuery,
        page,
      },
    });

    if (response.data.Error) {
      if (filmList.length === 0) {
        dispatch(filmsActions.filmsFetchFailure(response.data.Error));
      } else {
        dispatch(filmsActions.filmsFetchLoaded());
      }
      return;
    }

    dispatch(filmsActions.filmsFetchSuccess(response.data.Search));
    dispatch(filmsActions.filmsTotalResults(response.data.totalResults));
  } catch (error) {
    if (error.response) {
      dispatch(filmsActions.filmsFetchFailure(error.message));
    }
  }
};

export const resetFilms = () => (dispatch) => {
  dispatch(filmsActions.filmsDataReset());
};

export const fetchFilmPlot = (id) => async (dispatch) => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: API_KEY,
        i: id,
      },
    });

    if (response.data.Error) {
      dispatch(filmsActions.filmsFetchFailure(response.data.Error));
      return;
    }

    dispatch(filmsActions.filmsAddPlot(response.data));
  } catch (error) {
    if (error.response) {
      dispatch(filmsActions.filmsFetchFailure(error.message));
    }
  }
};