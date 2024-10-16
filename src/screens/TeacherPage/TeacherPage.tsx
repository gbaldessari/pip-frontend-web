import React, { useState } from "react";
import { teacherPageStyles as styles } from "./teacherPage.styles";
import { useNavigate } from "react-router-dom";

const TeacherPage: React.FC = () => {
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
          Profesor
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
            onClick={() => navigator('/attendance')} // Abrir ventana de control de asistencia
          >
            Control de asistencia
          </button>
        </div>
      </main>
    </div>
  );
};

export default TeacherPage;
