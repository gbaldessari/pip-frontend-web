import React, { useState } from "react";
import { subjectsPageStyles as styles } from './subjectsPage.styles';

interface Subject {
  id: number;
  name: string;
  course: string;
  teacher: string;
}

const SubjectsPage: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Matemáticas", course: "4º A", teacher: "Juan Pérez" },
    { id: 2, name: "Ciencias", course: "3º B", teacher: "Ana Gómez" },
  ]);

  const [newSubject, setNewSubject] = useState<Subject>({
    id: Date.now(),
    name: '',
    course: '',
    teacher: ''
  });

  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // Estados para filtros
  const [filterName, setFilterName] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<string>('');
  const [filterTeacher, setFilterTeacher] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewSubject({ ...newSubject, [name]: value });
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { ...newSubject, id: Date.now() }]);
    closeModal();
  };

  const handleEditSubject = (subject: Subject) => {
    setEditingSubject(subject);
    setNewSubject(subject);
    openModal();
  };

  const handleUpdateSubject = () => {
    setSubjects(subjects.map(subject => (subject.id === newSubject.id ? newSubject : subject)));
    closeModal();
  };

  const handleDeleteSubject = (id: number) => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
    setNewSubject({ id: Date.now(), name: '', course: '', teacher: '' });
  };

  // Filtrado de asignaturas
  const filteredSubjects = subjects.filter(subject => {
    return (
      subject.name.toLowerCase().includes(filterName.toLowerCase()) &&
      subject.course.toLowerCase().includes(filterCourse.toLowerCase()) &&
      subject.teacher.toLowerCase().includes(filterTeacher.toLowerCase())
    );
  });

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Gestión de Asignaturas</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media" alt="Logo Colegio" style={styles.schoolImage} />
      </header>
      <div style={styles.body as React.CSSProperties}>
      <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>
        <div style={styles.filterContainer as React.CSSProperties}>
          <input
            type="text"
            placeholder="Filtrar por Nombre"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            placeholder="Filtrar por Curso"
            value={filterCourse}
            onChange={(e) => setFilterCourse(e.target.value)}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            placeholder="Filtrar por Profesor"
            value={filterTeacher}
            onChange={(e) => setFilterTeacher(e.target.value)}
            style={styles.filterInput as React.CSSProperties}
          />
          <button style={styles.addButton} onClick={openModal}>Agregar Asignatura</button>
        </div>

        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Curso</th>
              <th>Profesor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {filteredSubjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.id}</td>
                <td>{subject.name}</td>
                <td>{subject.course}</td>
                <td>{subject.teacher}</td>
                <td>
                  <button style={styles.editButton} onClick={() => handleEditSubject(subject)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteSubject(subject.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modalContent as React.CSSProperties}>
              <h2>{editingSubject ? "Editar Asignatura" : "Agregar Asignatura"}</h2>
              <input
                type="text"
                name="name"
                value={newSubject.name}
                onChange={handleInputChange}
                placeholder="Nombre de la Asignatura"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="course"
                value={newSubject.course}
                onChange={handleInputChange}
                placeholder="Curso"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="teacher"
                value={newSubject.teacher}
                onChange={handleInputChange}
                placeholder="Profesor"
                style={styles.input as React.CSSProperties}
              />

              {editingSubject ? (
                <button style={styles.updateButton} onClick={handleUpdateSubject}>Actualizar Asignatura</button>
              ) : (
                <button style={styles.saveButton} onClick={handleAddSubject}>Agregar Asignatura</button>
              )}
              <button style={styles.closeButton} onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectsPage;
