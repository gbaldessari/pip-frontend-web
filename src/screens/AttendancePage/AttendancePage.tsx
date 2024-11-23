import React, { useState, useEffect } from "react";
import { attendancePageStyles as styles } from './attendancePage.styles';
import { Asignatura } from "../../services/services.types";
import { getAsignaturasdeUnProfesor } from "../../services/auth.service";
interface Student {
  id: number;
  name: string;
  present: boolean;
}

const AttendancePage: React.FC = () => {
  const [subjects, setSubjects] = useState<Asignatura[]>([]);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: "Juan Pérez", present: false },
    { id: 2, name: "Ana Gómez", present: false },
    { id: 3, name: "Luis Rodríguez", present: false }
  ]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [classDate, setClassDate] = useState<string>('');
  const [classTime, setClassTime] = useState<string>('');
  const [attendance, setAttendance] = useState<Student[]>(students);
  const [error, setError] = useState('');
  const user = localStorage.getItem('user_uid');
  

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user ) {
        console.error("El UID del usuario no está disponible.");
        return; 
      }
      try {
        console.log("UID del usuario:", user);
        const asignaturas = await getAsignaturasdeUnProfesor(user);
        console.log("Asignaturas:", asignaturas);
        setSubjects(asignaturas);
      } catch (error) {
        setError('Error al cargar las asignaturas');
        console.error(error);
      }
    };

    fetchSubjects();
  }, [user]); 

  const handleAttendanceChange = (id: number) => {
    setAttendance(attendance.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleSubmitAttendance = () => {
    if (!selectedSubject || !classDate || !classTime) {
      alert("Por favor complete todos los campos antes de registrar la asistencia.");
      return;
    }

    const selectedSubjectName = subjects.find(subject => subject.id === selectedSubject)?.nombre;
    console.log("Asignatura:", selectedSubjectName);
    console.log("Fecha:", classDate);
    console.log("Hora:", classTime);
    console.log("Asistencia:", attendance);
    alert("Asistencia registrada exitosamente");
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Control de Asistencia</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
        <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>
        <div style={styles.form as React.CSSProperties}>
          <label style={styles.label as React.CSSProperties}>Selecciona Asignatura:</label>
          <select
            value={selectedSubject || ""}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={styles.select as React.CSSProperties}
          >
            <option value="">-- Selecciona una asignatura --</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.nombre}</option>
            ))}
          </select>

          <label style={styles.label as React.CSSProperties}>Fecha de la Clase:</label>
          <input
            type="date"
            value={classDate}
            onChange={(e) => setClassDate(e.target.value)}
            style={styles.input as React.CSSProperties}
          />

          <label style={styles.label as React.CSSProperties}>Hora de Inicio:</label>
          <input
            type="time"
            value={classTime}
            onChange={(e) => setClassTime(e.target.value)}
            style={styles.input as React.CSSProperties}
          />

          <h2>Lista de Estudiantes</h2>
          <table style={styles.table as React.CSSProperties}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Presente</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={student.present}
                      onChange={() => handleAttendanceChange(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button style={styles.submitButton as React.CSSProperties} onClick={handleSubmitAttendance}>
            Registrar Asistencia
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;