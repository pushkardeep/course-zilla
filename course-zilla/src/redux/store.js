import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./reducers/persist-reducer";
import { persistStore } from "redux-persist";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Allow non-serializable values for 'REGISTER' action
        ignoredActions: ["REGISTER", "persist/PERSIST"],
      },
    }),
});
export const persistore = persistStore(store);
