import NavActionTypes from "./nav.types";

const INITIAL_STATE = {
  selectedNavButton: undefined,
  navButtonClicked: undefined,
  scrollToSectionFunction: undefined,
};

const NavReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NavActionTypes.SET_SELECTED_NAV_BUTTON:
      return {
        ...state,
        selectedNavButton: action.payload,
      };
    case NavActionTypes.TOGGLE_NAV_BUTTON_CLICKED:
      return {
        ...state,
        navButtonClicked: action.payload,
      };
    case NavActionTypes.SET_SCROLL_TO_SECTION_FUNCTION:
      return {
        ...state,
        scrollToSectionFunction: action.payload,
      };
    default:
      return state;
  }
};

export default NavReducer;
