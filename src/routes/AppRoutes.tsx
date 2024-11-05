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

              {/* Rutas protegidas */}
              {user && (
                  <>
                      <Route path="/main" element={user.rol === 'apoderado' ? <MainPage /> : <Navigate to="/" />} />
                      <Route path="/admin" element={user.rol === 'admin' ? <AdminPage /> : <Navigate to="/" />} />
                      <Route path="/admin-creator" element={user.rol === 'admin' ? <AdminCreatorPage /> : <Navigate to="/" />} />
                      <Route path="/teacher" element={user.rol === 'profesor' ? <TeacherPage /> : <Navigate to="/" />} />
                      <Route path="/evaluations" element={<EvaluationsPage />} />
                      {/* Agregar otras rutas protegidas aquí */}
                  </>
              )}
          </Routes>
      </div>
  );
};
