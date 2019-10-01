import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import throttle from "lodash/throttle";
import editorReducer, { editorTypes } from "./components/editor/duck";
import { saveState, loadState } from "./localStorage";

const configureStore = () => {
  const rootReducer = combineReducers({
    [editorTypes.NAMESPACE]: editorReducer
  });

  const store = createStore(rootReducer, loadState(), applyMiddleware(thunk));

  store.subscribe(throttle(() => saveState(store.getState()), 1000));

  return store;
};

export default configureStore;
