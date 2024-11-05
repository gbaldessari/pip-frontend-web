import React, { useState} from "react";
import { adminPageStyles } from "./adminPage.styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../routes/UserContext"; // Asegúrate de importar tu UserContext

const AdminPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const { user } = useUser(); // Obtenemos el contexto del usuario
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
    <div style={adminPageStyles.container as React.CSSProperties}>
      <header style={adminPageStyles.header as React.CSSProperties}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Cerro_Grande_La_Serena.jpg?alt=media"
          style={adminPageStyles.backgroundImage as React.CSSProperties}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media"
          style={adminPageStyles.headerImage as React.CSSProperties}
        />
        <div style={adminPageStyles.userInfo}>
          <h2 style={adminPageStyles.welcomeText}>
            Bienvenido, {user?.nombre} {user?.apellido}
          </h2>
        </div>
        <button style={adminPageStyles.adminButton}>
          Administrador
        </button>
      </header>
  
      <main style={adminPageStyles.body as React.CSSProperties}>
        <div style={adminPageStyles.subBody as React.CSSProperties}>
          <button
            style={hoveredButton === "students" ? { ...adminPageStyles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : adminPageStyles.bodyButton}
            onMouseEnter={() => setHoveredButton("students")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/students")}
          >
            Gestión de estudiantes
          </button>
          <button
            style={hoveredButton === "subjects" ? { ...adminPageStyles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : adminPageStyles.bodyButton}
            onMouseEnter={() => setHoveredButton("subjects")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/subjects")}
          >
            Gestión de asignaturas
          </button>
          <button
            style={hoveredButton === "guardians" ? { ...adminPageStyles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : adminPageStyles.bodyButton}
            onMouseEnter={() => setHoveredButton("guardians")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/guardians")}
          >
            Gestión de apoderados
          </button>
        </div>
  
        <div style={adminPageStyles.subBody as React.CSSProperties}>
          <button
            style={hoveredButton === "payments" ? { ...adminPageStyles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : adminPageStyles.bodyButton}
            onMouseEnter={() => setHoveredButton("payments")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/payments")}
          >
            Control de pagos
          </button>
          <button
            style={hoveredButton === "employees" ? { ...adminPageStyles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : adminPageStyles.bodyButton}
            onMouseEnter={() => setHoveredButton("employees")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/employees")}
          >
            Gestión de empleados
          </button>
          <button
            style={hoveredButton === "admin" ? { ...adminPageStyles.bodyButton, backgroundColor: "#315b73", transform: "scale(1.05)" } : adminPageStyles.bodyButton}
            onMouseEnter={() => setHoveredButton("admin")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator("/admin-creator")}
          >
            Crear usuario de administrador
          </button>
        </div>
      </main>
  
      {/* Botón de Cerrar Sesión movido al final */}
      <button
        style={adminPageStyles.logoutButton}
        onClick={handleLogout}
      >
        Cerrar sesión
      </button>
    </div>
  );
  
};

export default AdminPage;
