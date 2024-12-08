import React, { useState, useEffect } from "react";
import { gradesAdminPageStyles as styles } from "./gradesAdminPage.styles";
import { useNavigate } from "react-router-dom";
import { enviarNotas, getAlumnosCurso, getAsignaturasdeUnProfesor } from "../../services/auth.service";
import { Asignatura, NotaPayload } from "../../services/services.types";

type Nota = {
  id: string;
  name: string;
  grade?: number;
}

const GradesAdminPage: React.FC = () => {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [subjects, setSubjects] = useState<Asignatura[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Asignatura | null>(null);
  const [isSelected, setIsSelected] = useState(false);
  const [evaluationDate, setEvaluationDate] = useState<string>("");
  const user = localStorage.getItem('user_uid');
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchSubjects();
  }, [user]);

  const handleGradeChange = (studentId: string, grade: number) => {
    setNotas(prevStudents =>
      prevStudents.map(student => (student.id === studentId ? { ...student, grade } : student))
    );
  };

  const fetchStudents = async (id: string) => {
    try {
      const respuesta = await getAlumnosCurso(id);
      if (respuesta.data) {
        setNotas(respuesta.data.map(student => ({
          id: student.id,
          name: `${student.nombre} ${student.apellido}`,
        })));
      }
    } catch (error) {
      console.error(error);
      alert("Error al obtener la lista de estudiantes.");
    }
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedSubject || !evaluationDate) {
      alert("Por favor complete todos los campos antes de registrar la evaluación.");
      return;
    }

    const payload: NotaPayload[] = notas.map(student => ({
      calificacion: student.grade || 0,
      alumnoId: student.id,
      asignaturaId: selectedSubject.id,
      fecha: evaluationDate,
    }));

    const respuesta = await enviarNotas(payload);
    if (respuesta.success) {
      alert("Evaluación registrada exitosamente");
    }
    else{
      console.error(respuesta.error);
      alert("Error al registrar la evaluación.");
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Registrar Evaluación</h1>
        <button style={styles.backButton} onClick={() => navigate(-1)}>
          Volver al menú
        </button>
      </header>
      <div style={styles.body as React.CSSProperties}>
        <div style={styles.form as React.CSSProperties}>
          <label style={styles.label as React.CSSProperties}>Asignatura:</label>
          <select
            value={selectedSubject?.id || ""}
            onChange={(e) => {
              const selectedId = e.target.value;
              const subject = subjects.find(subject => subject.id === selectedId) || null;
              setSelectedSubject(subject);
              if (selectedId) {
                setIsSelected(true);
                fetchStudents(subject?.id || '');
              } else {
                setIsSelected(false);
              }
            }}
            style={styles.select as React.CSSProperties}
          >
            <option value="">-- Selecciona una asignatura --</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.nombre + " " + subject.curso.nombre}</option>
            ))}
          </select>

          <label style={styles.label as React.CSSProperties}>Fecha de Evaluación:</label>
          <input
            type="date"
            value={evaluationDate}
            onChange={(e) => setEvaluationDate(e.target.value)}
            style={styles.input as React.CSSProperties}
          />

          {isSelected && (<div>
            <h2>Calificaciones de Estudiantes</h2>
            <table style={styles.table as React.CSSProperties}>
              <thead style={styles.tableHead as React.CSSProperties}>
                <tr>
                  <th style={styles.tableCell as React.CSSProperties}>Nombre</th>
                  <th style={styles.tableCell as React.CSSProperties}>Calificación</th>
                </tr>
              </thead>
              <tbody style={styles.tableBody as React.CSSProperties}>
                {notas.map(notas => (
                  <tr key={notas.id}>
                    <td style={styles.tableCell as React.CSSProperties}>{notas.name}</td>
                    <td style={styles.tableCell as React.CSSProperties}>
                      <input
                        type="number"
                        value={notas.grade || ""}
                        onChange={(e) => handleGradeChange(notas.id, parseFloat(e.target.value))}
                        style={styles.input as React.CSSProperties}
                        min="1"
                        max="7"
                        step="0.1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>)}
          <button style={styles.submitButton as React.CSSProperties} onClick={handleSubmitEvaluation}>
            Registrar Evaluación
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradesAdminPage;
