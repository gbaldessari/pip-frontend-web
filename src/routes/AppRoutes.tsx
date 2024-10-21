import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import MainPage from "../screens/MainPage/MainPage";
import AdminPage from "../screens/AdminPage/AdminPage";
import EvaluationsPage from "../screens/EvaluationsPage/EvaluationsPage";
import DocumentsPage from "../screens/DocumentsPage/DocumentsPage";
import ReportsPage from "../screens/ReportsPage/ReportsPage";
import ServicesPage from "../screens/ServicesPage/ServicesPage";
import ComplaintsPage from "../screens/ComplaintsPage/ComplaintsPage";
import StudentsPage from "../screens/StudentsPage/StudentsPage";
import SubjectsPage from "../screens/SubjectsPage/SubjectsPage";
import AttendancePage from "../screens/AttendancePage/AttendancePage";
import PaymentsPage from "../screens/PaymentsPage/PaymentsPage";
import EmployeesPage from "../screens/EmployeesPage/EmployeesPage";
import GuardiansPage from "../screens/GuardiansPage/GuardiansPage";
import TeacherPage from "../screens/TeacherPage/TeacherPage";
import ForgottenPage from "../screens/ForgottenPage/ForgottenPage";
import RecoverPage from "../screens/RecoverPage/RecoverPage";
import { useUser } from '../routes/UserContext'; // Ajusta la ruta según tu estructura

export const AppRoutes: React.FC<{}> = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>; // Puedes mostrar un loader aquí
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/forgotten" element={<ForgottenPage />} />
        <Route path="/recover" element={<RecoverPage />} />
        <Route path="/main" element={user?.rol === 'apoderado' ? <MainPage /> : <Navigate to="/" />} />
        <Route path="/admin" element={user?.rol === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
        <Route path="/teacher" element={user?.rol === 'profesor' ? <TeacherPage /> : <Navigate to="/" />} />
        <Route path="/evaluations" element={<EvaluationsPage />} />
        <Route path="/documents" element={<DocumentsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/complaints" element={<ComplaintsPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/attendance" element={<AttendancePage />} />
        <Route path="/payments" element={<PaymentsPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/guardians" element={<GuardiansPage />} />
      </Routes>
    </div>
  );
};
