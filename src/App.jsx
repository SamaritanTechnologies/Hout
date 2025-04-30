import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "./providers";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { I18nextProvider } from "react-i18next";
import i18n from "./providers/Localization";

import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={"translation"}>
        <AuthProvider>
          <Routes />
          <ToastContainer position="bottom-right" />
        </AuthProvider>
      </I18nextProvider>
    </Provider>
  );
}
