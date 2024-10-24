import React from "react";
import { reportsPageStyles as styles } from './reportsPage.styles';

const ReportsPage: React.FC = () => {
  const attendance = [
    { 
      subject: "Matemáticas", 
      classes: [
        { date: "14/10", time: "12:00", attendance: 0 },
        { date: "12/10", time: "10:00", attendance: 1 }
      ] 
    },
    { 
      subject: "Historia", 
      classes: [
        { date: "14/10", time: "14:00", attendance: 1 },
        { date: "13/10", time: "10:00", attendance: 2 }
      ] 
    },
    { 
      subject: "Física", 
      classes: [
        { date: "14/10", time: "16:00", attendance: 1 },
        { date: "13/10", time: "12:00", attendance: 0 }
      ] 
    }
  ];

  const getAttendanceStyle = (status: number) => {
    let backgroundColor;
    switch (status) {
      case 0:
        backgroundColor = 'red'; 
        break;
      case 2:
        backgroundColor = 'yellow';
        break;
      default:
        backgroundColor = 'green';
    }
    return {
      ...styles.tableCell,
      backgroundColor,
    };
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Reportes de Asistencia</h1>
      </header>
      {attendance.map((record) => (
        <table key={record.subject} style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableCell}>Asignatura</th>
              {record.classes.map((cls, index) => (
                <th key={index} style={styles.tableCell}>
                  {cls.date} <br /> {cls.time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            <tr style={styles.tableRow}>
              <td style={styles.tableCell}>{record.subject}</td>
              {record.classes.map((cls, index) => (
                <td key={index} style={getAttendanceStyle(cls.attendance)}></td>
              ))}
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default ReportsPage;
