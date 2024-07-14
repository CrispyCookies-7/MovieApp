import { combineReducers } from "@reduxjs/toolkit";
import { filmsReducer, singleFilmReducer } from "./filmSlice.js";

export const rootReducer = combineReducers({
  films: filmsReducer,
  singleFilm: singleFilmReducer,
});
