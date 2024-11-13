import React, { useState, useEffect } from "react";
import { subjectsPageStyles as styles } from './subjectsPage.styles';
import { Curso, Profesor, Asignatura, RegisterAsignatura } from '../../services/services.types';
import { registerAsignatura, mostrarAsignatura, updateAsignatura, eliminarAsignatura,mostrarCursos, mostrarProfesores } from '../../services/auth.service'; // Asegúrate de que las rutas sean correctas

const SubjectsPage: React.FC = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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
      const data = await mostrarAsignatura();
      setAsignaturas(data);
      console.log("Asignaturas:", data);
    } catch (error) {
      console.error("Error al cargar las asignaturas:", error);
    }
  };
  
  const cargarCursos = async () => {
    try {
      const listaCursos = await mostrarCursos(); 
      setCursos(listaCursos);
      console.log("Cursos:", listaCursos);
    } catch (error) {
      setError("No se pudieron cargar los cursos");
    }
  };

  const cargarProfesores = async () => {
    try{
      const listaProfesores = await mostrarProfesores();
      setProfesores(listaProfesores);
      console.log("Profesores:", listaProfesores);
    } catch (error) {
      setError("No se pudieron cargar los profesores");
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
    try {
      const response = await registerAsignatura(nuevaAsignatura);
      if (!response.success) {
        console.error("Error al agregar asignatura:", response.error);
      } else {
        setSuccessMessage("Asignatura agregada correctamente");
        cargarAsignatura();
        closeModal();
      }
    } catch (error) {
      console.error("Error al agregar asignatura:", error);
    }
  };

  const handleEditSubject = (subject: Asignatura) => {
    setEditingSubject(subject);
    setNuevaAsignatura({ nombre: subject.nombre, profesorId: subject.profesor.id, cursoId: subject.curso.id });
    openModal();
  };

  const handleUpdateSubject = async () => {
    // if (editingSubject) {
    //   try {
    //     const response = await updateAsignatura({ ...nuevaAsignatura, id: editingSubject.id });
    //     if (response.success) {
    //       setAsignaturas(asignaturas.map(subject => (subject.id === editingSubject.id ? { ...subject, ...nuevaAsignatura } : subject)));
    //       closeModal();
    //     } else {
    //       console.error("Error al actualizar asignatura:", response.error);
    //     }
    //   } catch (error) {
    //     console.error("Error al actualizar asignatura:", error);
    //   }
    // }
  };

  const handleDeleteSubject = async (id: string) => {
    try {
      const response = await eliminarAsignatura({id});
      if (!response.success) {
        console.error("Error al eliminar asignatura:", response.error);
      } else {
        setAsignaturas(asignaturas.filter(subject => subject.id !== id));
        setSuccessMessage("Asignatura eliminada correctamente");
        cargarAsignatura();
      }
    } catch (error) {
      console.error("Error al eliminar asignatura:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
    setNuevaAsignatura({ nombre: '', profesorId: '', cursoId: '' }); // Resetear valores
  };

  const filteredSubjects = asignaturas.filter(subject => {
    return (
      subject.nombre.toLowerCase().includes(filterName.toLowerCase()) &&
      subject.curso.nombre.toLowerCase().includes(filterCourse.toLowerCase()) &&
      subject.profesor.nombre.toLowerCase().includes(filterTeacher.toLowerCase())
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
        
        {/* Mensajes de Error y Éxito */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

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
                  { /* <button style={styles.editButton} onClick={() => handleEditSubject(subject)}>Editar</button> */}
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

