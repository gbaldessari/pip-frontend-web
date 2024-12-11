import React, { useState, useEffect } from "react";
import { guardianForumPageStyles as styles } from "./guardianForumPage.styles";
import {AlumnoResponse, ComentarioPayload, Foro } from "../../services/services.types";
import { comentarForo, getAlumnosdeUnApoderado, getForosdeUnAlumno } from "../../services/auth.service";

const GuardianForumPage: React.FC = () => {
  const [forums, setForums] = useState<Foro[]>([]);
  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<Foro | null>(null);
  const [newComment, setNewComment] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [students, setStudents] = useState<AlumnoResponse[]>([]);
  const user = localStorage.getItem('user_uid');

  const fetchForums = async (studentId: string) => {
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    const respuesta = await getForosdeUnAlumno(studentId);
    if (respuesta.data) {
      setForums(respuesta.data);
    }
    else {
      console.error(respuesta.error);
      alert("Error al obtener los foros.");
    }
  };

  const fetchStudents = async () => {
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    try {
      const response = await getAlumnosdeUnApoderado(user);
      console.log(response);
      if (response.data) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al obtener los alumnos.");
    }
  }

  useEffect(() => {
    fetchStudents();
  }, [user]);

  useEffect(() => {
    if (selectedStudent) {
      fetchForums(selectedStudent);
    }
  }, [selectedStudent]);

  const handleForumClick = (forum: Foro) => {
    console.log(forum);
    setIsForumModalOpen(true);
    setSelectedForum(forum);
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    if (!selectedForum) {
      console.error("No se ha seleccionado un foro.");
      return;
    }
    const comentario: ComentarioPayload = {
      userId: user,
      comentario: newComment,
      foroId: selectedForum.id,
      fecha: new Date().toISOString(),
    };

    const respuesta = await comentarForo(comentario);

    if (respuesta.success) {
      alert("Comentario enviado");
      setIsForumModalOpen(false);
    } else {
      console.error(respuesta.error);
      alert("Error al enviar el comentario.");
    }

    setNewComment("");
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Foro de Profesores y Apoderados</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
        <select
          value={selectedStudent || ""}
          onChange={(e) => setSelectedStudent(e.target.value)}
          style={styles.select as React.CSSProperties}
        >
          <option value="" disabled>Seleccione un alumno</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.nombre + " " + student.apellido}
            </option>
          ))}
        </select>

        <h2 style={styles.topicsTitle as React.CSSProperties}>Foros Activos</h2>
        <div style={styles.topicsContainer as React.CSSProperties}>
          {forums.map(forum => (
            <div key={forum.id} style={styles.topic as React.CSSProperties}>
              <h3 style={styles.topicTitle as React.CSSProperties} onClick={() => handleForumClick(forum)}>
                {forum.title}
              </h3>
              <p style={styles.topicDescription as React.CSSProperties}>{forum.description}</p>
            </div>
          ))}
        </div>
      </div>

      {isForumModalOpen && (
        <div style={styles.modalOverlay as React.CSSProperties}>
          <div style={styles.modal as React.CSSProperties}>
            <div style={styles.modalHeader as React.CSSProperties}>
              <h2>{selectedForum?.title}</h2>
              <p>{selectedForum?.description}</p>
            </div>
            <div style={styles.modalBody as React.CSSProperties}>
              <div style={styles.commentsContainer as React.CSSProperties}>
                <div style={styles.commentsScrollable as React.CSSProperties}>
                  {selectedForum?.comentarios.map(comentario => (
                    <div key={comentario.id} style={styles.comment as React.CSSProperties}>
                      <h4 style={styles.commentAuthor as React.CSSProperties}>{comentario.nombre}</h4>
                      <p style={styles.commentText as React.CSSProperties}>{comentario.comentario}</p>
                    </div>
                  ))}
                </div>
              </div>
              <textarea
                placeholder="Escribe un comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={styles.textarea as React.CSSProperties}
              />
            </div>
            <button style={styles.submitButton as React.CSSProperties} onClick={handleAddComment}>
              Enviar Comentario
            </button>
            <button style={styles.submitButton as React.CSSProperties} onClick={() => setIsForumModalOpen(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianForumPage;
