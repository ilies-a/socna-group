import { createSelector } from "reselect";

export const selectNav = (state) => state.nav;

export const selectSelectedNavButton = createSelector(
  [selectNav],
  (nav) => nav.selectedNavButton
);

export const selectNavButtonClicked = createSelector(
  [selectNav],
  (nav) => nav.navButtonClicked
);

export const selectScrollToSectionFunction = createSelector(
  [selectNav],
  (nav) => nav.scrollToSectionFunction
);
