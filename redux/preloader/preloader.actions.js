import PreloaderActionTypes from "./preloader.types";

export const setPreloadIsComplete = (isComplete) => ({
  type: PreloaderActionTypes.SET_PRELOAD_IS_COMPLETE,
  payload: isComplete,
});
