import React, { useState, useEffect } from "react";
import { forumPageStyles as styles } from "./teacherForumPage.styles";
import { Asignatura, ComentarioPayload, Foro, ForoPayload } from "../../services/services.types";
import { comentarForo, createForo, eliminarForo, getAsignaturasdeUnProfesor, getForosdeUnProfesor } from "../../services/auth.service";

const ForumPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Asignatura[]>([]);
  const [forums, setForums] = useState<Foro[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Asignatura | null>(null);
  const [isCreateForumModalOpen, setIsCreateForumModalOpen] = useState(false);
  const [isForumModalOpen, setIsForumModalOpen] = useState(false);
  const [selectedForum, setSelectedForum] = useState<Foro | null>(null);
  const [newForum, setNewForum] = useState({ title: "", description: "", courseId: "" });
  const [newComment, setNewComment] = useState("");
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

  const fetchForums = async () => {
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    const respuesta = await getForosdeUnProfesor(user);
    if (respuesta.data) {
      setForums(respuesta.data);
    }
    else {
      console.error(respuesta.error);
      alert("Error al obtener los foros.");
    }
  };

  useEffect(() => {
    fetchForums();
    fetchSubjects();
  }, [user]);

  const handleCreateForum = async () => {
    if (!newForum.title || !newForum.description || !selectedSubject) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    const foro: ForoPayload = {
      title: newForum.title,
      description: newForum.description,
      asignaturaId: selectedSubject.id,
      profesorId: user,
      fecha: new Date().toISOString(),
    };
    console.log(foro);
    const respuesta = await createForo(foro);
    if (respuesta.success) {
      setIsCreateForumModalOpen(false);
      alert("Foro creado satisfactoriamente");
    }
    else {
      console.error(respuesta.error);
      alert("Error al crear el foro.");
    }
  };

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

  const handleDeleteForum = async () => {
    if (!selectedForum) {
      console.error("No se ha seleccionado un foro.");
      return;
    }
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    const respuesta = await eliminarForo(selectedForum.id);
    if (respuesta.success) {
      alert("Foro eliminado");
      setIsForumModalOpen(false);
      fetchForums();
    }
    else {
      console.error(respuesta.error);
      alert("Error al eliminar el foro.");
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Foro de Profesores y Apoderados</h1>
      </header>

      <div style={styles.body as React.CSSProperties}>
        <button style={styles.createButton} onClick={() => setIsCreateForumModalOpen(true)}>
          Crear Foro
        </button>
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
            <button style={styles.deleteButton as React.CSSProperties} onClick={handleDeleteForum}>
              Eliminar Foro
            </button>
          </div>
        </div>
      )}

      {isCreateForumModalOpen && (
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
              <button style={styles.cancelButton as React.CSSProperties} onClick={() => setIsCreateForumModalOpen(false)}>
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
