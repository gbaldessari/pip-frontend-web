import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import MainPage from "../screens/MainPage/MainPage";
import AdminPage from "../screens/AdminPage/AdminPage";
import EvaluationsPage from "../screens/EvaluationsPage/EvaluationPage";
import DocumentsPage from "../screens/DocumentsPage/DocumentsPage";
import ReportsPage from "../screens/ReportsPage/ReportsPage";
import ServicesPage from "../screens/ServicesPage/ServicesPage";
import ComplaintsPage from "../screens/ComplaintsPage/ComplaintsPage";
import StudentsPage from "../screens/StudentsPage/StudentsPage";
import SubjectsPage from "../screens/SubjectsPage/SubjectsPage";
import AttendancePage from "../screens/AttendancePage/AttendancePage";
import PaymentsPage from "../screens/PaymentsPage/PaymentsPage";
import EmployeesPage from "../screens/EmployeesPage/EmployeesPage";

export const AppRoutes: React.FC<{}> = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/main" element={<MainPage/>}/>
        <Route path="/admin" element={<AdminPage/>}/>
        <Route path="/evaluations" element={<EvaluationsPage/>}/>
        <Route path="/documents" element={<DocumentsPage/>}/>
        <Route path="/reports" element={<ReportsPage/>}/>
        <Route path="/services" element={<ServicesPage/>}/>
        <Route path="/complaints" element={<ComplaintsPage/>}/>
        <Route path="/students" element={<StudentsPage/>}/>
        <Route path="/subjects" element={<SubjectsPage/>}/>
        <Route path="/attendance" element={<AttendancePage/>}/>
        <Route path="/payments" element={<PaymentsPage/>}/>
        <Route path="/employees" element={<EmployeesPage/>}/>
        {/**
        <Route path="/main" element={<ProtectedRoute><Main/></ProtectedRoute>} />
        */}
      </Routes>
    </div>
  );
};
