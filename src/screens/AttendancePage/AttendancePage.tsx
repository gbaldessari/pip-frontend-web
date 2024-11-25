import React, { useState, useEffect } from "react";
import { attendancePageStyles as styles } from './attendancePage.styles';
import { Asignatura, AsistenciaPayload } from "../../services/services.types";
import { enviarAsistencia, getAsignaturasdeUnProfesor } from "../../services/auth.service";

type Attendance = {
  id: string;
  name: string;
  present: boolean;
}

const AttendancePage: React.FC = () => {
  const [subjects, setSubjects] = useState<Asignatura[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Asignatura | null>(null);
  const [classDate, setClassDate] = useState<string>('');
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [isSelected, setIsSelected] = useState(false);
  const user = localStorage.getItem('user_uid');


  useEffect(() => {
    const fetchSubjects = async () => {
      if (!user) {
        console.error("El UID del usuario no está disponible.");
        return;
      }
      try {
        console.log("UID del usuario:", user);
        const respuesta = await getAsignaturasdeUnProfesor(user);

        if (respuesta.data) {
          setSubjects(respuesta.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSubjects();
  }, [user]);

  const handleAttendanceChange = (id: string) => {
    setAttendance(attendance.map(student =>
      student.id === id ? { ...student, present: !student.present } : student
    ));
  };

  const handleSubmitAttendance = async () => {
    if (!selectedSubject || !classDate) {
      alert("Por favor complete todos los campos antes de registrar la asistencia.");
      return;
    }

    const foundSubject = subjects.find(subject => subject.id === selectedSubject?.id);
    if (!foundSubject) {
      alert("Asignatura no encontrada.");
      return;
    }

    const selectedSubjectid: string = foundSubject.id;

    const attendanceData: AsistenciaPayload[] = attendance.map(student => {
      return {
        cursoId: selectedSubjectid,
        alumnoId: student.id,
        fecha: classDate,
        asistencia: student.present
      };
    });

    const respuesta = await enviarAsistencia(attendanceData);
    if (!respuesta.success) {
      alert("Error al registrar la asistencia.");
      return;
    }
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
            value={selectedSubject?.nombre || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const subject = subjects.find(subject => subject.id === selectedId) || null;
              setSelectedSubject(subject);
              if (selectedId) {
                setIsSelected(true);
              } else {
                setIsSelected(false);
              }
            }}
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

          {isSelected && <div>
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
          </div>}

          <button style={styles.submitButton as React.CSSProperties} onClick={handleSubmitAttendance}>
            Registrar Asistencia
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendancePage;