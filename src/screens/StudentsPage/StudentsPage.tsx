import React, { useState, useEffect } from "react";
import { studentsPageStyles as styles } from './studentsPage.styles';
import { mostrarEstudiantes, registerAlumno, mostrarCursos, mostrarApoderados, updateAlumno, eliminarAlumno } from '../../services/auth.service';
import { Alumno, Curso, Apoderados, RegisterEstudiante } from '../../services/services.types';

const StudentsPage: React.FC = () => {
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

    const respuesta = await mostrarEstudiantes();

    if (respuesta.data) {
      setEstudiantes(respuesta.data);
      setFilteredStudents(respuesta.data);
    }
    else {
      alert("No se pudieron cargar los estudiantes");
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

    const { nombre, apellido, rut, fechaNacimiento, curso, apoderadoId } = nuevoEstudiante;
    if (!nombre || !apellido || !rut || !fechaNacimiento || !curso || !apoderadoId) {
      alert('Por favor, completa todos los campos.');
      return;
    }

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
      alert('Error al añadir el estudiante');
      return;
    }
    alert('Estudiante registrado exitosamente');
    setIsModalOpen(false);
    setnuevoEstudiante({ nombre: '', apellido: '', rut: '', fechaNacimiento: '', curso: '', apoderadoId: '' });

    cargarEstudiantes();
  };

  const handleEditStudent = (student: Alumno) => {
    setEditingStudent(student);

    setIsModalOpen(true);
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

  const cargarApoderados = async () => {
    const respuesta = await mostrarApoderados();
    if (respuesta.data) {
      setApoderados(respuesta.data);
    }
    else {
      alert("No se pudieron cargar los apoderados");
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
    const response = await updateAlumno(editingStudent.id, { ...updatedData });
    if (!response.success) {
      alert('Error al actualizar el estudiante');
    }
    alert("Estudiante actualizado exitosamente");
    setEditingStudent(null);
    setnuevoEstudiante({ nombre: '', apellido: '', rut: '', fechaNacimiento: '', curso: '', apoderadoId: '' });
    setIsModalOpen(false);
    cargarEstudiantes();
  };

  const handleDeleteStudent = async (id: string) => {
    const response = await eliminarAlumno({ id });
    if (response.success) {
      alert("Estudiante eliminado exitosamente");
      cargarEstudiantes();
    }
    else {
      alert('Error al eliminar el estudiante');
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
      </header>
      <div style={styles.body as React.CSSProperties}>
        <div style={styles.filterContainer as React.CSSProperties}>
          <input type="text" name="nombre" placeholder="Buscar por nombre" value={searchFilters.nombre} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="apellido" placeholder="Buscar por apellido" value={searchFilters.apellido} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="rut" placeholder="Buscar por Rut" value={searchFilters.rut} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="date" name="fechaNacimiento" placeholder="Buscar por fecha de nacimiento" value={searchFilters.fechaNacimiento} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="curso" placeholder="Buscar por curso" value={searchFilters.curso} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <input type="text" name="apoderadoNombre" placeholder="Buscar por apoderado" value={searchFilters.apoderadoNombre} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties} />
          <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>Agregar Estudiante</button>
        </div>

        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
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