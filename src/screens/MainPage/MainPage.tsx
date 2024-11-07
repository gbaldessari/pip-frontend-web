import React, { useState, useEffect } from "react";
import { mainPageStyles } from "./mainPage.styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const MainPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigator = useNavigate();
  const auth = getAuth();
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

  const getBodyButtonStyles = () => {
    if (windowWidth < 768) {
      return {
        ...mainPageStyles.bodyButton,
        padding: "1.5rem 3rem",
        fontSize: "1.2rem",
      };
    }
    return mainPageStyles.bodyButton;
  };

  return (
    <div style={mainPageStyles.container as React.CSSProperties}>
      <header style={mainPageStyles.header as React.CSSProperties}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Cerro_Grande_La_Serena.jpg?alt=media"
          style={mainPageStyles.backgroundImage as React.CSSProperties}
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media"
          style={mainPageStyles.headerImage as React.CSSProperties}
        />
        <button
          style={
            hoveredButton === "header"
              ? {
                  ...mainPageStyles.headerButton,
                  backgroundColor: "#315bb7",
                  transform: "scale(1.05)",
                }
              : mainPageStyles.headerButton
          }
          onMouseEnter={() => setHoveredButton("header")}
          onMouseLeave={() => setHoveredButton(null)}
        >
          Apoderado
        </button>
        <button
          style={mainPageStyles.logoutButton}
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
      </header>

      <main style={mainPageStyles.body as React.CSSProperties}>
        <div style={mainPageStyles.subBody as React.CSSProperties}>
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
            onClick={() => navigator("/evaluations")}
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
            onClick={() => navigator("/documents")}
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
            onClick={() => navigator("/reports")}
          >
            Reportes
          </button>
        </div>

        <div style={mainPageStyles.subBody as React.CSSProperties}>
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
            onClick={() => navigator("/services")}
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
            onClick={() => navigator("/complaints")}
          >
            Reclamos
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
