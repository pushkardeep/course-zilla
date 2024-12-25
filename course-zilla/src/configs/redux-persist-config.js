import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
  blacklist: ["user", "loading", "flashMessage", "courses", "watch"]
};
