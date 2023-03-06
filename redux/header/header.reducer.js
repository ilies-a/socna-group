import HeaderActionTypes from "./header.types";

const INITIAL_STATE = {
  headerIsReduced: false,
};

const HeaderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case HeaderActionTypes.SET_HEADER_IS_REDUCED:
      return {
        ...state,
        headerIsReduced: action.payload,
      };
    default:
      return state;
  }
};

export default HeaderReducer;
