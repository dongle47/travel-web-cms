import React from "react";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "../pages/MasterLayout";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MasterLayout />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
