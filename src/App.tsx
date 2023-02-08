import React, { useState } from "react";
import "./assets/styles/main.css";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />

        <ToastContainer
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          pauseOnHover={false}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
