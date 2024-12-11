import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../screens/HomePage/HomePage";
import RegisterPage from "../screens/ApoderadoRegisterPage/RegisterPage";
import ForgottenPage from "../screens/ForgottenPage/ForgottenPage";
import RecoverPage from "../screens/RecoverPage/RecoverPage";
import PasswordResetPage from "../screens/PasswordReset/PasswordResetPage";
import EvaluationsPage from "../screens/EvaluationsPage/EvaluationsPage";
import MainPage from "../screens/MainPage/MainPage";
import AdminCreatorPage from "../screens/AdminCreatorPage/AdminCreatorPage";
import AdminPage from "../screens/AdminPage/AdminPage";
import TeacherPage from "../screens/TeacherPage/TeacherPage";
import { useUser } from "./UserContext";
import DocumentsPage from "../screens/DocumentsPage/DocumentsPage";
import ReportsPage from "../screens/ReportsPage/ReportsPage";
import ServicesPage from "../screens/ServicesPage/ServicesPage";
import GuardianForumPage from "../screens/GuardianForumPage/GuardianForumPage";
import StudentsPage from "../screens/StudentsPage/StudentsPage";
import AttendancePage from "../screens/AttendancePage/AttendancePage";
import EmployeesPage from "../screens/EmployeesPage/EmployeesPage";
import GuardiansPage from "../screens/GuardiansPage/GuardiansPage";
import PaymentsPage from "../screens/PaymentsPage/PaymentsPage";
import SubjectsPage from "../screens/SubjectsPage/SubjectsPage";
import GradesAdminPage from "../screens/GradesAdminPage/GradesAdminPage";
import TeacherForumPage from "../screens/TeacherForumPage/TeacherForumPage";


export const AppRoutes: React.FC<{}> = () => {
  const { user, loading } = useUser();

  if (loading) {
      return <div>Cargando... Por favor espere unos instantes</div>;
  }

  return (
      <div>
          <Routes>
              {/* Rutas públicas */}
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgotten" element={<ForgottenPage />} />
              <Route path="/recover" element={<RecoverPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />

              {user && (
                  <>
                      <Route path="/main" element={user.rol === 'apoderado' ? <MainPage /> : <Navigate to="/" />} />
                      <Route path="/admin" element={user.rol === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
                      <Route path="/admin-creator" element={user.rol === 'admin' ? <AdminCreatorPage /> : <Navigate to="/" />} />
                      <Route path="/teacher" element={user.rol === 'profesor' ? <TeacherPage /> : <Navigate to="/" />} />
                      <Route path="/evaluations" element={<EvaluationsPage />} />
                      <Route path="/documents" element={<DocumentsPage />} />
                      <Route path="/reports" element={<ReportsPage />} />
                      <Route path="/services" element={<ServicesPage />} />
                      <Route path="/guardian-forum" element={<GuardianForumPage />} />
                      <Route path="/students" element={<StudentsPage />} />
                      <Route path="/subjects" element={<SubjectsPage />} />
                      <Route path="/attendance" element={<AttendancePage />} />
                      <Route path="/payments" element={<PaymentsPage />} />
                      <Route path="/employees" element={<EmployeesPage />} />
                      <Route path="/guardians" element={<GuardiansPage />} />
                      <Route path="/grades-admin" element={<GradesAdminPage />} /> 
                      <Route path="/teacher-forum" element={<TeacherForumPage />} />
                  </>
              )}
          </Routes>
      </div>
  );
};
