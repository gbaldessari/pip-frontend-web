import React, { useState } from "react";
import { studentsPageStyles as styles } from './studentsPage.styles';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  rut: string;
  birthDate: string;
  course: string;
  guardian: string;
}

const StudentsPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: 1, firstName: "Juan", lastName: "Pérez", rut: "21.456.789-0", birthDate: "2005-05-10", course: "4º A", guardian: "María Pérez" },
    { id: 2, firstName: "Ana", lastName: "Gómez", rut: "20.456.789-0", birthDate: "2006-09-22", course: "3º B", guardian: "José Gómez" },
  ]);

  const [filteredStudents, setFilteredStudents] = useState<Student[]>(students);
  const [searchFilters, setSearchFilters] = useState({
    firstName: "",
    lastName: "",
    rut: "",
    birthDate: "",
    course: "",
    guardian: ""
  });

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [newStudent, setNewStudent] = useState<Student>({
    id: Date.now(),
    firstName: '',
    lastName: '',
    rut: '',
    birthDate: '',
    course: '',
    guardian: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFilters({ ...searchFilters, [name]: value });
  };

  const filterStudents = () => {
    setFilteredStudents(
      students.filter((student) =>
        Object.keys(searchFilters).every((key) =>
          (student as any)[key].toString().toLowerCase().includes(searchFilters[key as keyof typeof searchFilters].toLowerCase())
        )
      )
    );
  };

  const handleAddStudent = () => {
    setStudents([...students, { ...newStudent, id: Date.now() }]);
    setNewStudent({ id: Date.now(), firstName: '', lastName: '', rut: '', birthDate: '', course: '', guardian: '' });
    setIsModalOpen(false);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdateStudent = () => {
    setStudents(students.map(student => (student.id === newStudent.id ? newStudent : student)));
    setEditingStudent(null);
    setNewStudent({ id: Date.now(), firstName: '', lastName: '', rut: '', birthDate: '', course: '', guardian: '' });
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setNewStudent({ id: Date.now(), firstName: '', lastName: '', rut: '', birthDate: '', course: '', guardian: '' });
  };

  React.useEffect(() => {
    filterStudents();
  }, [searchFilters, students]);

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
          <input
            type="text"
            name="firstName"
            placeholder="Buscar por nombre"
            value={searchFilters.firstName}
            onChange={handleFilterChange}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Buscar por apellido"
            value={searchFilters.lastName}
            onChange={handleFilterChange}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="rut"
            placeholder="Buscar por Rut"
            value={searchFilters.rut}
            onChange={handleFilterChange}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="date"
            name="birthDate"
            placeholder="Buscar por fecha de nacimiento"
            value={searchFilters.birthDate}
            onChange={handleFilterChange}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="course"
            placeholder="Buscar por curso"
            value={searchFilters.course}
            onChange={handleFilterChange}
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="guardian"
            placeholder="Buscar por apoderado"
            value={searchFilters.guardian}
            onChange={handleFilterChange}
            style={styles.filterInput as React.CSSProperties}
          />
          <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>Agregar Estudiante</button>
        </div>

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
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.rut}</td>
                <td>{student.birthDate}</td>
                <td>{student.course}</td>
                <td>{student.guardian}</td>
                <td>
                  <button style={styles.editButton} onClick={() => handleEditStudent(student)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteStudent(student.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {isModalOpen && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modal as React.CSSProperties}>
              <h2>{editingStudent ? "Editar Estudiante" : "Agregar Estudiante"}</h2>
              <input
                type="text"
                name="firstName"
                value={newStudent.firstName}
                onChange={handleInputChange}
                placeholder="Nombres"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="lastName"
                value={newStudent.lastName}
                onChange={handleInputChange}
                placeholder="Apellidos"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="rut"
                value={newStudent.rut}
                onChange={handleInputChange}
                placeholder="RUT"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="date"
                name="birthDate"
                value={newStudent.birthDate}
                onChange={handleInputChange}
                placeholder="Fecha de Nacimiento"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="course"
                value={newStudent.course}
                onChange={handleInputChange}
                placeholder="Curso"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="guardian"
                value={newStudent.guardian}
                onChange={handleInputChange}
                placeholder="Apoderado"
                style={styles.input as React.CSSProperties}
              />

              <div style={styles.modalActions as React.CSSProperties}>
                {editingStudent ? (
                  <button style={styles.updateButton} onClick={handleUpdateStudent}>Actualizar Estudiante</button>
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
