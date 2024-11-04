import React, { Fragment, useEffect } from "react";
import Routes from "./Routes";
import { AuthProvider } from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "fr",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
    const removeChildNodes = () => {
      const translateElement = document.getElementsByClassName('skiptranslate goog-te-gadget')[0];
      if (translateElement) {
        console.log(translateElement, "elemenet")
        for (let i = translateElement.childNodes.length - 1; i >= 0; i--) {
          const childNode = translateElement.childNodes[i];
          if (childNode.nodeType === Node.TEXT_NODE || (childNode.nodeType === Node.ELEMENT_NODE && childNode.tagName.toLowerCase() === 'span')) {
            translateElement.removeChild(childNode); // Remove the child node
          }
        }
      }
    };
    
  
    // Set a delay to ensure the Google Translate widget is loaded
    setTimeout(() => {
      removeChildNodes();
    }, 1000); 
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        <Routes />
        <ToastContainer position="bottom-right" />
      </AuthProvider>
    </Provider>
  );
}
