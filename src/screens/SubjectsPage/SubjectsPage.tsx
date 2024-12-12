import React, { useState, useEffect } from "react";
import { subjectsPageStyles as styles } from './subjectsPage.styles';
import { Curso, Profesor, Asignatura, RegisterAsignatura } from '../../services/services.types';
import { registerAsignatura, mostrarAsignatura, eliminarAsignatura, mostrarCursos, mostrarProfesores, updateAsignatura } from '../../services/auth.service'; // Asegúrate de que las rutas sean correctas

const SubjectsPage: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [profesores, setProfesores] = useState<Profesor[]>([]);
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);

  const [nuevaAsignatura, setNuevaAsignatura] = useState<RegisterAsignatura>({
    nombre: '',
    profesorId: '',
    cursoId: ''
  });

  const [editingSubject, setEditingSubject] = useState<Asignatura | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [filterName, setFilterName] = useState<string>('');
  const [filterCourse, setFilterCourse] = useState<string>('');
  const [filterTeacher, setFilterTeacher] = useState<string>('');


  const cargarAsignatura = async () => {
    try {
      const respuesta = await mostrarAsignatura();
      if (respuesta.data) {
        setAsignaturas(respuesta.data);
      }
    } catch (error) {
      console.error("Error al cargar las asignaturas:", error);
    }
  };

  const cargarCursos = async () => {
    const respuesta = await mostrarCursos();
    if (respuesta.data) {
      setCursos(respuesta.data);
    }
    else {
      alert("No se pudieron cargar los cursos");
    }
  };

  const cargarProfesores = async () => {
    const respuesta = await mostrarProfesores();
    if (respuesta.data) {
      setProfesores(respuesta.data);
    }
    else {
      alert("No se pudieron cargar los profesores");
    }

  };

  useEffect(() => {
    cargarAsignatura();
    cargarCursos();
    cargarProfesores();
  }, []);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevaAsignatura({ ...nuevaAsignatura, [name]: value });
  };

  const handleAddSubject = async () => {
    const response = await registerAsignatura(nuevaAsignatura);
    if (response.data) {
      alert("Asignatura agregada correctamente");
      cargarAsignatura();
      closeModal();
    } else {
      console.error("Error al agregar asignatura:", response.error);
      alert("Error al agregar asignatura");
    }
  };


  const handleUpdateSubject = async (subjectId: string) => {
    if (!editingSubject) return;
    const response = await updateAsignatura(subjectId, editingSubject);
    if (response.data) {
      alert("Asignatura actualizada correctamente");
      cargarAsignatura();
      closeModal();
    } else {
      alert("Error al actualizar asignatura");
    }
  };

  const handleDeleteSubject = async (id: string) => {
    const response = await eliminarAsignatura({ id });
    if (!response.success) {
      alert("Error al eliminar asignatura");
    } else {
      setAsignaturas(asignaturas.filter(subject => subject.id !== id));
      alert("Asignatura eliminada correctamente");
      cargarAsignatura();
    }
  };

  const handleEditSubject = (subject: Asignatura) => {
    setEditingSubject(subject);
    setNuevaAsignatura({
      nombre: subject.nombre,
      profesorId: subject.profesor.id,
      cursoId: subject.curso.id
    });
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
    setNuevaAsignatura({ nombre: '', profesorId: '', cursoId: '' });
  };

  const filteredSubjects = Array.isArray(asignaturas) ? asignaturas.filter(subject => {
    return (
      subject.nombre.toLowerCase().includes(filterName.toLowerCase()) &&
      subject.curso.nombre.toLowerCase().includes(filterCourse.toLowerCase()) &&
      subject.profesor.nombre.toLowerCase().includes(filterTeacher.toLowerCase())
    );
  }) : [];

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Gestión de Asignaturas</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
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

              <th>Asignatura</th>
              <th>Curso</th>
              <th>Profesor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {filteredSubjects.map((subject) => (
              <tr key={subject.id}>

                <td>{subject.nombre}</td>
                <td>{subject.curso.nombre}</td>
                <td>{`${subject.profesor.nombre} ${subject.profesor.apellido}`}</td>
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
                name="nombre"
                value={nuevaAsignatura.nombre}
                onChange={handleInputChange}
                placeholder="Nombre de la Asignatura"
                style={styles.input as React.CSSProperties}
              />
              <select
                name="cursoId"
                value={nuevaAsignatura.cursoId}
                onChange={handleInputChange}
                style={styles.input as React.CSSProperties}
              >
                <option value="">Seleccionar Curso</option>
                {cursos.map(curso => (
                  <option key={curso.id} value={curso.id}>{curso.nombre}</option>
                ))}
              </select>
              <select
                name="profesorId"
                value={nuevaAsignatura.profesorId}
                onChange={handleInputChange}
                style={styles.input as React.CSSProperties}
              >
                <option value="">Seleccionar Profesor</option>
                {profesores.map((profesor) => (
                  <option key={profesor.id} value={profesor.id}>{`${profesor.nombre} ${profesor.apellido}`}</option>
                ))}
              </select>

              {editingSubject ? (
                <button style={styles.updateButton} onClick={() => handleUpdateSubject(editingSubject?.id)}>Actualizar Asignatura</button>
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
