import { persistReducer } from "redux-persist";
import { rootReducer } from "./root-reducer";
import { persistConfig } from "../../configs/redux-persist-config";

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
