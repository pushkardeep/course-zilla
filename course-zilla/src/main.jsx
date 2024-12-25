import { createRoot } from "react-dom/client";

import { persistore, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import { Flowbite } from "flowbite-react";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistore}>
      <Flowbite>
        <App />
      </Flowbite>
    </PersistGate>
  </Provider>
);
