import React from "react";
import { Route, Routes } from "react-router-dom";
import MasterLayout from "../pages/MasterLayout";
import Login from "../feature/Auth/Login";

const AppRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<MasterLayout />} />

        <Route path="/auth" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
