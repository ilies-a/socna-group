import HeaderActionTypes from "./header.types";

export const setHeaderIsReduced = (isReduced) => ({
  type: HeaderActionTypes.SET_HEADER_IS_REDUCED,
  payload: isReduced,
});
