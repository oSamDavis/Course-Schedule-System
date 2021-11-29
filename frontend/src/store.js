import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { contactReducer } from "./reducers/contactReducer";
import { reportReducer } from "./reducers/reportReducer";

const reducers = combineReducers({
  contacts: contactReducer,
  reports: reportReducer,
});

// default state of project
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
