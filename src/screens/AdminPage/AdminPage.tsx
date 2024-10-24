import React, { useState } from "react";
import { adminPageStyles as styles} from "./adminPage.styles";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigator = useNavigate();
  
  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <img
          src="src/assets/Cerro_Grande_La_Serena.jpg"
          style={styles.backgroundImage as React.CSSProperties}
        />
        <img
          src="src/assets/Bajos.png"
          style={styles.headerImage as React.CSSProperties}
        />
        <button
          style={
            hoveredButton === "header"
              ? {
                  ...styles.headerButton,
                  backgroundColor: "#315bb7",
                  transform: "scale(1.05)",
                }
              : styles.headerButton
          }
          onMouseEnter={() => setHoveredButton("header")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Administrador
        </button>
      </header>

      <main style={styles.body as React.CSSProperties}>
        <div style={styles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "students"
                ? {
                    ...styles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("students")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/students')}
          >
            Gestión de estudiantes
          </button>
          <button
            style={
              hoveredButton === "subjects"
                ? {
                    ...styles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("subjects")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/subjects')}
          >
            Gestión de asignaturas
          </button>
          <button
            style={
              hoveredButton === "guardians"
                ? {
                    ...styles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("guardians")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/guardians')}
          >
            Gestión de apoderados
          </button>
        </div>
        <div style={styles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "payments"
                ? {
                    ...styles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("payments")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/payments')}
          >
            Control de pagos
          </button>
          <button
            style={
              hoveredButton === "employees"
                ? {
                    ...styles.bodyButton,
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : styles.bodyButton
            }
            onMouseEnter={() => setHoveredButton("employees")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/employees')}
          >
            Gestión de empleados
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
