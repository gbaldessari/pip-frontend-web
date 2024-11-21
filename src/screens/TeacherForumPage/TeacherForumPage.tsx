import React, { useState, useEffect } from "react";
import { forumPageStyles as styles } from "./teacherForumPage.styles";

import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";

interface Course {
  id: string;
  name: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
}

const ForumPage: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newForum, setNewForum] = useState({ title: "", description: "", courseId: "" });
  const db = getFirestore();

  useEffect(() => {
    const fetchCourses = async () => {
      const courseSnapshot = await getDocs(collection(db, "Cursos"));
      const coursesData = courseSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().nombre }));
      setCourses(coursesData);
    };
    fetchCourses();
  }, [db]);

  const exampleTopics: Topic[] = [
    { id: "1", title: "Reunión de padres", description: "Planificación anual" },
    { id: "2", title: "Actividades extracurriculares", description: "Lista de actividades y propuestas" },
    { id: "3", title: "Evaluación de proyectos", description: "Discusión sobre el proyecto final" }
  ];

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleCreateForum = async () => {
    if (!newForum.title || !newForum.description || !newForum.courseId) {
      alert("Por favor complete todos los campos.");
      return;
    }
    await addDoc(collection(db, "Foros"), {
      titulo: newForum.title,
      descripcion: newForum.description,
      cursoId: newForum.courseId,
      fechaCreacion: new Date(),
    });
    setIsModalOpen(false);
    setNewForum({ title: "", description: "", courseId: "" });
    alert("Foro creado exitosamente");
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
        <label style={styles.label as React.CSSProperties}>Selecciona Curso:</label>
        <select
          value={selectedCourse || ""}
          onChange={(e) => handleSelectCourse(e.target.value)}
          style={styles.select as React.CSSProperties}
        >
          <option value="">-- Selecciona un curso --</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.name}</option>
          ))}
        </select>

        <h2 style={styles.topicsTitle as React.CSSProperties}>Tópicos del Foro</h2>
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
            <select
              value={newForum.courseId || ""}
              onChange={(e) => setNewForum({ ...newForum, courseId: e.target.value })}
              style={styles.select as React.CSSProperties}
            >
              <option value="">-- Selecciona un curso --</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
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
