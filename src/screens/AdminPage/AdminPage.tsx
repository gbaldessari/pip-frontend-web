import React, { useState } from "react";
import { adminPageStyles as styles } from "./adminPage.styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../routes/UserContext";

const AdminPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { user } = useUser();
  const navigator = useNavigate();
  const auth = getAuth();

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
            style={hoveredButton === "students" ? { ...styles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : styles.bodyButton}
            onMouseEnter={() => setHoveredButton("students")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/students")}
          >
            Gestión de estudiantes
          </button>
          <button
            style={hoveredButton === "subjects" ? { ...styles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : styles.bodyButton}
            onMouseEnter={() => setHoveredButton("subjects")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/subjects")}
          >
            Gestión de asignaturas
          </button>
          <button
            style={hoveredButton === "guardians" ? { ...styles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : styles.bodyButton}
            onMouseEnter={() => setHoveredButton("guardians")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/guardians")}
          >
            Gestión de apoderados
          </button>
        </div>

        <div style={styles.subBody as React.CSSProperties}>
          <button
            style={hoveredButton === "payments" ? { ...styles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : styles.bodyButton}
            onMouseEnter={() => setHoveredButton("payments")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/payments")}
          >
            Control de pagos
          </button>
          <button
            style={hoveredButton === "employees" ? { ...styles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : styles.bodyButton}
            onMouseEnter={() => setHoveredButton("employees")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/employees")}
          >
            Gestión de empleados
          </button>
          <button
            style={hoveredButton === "admin" ? { ...styles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : styles.bodyButton}
            onMouseEnter={() => setHoveredButton("admin")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/admin-creator")}
          >
            Crear usuario de administrador
          </button>
        </div>
      </main>
    </div>
  );

};

export default AdminPage;
