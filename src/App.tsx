import React, { useState } from "react";
import "./assets/styles/main.css";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./router/AppRoutes";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
