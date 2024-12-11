import React, { useState, useEffect } from "react";
import { mainPageStyles as styles} from "./mainPage.styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../routes/UserContext";

const MainPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigator = useNavigate();
  const auth = getAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useUser();

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
            Asistencia
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
              hoveredButton === "forum"
                ? {
                    ...getBodyButtonStyles(),
                    backgroundColor: "#315b73",
                    transform: "scale(1.05)",
                  }
                : getBodyButtonStyles()
            }
            onMouseEnter={() => setHoveredButton("forum")}
            onMouseLeave={() => setHoveredButton(null)}
            onClick={() => navigator('/guardian-forum')}
          >
            Foro
          </button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
