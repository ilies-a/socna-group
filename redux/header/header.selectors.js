import { createSelector } from "reselect";

export const selectHeader = (state) => state.header;

export const selectHeaderIsReduced = createSelector(
  [selectHeader],
  (header) => header.headerIsReduced
);
