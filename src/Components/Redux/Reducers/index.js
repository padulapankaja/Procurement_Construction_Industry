import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authReducer";

const persistconfig = {
  key: "root",
  storage,
  whitelist: ["cart", "auth", "wishlist"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

export const root = (state, action) =>
  rootReducer(action.type === "USER_LOGOUT" ? undefined : state, action);
export default persistReducer(persistconfig, root);
