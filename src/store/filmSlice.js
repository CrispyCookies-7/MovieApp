import { createSlice } from "@reduxjs/toolkit";

const initialFilmsState = {
  films: [],
  loading: false,
  error: null,
  totalResults: 20,
};

const filmsSlice = createSlice({
  name: "films",
  initialState: initialFilmsState,
  reducers: {
    filmsFetch(state) {
      state.loading = true;
    },
    filmsFetchLoaded(state) {
      state.loading = false;
    },
    filmsFetchSuccess(state, action) {
      state.films = state.films.concat(action.payload);
      state.loading = false;
    },
    filmsFetchFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    filmsDataReset(state) {
      state.films = [];
      state.loading = false;
      state.error = null;
    },
    filmsTotalResults(state, action) {
      state.totalResults = action.payload;
    },
    filmsAddPlot(state, action) {
      const updatedFilms = state.films.map((film) =>
        film.imdbID === action.payload.imdbID
          ? { ...film, Plot: action.payload.Plot }
          : film
      );
      state.films = updatedFilms;
    },
  },
});


const initialSingleFilmState = {
  film: {},
  loading: false,
  error: null,
};

const singleFilmSlice = createSlice({
  name: "singleFilm",
  initialState: initialSingleFilmState,
  reducers: {
    fetchFilm(state) {
      state.loading = true;
    },
    fetchFilmSuccess(state, action) {
      state.film = action.payload;
      state.loading = false;
    },
    fetchFilmError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const filmsActions = filmsSlice.actions;
export const filmsReducer = filmsSlice.reducer;
export const singleFilmActions = singleFilmSlice.actions;
export const singleFilmReducer = singleFilmSlice.reducer;