import React, { useState, useEffect } from "react";
import { studentsPageStyles as styles } from './studentsPage.styles';
import { mostrarEstudiantes, registerAlumno, mostrarCursos, mostrarApoderados, updateAlumno, eliminarAlumno } from '../../services/auth.service';
import { Alumno, Curso, Apoderados, RegisterEstudiante } from '../../services/services.types';

const StudentsPage: React.FC = () => {
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [estudiantes, setEstudiantes] = useState<Alumno[]>([]);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [apoderados, setApoderados] = useState<Apoderados[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Alumno[]>([]);
  const [searchFilters, setSearchFilters] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    fechaNacimiento: '',
    curso: '',
    apoderadoNombre: ''
  });

  const [nuevoEstudiante, setnuevoEstudiante] = useState<RegisterEstudiante>({
    nombre: '',
    apellido: '',
    rut: '',
    fechaNacimiento: '',
    curso: '',
    apoderadoId: ''
  });

  const [editingStudent, setEditingStudent] = useState<Alumno | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cargarEstudiantes = async () => {
    try {
      const respuesta = await mostrarEstudiantes();

      if (respuesta.data) {
        setEstudiantes(respuesta.data);
        setFilteredStudents(respuesta.data);
      }

    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      setError("No se pudieron cargar los estudiantes");
    }
  };

  useEffect(() => {
    cargarEstudiantes();
    cargarCursos();
    cargarApoderados();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setnuevoEstudiante({ ...nuevoEstudiante, [name]: value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const filtrarEstudiantes = () => {
    if (!Array.isArray(estudiantes)) return;
    setFilteredStudents(
      estudiantes.filter((estudiante) =>
        Object.keys(searchFilters).every((key) =>
          (estudiante as any)[key]?.toString().toLowerCase().includes(searchFilters[key as keyof typeof searchFilters].toLowerCase())
        )
      )
    );
  };

  useEffect(() => {
    filtrarEstudiantes();
  }, [searchFilters, estudiantes]);

  const handleAddStudent = async () => {
    console.log("Nuevo estudiante:", nuevoEstudiante);
    setError('');
    setSuccessMessage('');

    const { nombre, apellido, rut, fechaNacimiento, curso, apoderadoId } = nuevoEstudiante;
    if (!nombre || !apellido || !rut || !fechaNacimiento || !curso || !apoderadoId) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    try {
      const nuevoEstudianteData = {
        nombre,
        apellido,
        rut,
        fechaNacimiento,
        curso,
        apoderadoId
      };

      const estudianteNuevo = await registerAlumno(nuevoEstudianteData);
      if (!estudianteNuevo.success) {
        setError('Error al añadir el estudiante');
        return;
      }
      setSuccessMessage('Estudiante registrado exitosamente');
      setIsModalOpen(false);
      setnuevoEstudiante({ nombre: '', apellido: '', rut: '', fechaNacimiento: '', curso: '', apoderadoId: '' });

      cargarEstudiantes();
    } catch (error) {
      setError('Error al añadir el estudiante: ' + error);
    }
  };

  const handleEditStudent = (student: Alumno) => {
    setEditingStudent(student);

    setIsModalOpen(true);
  };

  const cargarCursos = async () => {
    try {
      const respuesta = await mostrarCursos();
      if (respuesta.data) {
        setCursos(respuesta.data);
      }
    } catch (error) {
      setError("No se pudieron cargar los cursos");
    }
  };

  const cargarApoderados = async () => {
    try {
      const respuesta = await mostrarApoderados();
      if (respuesta.data) {
        setApoderados(respuesta.data);
      }
    } catch (error) {
      setError("No se pudieron cargar los apoderados");
    }
  };


  useEffect(() => {
    cargarEstudiantes();
    cargarCursos();
  }, []);

  const handleEditConfirm = async () => {
    if (!editingStudent) return;

    const updatedData = {
      nombre: nuevoEstudiante.nombre,
      apellido: nuevoEstudiante.apellido,
      curso: nuevoEstudiante.curso,
    };

    try {
      console.log("🚀 ~ handleEditConfirm ~ updatedData", updatedData);
      const response = await updateAlumno(editingStudent.id, { ...updatedData });
      console.log("🚀 ~ handleEditConfirm ~ response", response);
      if (!response.success) {
        throw new Error('Error al actualizar el estudiante');
      }
      setSuccessMessage("Estudiante actualizado exitosamente");
      setEditingStudent(null);
      setnuevoEstudiante({ nombre: '', apellido: '', rut: '', fechaNacimiento: '', curso: '', apoderadoId: '' });
      setIsModalOpen(false);
      cargarEstudiantes();
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error);
      setError("No se pudo actualizar el estudiante: " + error);
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {

      const response = await eliminarAlumno({ id });
      if (!response.success) {
        throw new Error('Error al eliminar el estudiante');
      }
      setSuccessMessage("Estudiante eliminado exitosamente");
      cargarEstudiantes();

    } catch (error) {
      setError("No se pudo eliminar el estudiante");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setnuevoEstudiante({ nombre: '', apellido: '', rut: '', fechaNacimiento: '', curso: '', apoderadoId: '' });
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Registros de Estudiantes</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media" alt="Logo Colegio" style={styles.schoolImage} />
      </header>
      <div style={styles.body as React.CSSProperties}>
        <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>

        {/* Filtros de búsqueda */}
        <div style={styles.filterContainer as React.CSSProperties}>
          <input type="text" name="nombre" placeholder="Buscar por nombre" value={searchFilters.nombre} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="apellido" placeholder="Buscar por apellido" value={searchFilters.apellido} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="rut" placeholder="Buscar por Rut" value={searchFilters.rut} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="date" name="fechaNacimiento" placeholder="Buscar por fecha de nacimiento" value={searchFilters.fechaNacimiento} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="curso" placeholder="Buscar por curso" value={searchFilters.curso} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          {/*<input type="text" name="apoderado" placeholder="Buscar por apoderado" value={searchFilters.apoderadoNombre} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} /> */}
          <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>Agregar Estudiante</button>
        </div>

        {/* Mensajes de Error y Éxito */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

        {/* Tabla de estudiantes */}
        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>RUT</th>
              <th>Fecha de Nacimiento</th>
              <th>Curso</th>
              <th>Apoderado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {Array.isArray(filteredStudents) && filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.nombre}</td>
                <td>{student.apellido}</td>
                <td>{student.rut}</td>
                <td>{student.fechaNacimiento}</td>
                <td>{student.curso}</td>
                <td>{student.apoderadoNombre}</td>
                <td>
                  <button style={styles.editButton} onClick={() => handleEditStudent(student)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteStudent(student.id)}>Eliminar</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modal as React.CSSProperties}>
              <h2>{editingStudent ? "Editar Estudiante" : "Agregar Estudiante"}</h2>
              {editingStudent ? (
                <>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoEstudiante.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombres"
                    style={styles.input as React.CSSProperties}
                  />
                  <input
                    type="text"
                    name="apellido"
                    value={nuevoEstudiante.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellidos"
                    style={styles.input as React.CSSProperties}
                  />
                  <select
                    name="curso"
                    value={nuevoEstudiante.curso}
                    onChange={handleInputChange}
                    style={styles.input as React.CSSProperties}
                  >
                    <option value="">Seleccionar curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    name="nombre"
                    value={nuevoEstudiante.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombres"
                    style={styles.input as React.CSSProperties}
                  />
                  <input
                    type="text"
                    name="apellido"
                    value={nuevoEstudiante.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellidos"
                    style={styles.input as React.CSSProperties}
                  />
                  <input
                    type="text"
                    name="rut"
                    value={nuevoEstudiante.rut}
                    onChange={handleInputChange}
                    placeholder="RUT"
                    style={styles.input as React.CSSProperties}
                  />
                  <input
                    type="date"
                    name="fechaNacimiento"
                    value={nuevoEstudiante.fechaNacimiento}
                    onChange={handleInputChange}
                    placeholder="Fecha de Nacimiento"
                    style={styles.input as React.CSSProperties}
                  />
                  <select
                    name="curso"
                    value={nuevoEstudiante.curso}
                    onChange={handleInputChange}
                    style={styles.input as React.CSSProperties}
                  >
                    <option value="">Seleccionar curso</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.nombre}
                      </option>
                    ))}
                  </select>
                  <select
                    name="apoderadoId"
                    value={nuevoEstudiante.apoderadoId}
                    onChange={handleInputChange}
                    style={styles.input as React.CSSProperties}
                  >
                    <option value="">Seleccionar Apoderado</option>
                    {apoderados.map((apoderado) => (
                      <option key={apoderado.id} value={apoderado.id}>
                        {`${apoderado.nombre} ${apoderado.apellido}`}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <div style={styles.modalActions as React.CSSProperties}>
                {editingStudent ? (
                  <button style={styles.updateButton} onClick={handleEditConfirm}>Actualizar Estudiante</button>
                ) : (
                  <button style={styles.addButton} onClick={handleAddStudent}>Agregar Estudiante</button>
                )}
                <button style={styles.cancelButton} onClick={handleModalClose}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;