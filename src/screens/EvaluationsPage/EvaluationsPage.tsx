import React, { useEffect, useState } from "react";
import { evaluationsPageStyles as styles } from './evaluationsPage.styles';
import { getAlumnosdeUnApoderado, obtenerNotas } from "../../services/auth.service";
import { AlumnoResponse, NotaResponse } from "../../services/services.types";

const user = localStorage.getItem('user_uid');

type Evaluaciones = {
  asignatura: string;
  notas: number[];
};

const EvaluationsPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [students, setStudents] = useState<AlumnoResponse[]>([]);
  const [evaluations, setEvaluations] = useState<Evaluaciones[]>([]);

  useEffect(() => {
    fetchStudents();
  }, [user]);
  
  const fetchStudents = async () => {
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    try {
      const response = await getAlumnosdeUnApoderado(user);
      console.log(response);
      if (response.data) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al obtener los alumnos.");
    }
  }
  
  const fetchGrades = async (studentId: string) => {
    if (!studentId) return;
    const response = await obtenerNotas(studentId);
    if (response.data) {
      setEvaluations(ordenarNotas(response.data));
    }
    else{
      console.log(response.error);
      alert("Error al obtener las notas");
    }
  }

  const ordenarNotas = (notas: NotaResponse[]) => {
    const evaluaciones: Evaluaciones[] = [];
    notas.forEach((nota) => {
      const index = evaluaciones.findIndex(e => e.asignatura === nota.asignatura);
      if (index === -1) {
        evaluaciones.push({ asignatura: nota.asignatura, notas: [nota.calificacion] });
      } else {
        evaluaciones[index].notas.push(nota.calificacion);
      }
    });
    return evaluaciones;
  }

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(event.target.value);
    if (event.target.value) {
      fetchGrades(event.target.value);
    }
  };

  const calculateAverage = (grades: number[]) => {
    if (grades.length === 0) return "-";
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return (total / grades.length).toFixed(2);
  };

  const overallAverage = (
    evaluations.reduce((sum, evaluation) => {
      const avg = evaluation.notas.length ? parseFloat(calculateAverage(evaluation.notas)) : 0;
      return sum + avg;
    }, 0) / evaluations.filter(e => e.notas.length > 0).length
  ).toFixed(2);

  const getGradeStyle = (grade: number) => {
    return {
      ...styles.tableCell,
      color: grade < 4 ? 'red' : 'black',
    } as React.CSSProperties;
  };

  const maxGrades = Math.max(...evaluations.map(e => e.notas.length));

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Evaluaciones</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
        <select onChange={handleStudentChange} style={styles.select as React.CSSProperties}>
          <option value="">Seleccione un alumno</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.nombre+" "+student.apellido}</option>
          ))}
        </select>
        {selectedStudent && (
          <table style={styles.table as React.CSSProperties}>
            <thead style={styles.tableHead as React.CSSProperties}>
              <tr>
                <th style={styles.tableCell as React.CSSProperties}>Asignatura</th>
                {Array.from({ length: maxGrades }, (_, i) => (
                  <th key={i} style={styles.tableCell as React.CSSProperties}>Nota {i + 1}</th>
                ))}
                <th style={styles.tableCell as React.CSSProperties}>Promedio</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody}>
              {evaluations.map((evaluation) => (
                <tr key={evaluation.asignatura}>
                  <td style={styles.tableCell as React.CSSProperties}>{evaluation.asignatura}</td>
                  {Array.from({ length: maxGrades }, (_, i) => (
                    <td key={i} style={getGradeStyle(evaluation.notas[i] || 0)}>
                      {evaluation.notas[i] !== undefined ? evaluation.notas[i] : '-'}
                    </td>
                  ))}
                  <td style={styles.tableCell as React.CSSProperties}>
                    {calculateAverage(evaluation.notas)}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={styles.tableCell as React.CSSProperties}><strong>Promedio General</strong></td>
                <td colSpan={maxGrades} style={styles.tableCell as React.CSSProperties}></td>
                <td style={styles.tableCell as React.CSSProperties}><strong>{overallAverage}</strong></td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default EvaluationsPage;
