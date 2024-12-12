import React, { useState, useEffect } from "react";
import { mainPageStyles as styles } from "./mainPage.styles";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useUser } from "../../routes/UserContext";
import Chatbot from "./ChatBot";
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const MainPage: React.FC = () => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const navigator = useNavigate();
  const auth = getAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { user } = useUser();
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState<{ user: string, text: string }[]>([]);

  const accessToken = import.meta.env.VITE_DIALOGFLOW_ACCESS_TOKEN;
  const projectId = import.meta.env.VITE_DIALOGFLOW_PROJECT_ID;

  const sendMessageToDialogflow = async (message: string) => {
    const url = `https://dialogflow.googleapis.com/v2/projects/${projectId}/agent/sessions/${uuid()}:detectIntent`;
    
    const request = {
      queryInput: {
        text: {
          text: message,
          languageCode: 'es',
        },
      },
    };

    try {
      const response = await axios.post(url, request, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.queryResult.fulfillmentText;
    } catch (error) {
      console.error('Error al enviar mensaje a Dialogflow:', error);
      return 'Lo siento, no puedo responder en este momento.';
    }
  };

  const handleSendMessage = async (message: string) => {
    setMessages([...messages, { user: 'user', text: message }]);
    const response = await sendMessageToDialogflow(message);
    setMessages((prevMessages) => [...prevMessages, { user: 'bot', text: response }]);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setMessages([{ user: 'bot', text: 'Hola, soy tu ayudante virtual. ¿En qué puedo ayudarte hoy?' }]);
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
        {chatbotVisible && <Chatbot messages={messages} onSendMessage={handleSendMessage} onClose={() => setChatbotVisible(false)} />}
        {!chatbotVisible && (
          <button onClick={() => setChatbotVisible(true)} style={styles.chatbotButton as React.CSSProperties}>
            ?
          </button>
        )}
      </main>
    </div>
  );
};

export default MainPage;