import NavActionTypes from "./nav.types";

export const setSelectedNavButton = (navButtonName) => ({
  type: NavActionTypes.SET_SELECTED_NAV_BUTTON,
  payload: navButtonName,
});

export const toogleNavButtonClicked = (toggle) => ({
  type: NavActionTypes.TOGGLE_NAV_BUTTON_CLICKED,
  payload: toggle,
});

export const setScrollToSectionFunction = (func) => ({
  type: NavActionTypes.SET_SCROLL_TO_SECTION_FUNCTION,
  payload: func,
});
