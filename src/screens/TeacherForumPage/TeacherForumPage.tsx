import React, { useState, useEffect } from "react";
import { forumPageStyles as styles } from "./teacherForumPage.styles";
import { Asignatura } from "../../services/services.types";
import { getAsignaturasdeUnProfesor } from "../../services/auth.service";

interface Topic {
  id: string;
  title: string;
  description: string;
}

const ForumPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Asignatura[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Asignatura | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newForum, setNewForum] = useState({ title: "", description: "", courseId: "" });
  const user = localStorage.getItem('user_uid');

  const fetchSubjects = async () => {
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    try {
      const respuesta = await getAsignaturasdeUnProfesor(user);
      if (respuesta.data) {
        setSubjects(respuesta.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al obtener las asignaturas.");
    }
  };
  useEffect(() => {

    fetchSubjects();
  }, [user]);

  const exampleTopics: Topic[] = [
    { id: "1", title: "Reunión de padres", description: "Planificación anual" },
    { id: "2", title: "Actividades extracurriculares", description: "Lista de actividades y propuestas" },
    { id: "3", title: "Evaluación de proyectos", description: "Discusión sobre el proyecto final" }
  ];

  const handleCreateForum = async () => {

  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Foro de Profesores y Apoderados</h1>

        <button style={styles.createButton} onClick={() => setIsModalOpen(true)}>
          Crear Foro
        </button>
      </header>

      <div style={styles.body as React.CSSProperties}>
        <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>


        <h2 style={styles.topicsTitle as React.CSSProperties}>Foros Activos</h2>
        <div style={styles.topicsContainer as React.CSSProperties}>
          {exampleTopics.map(topic => (
            <div key={topic.id} style={styles.topic as React.CSSProperties}>
              <h3 style={styles.topicTitle as React.CSSProperties} onClick={() => alert("Navegar al foro específico")}>
                {topic.title}
              </h3>
              <p style={styles.topicDescription as React.CSSProperties}>{topic.description}</p>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div style={styles.modalOverlay as React.CSSProperties}>
          <div style={styles.modal as React.CSSProperties}>
            <h2>Crear Nuevo Foro</h2>
            <input
              type="text"
              placeholder="Nombre del Foro"
              value={newForum.title}
              onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
              style={styles.input as React.CSSProperties}
            />
            <textarea
              placeholder="Descripción"
              value={newForum.description}
              onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
              style={styles.textarea as React.CSSProperties}
            />
            <label style={styles.label as React.CSSProperties}>Curso:</label>
            <label style={styles.label as React.CSSProperties}>Selecciona Curso:</label>
            <select
              value={selectedSubject?.id || ""}
              onChange={(e) => {
                const selectedId = e.target.value;
                const subject = subjects.find(subject => subject.id === selectedId) || null;
                setSelectedSubject(subject);
              }}
              style={styles.select as React.CSSProperties}
            >
              <option value="">-- Selecciona una Asignatura --</option>
              {subjects.map(subjects => (
                <option key={subjects.id} value={subjects.id}>{subjects.nombre + " " + subjects.curso.nombre}</option>
              ))}
            </select>

            <div style={styles.modalActions as React.CSSProperties}>
              <button style={styles.submitButton as React.CSSProperties} onClick={handleCreateForum}>
                Crear Foro
              </button>
              <button style={styles.cancelButton as React.CSSProperties} onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;
