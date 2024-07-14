import axios from 'axios';
import { singleFilmActions } from '../filmSlice.js';

const OMDB_API_URL = 'https://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_KEY;

export const fetchFilm = (id) => async (dispatch) => {
  dispatch(singleFilmActions.fetchFilm());

  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full',
      },
    });

    if (response.data.Error) {
      dispatch(singleFilmActions.fetchFilmError(response.data.Error));
      return;
    }

    dispatch(singleFilmActions.fetchFilmSuccess(response.data));
  } catch (error) {

    if (error.response) {
      dispatch(singleFilmActions.fetchFilmError(error.message));
    }
  }
};