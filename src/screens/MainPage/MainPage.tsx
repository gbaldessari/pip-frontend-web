import React, { useState, useEffect } from "react";
import { mainPageStyles as styles} from "./mainPage.styles";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const navigator = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getBodyButtonStyles = () => {
    if (windowWidth < 768) {
      return {
        ...styles.bodyButton,
        padding: "1.5rem 3rem",
        fontSize: "1.2rem",
      };
    }
    return styles.bodyButton;
  };

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
          Apoderado
        </button>
      </header>

      <main style={styles.body as React.CSSProperties}>
        <div style={styles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "evaluations"
                ? {
                    ...getBodyButtonStyles(),
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : getBodyButtonStyles()
            }
            onMouseEnter={() => setHoveredButton("evaluations")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/evaluations')}
          >
            Evaluaciones
          </button>
          <button
            style={
              hoveredButton === "documents"
                ? {
                    ...getBodyButtonStyles(),
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : getBodyButtonStyles()
            }
            onMouseEnter={() => setHoveredButton("documents")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/documents')}
          >
            Documentos
          </button>
          <button
            style={
              hoveredButton === "reports"
                ? {
                    ...getBodyButtonStyles(),
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : getBodyButtonStyles()
            }
            onMouseEnter={() => setHoveredButton("reports")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/reports')}
          >
            Reportes
          </button>
        </div>
        <div style={styles.subBody as React.CSSProperties}>
          <button
            style={
              hoveredButton === "services"
                ? {
                    ...getBodyButtonStyles(),
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : getBodyButtonStyles()
            }
            onMouseEnter={() => setHoveredButton("services")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/services')}
          >
            Servicios
          </button>
          <button
            style={
              hoveredButton === "complaints"
                ? {
                    ...getBodyButtonStyles(),
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : getBodyButtonStyles()
            }
            onMouseEnter={() => setHoveredButton("complaints")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/complaints')}
          >
            Reclamos
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
