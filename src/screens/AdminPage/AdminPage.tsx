import React, { useState } from "react";
import { adminPageStyles } from "./adminPage.styles";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigator = useNavigate();
  
  return (
    <div style={adminPageStyles.container as React.CSSProperties}>
      <header style={adminPageStyles.header as React.CSSProperties}>
        <img
          src="src/assets/Cerro_Grande_La_Serena.jpg"
          style={adminPageStyles.backgroundImage as React.CSSProperties}
        />
        <img
          src="src/assets/Bajos.png"
          style={adminPageStyles.headerImage as React.CSSProperties}
        />
        <button
          style={
            hoveredButton === "header"
              ? {
                  ...adminPageStyles.headerButton,
                  backgroundColor: "#315bb7",
                  transform: "scale(1.05)",
                }
              : adminPageStyles.headerButton
          }
          onMouseEnter={() => setHoveredButton("header")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Administrador
        </button>
      </header>

      <main style={adminPageStyles.body as React.CSSProperties}>
        <div style={adminPageStyles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "students"
                ? {
                    ...adminPageStyles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : adminPageStyles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("students")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/students')} // Abrir ventana de registro de estudiantes
          >
            Gestión de estudiantes
          </button>
          <button
            style={
              hoveredButton === "subjects"
                ? {
                    ...adminPageStyles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : adminPageStyles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("subjects")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/subjects')} // Abrir ventana de gestión de asignaturas
          >
            Gestión de asignaturas
          </button>
          <button
            style={
              hoveredButton === "guardians"
                ? {
                    ...adminPageStyles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : adminPageStyles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("guardians")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/guardians')}
          >
            Gestión de apoderados
          </button>
        </div>
        <div style={adminPageStyles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "payments"
                ? {
                    ...adminPageStyles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : adminPageStyles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("payments")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/payments')} // Abrir ventana de control de pagos
          >
            Control de pagos
          </button>
          <button
            style={
              hoveredButton === "employees"
                ? {
                    ...adminPageStyles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : adminPageStyles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("employees")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/employees')} // Abrir ventana de registro de empleados
          >
            Gestión de empleados
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
