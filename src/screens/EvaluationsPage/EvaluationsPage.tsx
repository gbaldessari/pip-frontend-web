import React from "react";
import { evaluationsPageStyles as styles } from './evaluationsPage.styles';

const EvaluationsPage: React.FC = () => {
  const evaluations = [
    { subject: "Matemáticas", grades: [6, 7, 4, 3, 5] },
    { subject: "Historia", grades: [] },
    { subject: "Física", grades: [7, 6, 5, 4, 6] },
    { subject: "Lengua", grades: [6, 5, 3] },
    { subject: "Inglés", grades: [7, 6, 6, 5, 7] },
  ];

  const calculateAverage = (grades: number[]) => {
    if (grades.length === 0) return "-";
    const total = grades.reduce((sum, grade) => sum + grade, 0);
    return (total / grades.length).toFixed(2);
  };

  const overallAverage = (
    evaluations.reduce((sum, evaluation) => {
      const avg = evaluation.grades.length ? parseFloat(calculateAverage(evaluation.grades)) : 0;
      return sum + avg;
    }, 0) / evaluations.filter(e => e.grades.length > 0).length
  ).toFixed(2);

  const getGradeStyle = (grade: number) => {
    return {
      ...styles.tableCell,
      color: grade < 4 ? 'red' : 'black',
    } as React.CSSProperties;
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Evaluaciones</h1>
      </header>
      <div style={styles.body as React.CSSProperties}>
        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th style={styles.tableCell as React.CSSProperties}>Asignatura</th>
              {Array.from({ length: 5 }, (_, i) => (
                <th key={i} style={styles.tableCell as React.CSSProperties}>Nota {i + 1}</th>
              ))}
              <th style={styles.tableCell as React.CSSProperties}>Promedio</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody}>
            {evaluations.map((evaluation) => (
              <tr key={evaluation.subject}>
                <td style={styles.tableCell as React.CSSProperties}>{evaluation.subject}</td>
                {Array.from({ length: 5 }, (_, i) => (
                  <td key={i} style={getGradeStyle(evaluation.grades[i] || 0)}>
                    {evaluation.grades[i] !== undefined ? evaluation.grades[i] : '-'}
                  </td>
                ))}
                <td style={styles.tableCell as React.CSSProperties}>
                  {calculateAverage(evaluation.grades)}
                </td>
              </tr>
            ))}
            <tr>
              <td style={styles.tableCell as React.CSSProperties}><strong>Promedio General</strong></td>
              <td colSpan={5} style={styles.tableCell as React.CSSProperties}></td>
              <td style={styles.tableCell as React.CSSProperties}><strong>{overallAverage}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EvaluationsPage;
