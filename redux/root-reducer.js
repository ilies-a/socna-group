import { combineReducers } from "redux";
import preloaderReducer from "./preloader/preloader.reducer";
import headerReducer from "./header/header.reducer";
import navReducer from "./nav/nav.reducer";

const rootReducer = combineReducers({
  preloader: preloaderReducer,
  header: headerReducer,
  nav: navReducer,
});

export default rootReducer;
