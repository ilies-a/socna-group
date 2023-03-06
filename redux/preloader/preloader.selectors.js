import { createSelector } from "reselect";

export const selectPreloader = (state) => state.preloader;

export const selectPreloadIsComplete = createSelector(
  [selectPreloader],
  (preloader) => preloader.preloadIsComplete
);
