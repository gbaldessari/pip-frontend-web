import React, { useState } from "react";
import { studentsPageStyles as styles } from './studentsPage.styles';
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { updateDoc, doc } from "firebase/firestore";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  rut: string;
  birthDate: string;
  course: string;
  guardian: string;
}

const StudentsPage: React.FC = () => {
  
  
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [guardians, setGuardians] = useState<any[]>([]); 
  const [courses, setCourses] = useState<any[]>([]);
  const [students, setStudents] = useState<Student[]>([]); 
  
  const db = getFirestore();

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
  
  const editStudent = async (updatedData: any) => {
    // Verifica si editingStudent no es null antes de continuar
    if (!editingStudent) {
      console.error("No hay estudiante seleccionado para editar.");
      return;
    }
  
    try {
      const studentRef = doc(db, "Alumnos", editingStudent.id);
      await updateDoc(studentRef, updatedData);
  
      // Actualizar el estado después de editar
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === editingStudent.id ? { ...student, ...updatedData } : student
        )
      );
      setFilteredStudents((prevFiltered) =>
        prevFiltered.map((student) =>
          student.id === editingStudent.id ? { ...student, ...updatedData } : student
        )
      );
  
      // Cerrar el formulario de edición
      setEditingStudent(null);
    } catch (error) {
      console.error("Error al actualizar el estudiante:", error);
    }
  };
  

  const [newStudent, setNewStudent] = useState<Student>({
    id: Date.now().toString(),
    firstName: '',
    lastName: '',
    rut: '',
    birthDate: '',
    course: '',
    guardian: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchStudents = async () => {
    try {
      const studentsSnapshot = await getDocs(collection(db, "Alumnos"));
      const studentsList = studentsSnapshot.docs.map(doc => {
        const studentData = doc.data();
  
        // Busca el apoderado por su ID en la lista de `guardians`
        const guardian = guardians.find(g => g.id === studentData.apoderadoId);
        
        return {
          id: doc.id,
          firstName: studentData.nombre,
          lastName: studentData.apellido,
          rut: studentData.rut,
          birthDate: studentData.fechaNacimiento,
          course: studentData.curso,
          guardian: guardian ? `${guardian.nombre} ${guardian.apellido}` : "Apoderado no encontrado"
        };
      });
  
      setStudents(studentsList);
      setFilteredStudents(studentsList);
    } catch (err) {
      console.error("Error al cargar estudiantes:", err);
      setError("No se pudieron cargar los estudiantes");
    }
  };
  
  

  const fetchGuardians = async () => {
    const guardiansSnapshot = await getDocs(collection(db, "Apoderados"));
    const guardiansList = guardiansSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setGuardians(guardiansList);
  };

  const fetchCourses = async () => {
    const coursesSnapshot = await getDocs(collection(db, "Cursos"));
    const coursesList = coursesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setCourses(coursesList);
  };
  
  

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

  const handleAddStudent = async () => {
    setError('');
    setSuccessMessage('');

    // Verifica si los campos están completos en newStudent
    const { firstName, lastName, rut, birthDate, course, guardian } = newStudent;
    if (!firstName || !lastName || !rut || !birthDate || !course || !guardian) {
        setError('Por favor, completa todos los campos.');
        return;
    }

    try {
        await addDoc(collection(db, 'Alumnos'), {
            nombre: firstName,
            apellido: lastName,
            rut,
            fechaNacimiento: birthDate,
            curso: course,
            apoderadoId: guardian
        });
        
        setSuccessMessage('Estudiante registrado exitosamente');
        
        // Limpiar el formulario después de agregar
        setNewStudent({ id: Date.now().toString(), firstName: '', lastName: '', rut: '', birthDate: '', course: '', guardian: '' });
        setIsModalOpen(false);
    } catch (err) {
        setError('Error al añadir el documento: ' + (err as Error).message);
    }
};


  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setNewStudent(student);
    setIsModalOpen(true);
  };


  const handleUpdateStudent = () => {
    setStudents(students.map(student => (student.id === newStudent.id ? newStudent : student)));
    setEditingStudent(null);
    setNewStudent({ id: Date.now().toString(), firstName: '', lastName: '', rut: '', birthDate: '', course: '', guardian: '' });
    setIsModalOpen(false);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter(student => student.id !== id.toString()));
  };
  

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingStudent(null);
    setNewStudent({ id: Date.now().toString(), firstName: '', lastName: '', rut: '', birthDate: '', course: '', guardian: '' });
  };

  React.useEffect(() => {
    filterStudents();
    fetchGuardians();
    fetchCourses();
    fetchStudents();
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
                  <button style={styles.deleteButton} onClick={() => handleDeleteStudent(Number(student.id))}>Eliminar</button>
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
              <select
                name="course"
                value={newStudent.course}
                onChange={handleInputChange}
                style={styles.input as React.CSSProperties}
              >
              <option value="">Seleccionar curso</option>
                {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.nombre} {/* Suponiendo que el nombre del curso está en el campo 'nombre' */}
                </option>
              ))}
              </select>
              <select
                name="guardian"
                  value={newStudent.guardian}
                  onChange={handleInputChange}
                  style={styles.input as React.CSSProperties}
                  >
                    <option value="">Seleccionar apoderado</option>
                    {guardians.map((guardian) => (
                      <option key={guardian.id} value={guardian.id}>
                        {guardian.nombre} {guardian.apellido} {/* Mostrar el nombre y apellido */}
                        </option>
                      ))}
                      </select>


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
