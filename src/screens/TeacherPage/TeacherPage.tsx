import React, { useState } from "react";
import { teacherPageStyles as styles } from "./teacherPage.styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../routes/UserContext";

const TeacherPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigator = useNavigate();
  const auth = getAuth();
  const { user } = useUser();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        alert("Se ha cerrado su sesión satisfactoriamente");
        navigator("/");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión: ", error);
      });
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Cerro_Grande_La_Serena.jpg?alt=media"
          style={styles.backgroundImage as React.CSSProperties}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media"
          style={styles.headerImage as React.CSSProperties}
        />
        <div style={styles.userInfo}>
          <h2 style={styles.welcomeText}>
            Bienvenido, {user?.nombre} {user?.apellido}
          </h2>
        </div>
        <button
          style={styles.logoutButton}
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </header>

      <main style={styles.body as React.CSSProperties}>
        <div style={styles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "attendance"
                ? {
                  ...styles.bodyButton,
                  backgroundColor: "#315b73",
                  transform: "scale(1.05)",
                }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("attendance")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/attendance")}
          >
            Control de asistencia
          </button>
          <button
            style={
              hoveredButton === "evaluations"
                ? {
                  ...styles.bodyButton,
                  backgroundColor: "#315b73",
                  transform: "scale(1.05)",
                }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("evaluations")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/grades-admin")}
          >
            Control de Evaluaciones
          </button>

          <button
            style={
              hoveredButton === "forum"
                ? {
                  ...styles.bodyButton,
                  backgroundColor: "#315b73",
                  transform: "scale(1.05)",
                }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("forum")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/teacher-forum")}
          >
            Foro
          </button>
        </div>
      </main>
    </div>
  );
};

export default TeacherPage;
