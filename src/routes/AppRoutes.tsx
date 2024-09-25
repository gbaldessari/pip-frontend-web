import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import MainPage from "../screens/MainPage/MainPage";
import AdminPage from "../screens/AdminPage/AdminPage";


export const AppRoutes: React.FC<{}> = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        {/**
        <Route path="/main" element={<ProtectedRoute><Main/></ProtectedRoute>} />
        */}
      </Routes>
    </div>
  );
};
