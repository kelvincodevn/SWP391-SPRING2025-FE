import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
    {/* <BrowserRouter> */}
      <App />
      <ToastContainer /> 
    {/* </BrowserRouter > */}
    </>
  </React.StrictMode>
);
