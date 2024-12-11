import React, { useEffect, useState } from "react";
import { reportsPageStyles as styles } from './reportsPage.styles';
import { getAlumnosdeUnApoderado, obtenerAsistencia } from "../../services/auth.service";
import { AlumnoResponse, AsistenciaResponse } from "../../services/services.types";

const user = localStorage.getItem('user_uid');

type Attendance = {
  subject: string;
  classes: { date: string; attendance: number }[];
};

const ReportsPage: React.FC = () => {

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [students, setStudents] = useState<AlumnoResponse[]>([]);
  const [attendance, setAttendance] = useState<Attendance[]>([]);
  const [currentWeek, setCurrentWeek] = useState<number>(0);

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

  const fetchAttendance = async (studentId: string) => {
    if (!studentId) return;
    const response = await obtenerAsistencia(studentId);
    if (response.data) {
      console.log(response.data);
      setAttendance(ordenarAsistencia(response.data));
    }
    else {
      console.log(response.error);
      alert("Error al obtener la asistencia");
    }
  }

  const ordenarAsistencia = (data: AsistenciaResponse[]) => {
    const asistencia: Attendance[] = [];
    data.forEach((record) => {
      const index = asistencia.findIndex(e => e.subject === record.nombreAsignatura);
      if (index === -1) {
        asistencia.push({ subject: record.nombreAsignatura, classes: [{ date: record.fecha, attendance: record.asistencia ? 1 : 0 }] });
      } else {
        asistencia[index].classes.push({ date: record.fecha, attendance: record.asistencia ? 1 : 0 });
      }
    });
    asistencia.forEach(subject => {
      subject.classes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    return asistencia;
  }

  const getWeekRange = (weekOffset: number) => {
    const currentDate = new Date();
    const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1 + (weekOffset * 7)));
    const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6));
    return { firstDayOfWeek, lastDayOfWeek };
  };

  const filterAttendanceByWeek = (attendance: Attendance[], weekOffset: number) => {
    const { firstDayOfWeek, lastDayOfWeek } = getWeekRange(weekOffset);
    return attendance.map(record => ({
      subject: record.subject,
      classes: record.classes.filter(cls => {
        const classDate = new Date(cls.date);
        return classDate >= firstDayOfWeek && classDate <= lastDayOfWeek;
      })
    }));
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getFormattedDateRange = (weekOffset: number) => {
    const { firstDayOfWeek, lastDayOfWeek } = getWeekRange(weekOffset);
    return `${formatDate(firstDayOfWeek)} - ${formatDate(lastDayOfWeek)}`;
  };

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 1);
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 1);
  };

  const getWeekDays = (weekOffset: number) => {
    const { firstDayOfWeek } = getWeekRange(weekOffset);
    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(firstDayOfWeek);
      currentDay.setDate(firstDayOfWeek.getDate() + i);
      days.push({
        date: formatDate(currentDay),
        day: currentDay.toLocaleDateString('es-ES', { weekday: 'long' })
      });
    }
    return days;
  };

  useEffect(() => {
    fetchStudents();
  }, [user]);

  useEffect(() => {
    if (selectedStudent) {
      fetchAttendance(selectedStudent);
    }
  }, [selectedStudent]);

  const getAttendanceStyle = (status: number) => {
    let backgroundColor;
    switch (status) {
      case 0:
        backgroundColor = 'red';
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
        <h1>Asistencia</h1>
      </header>
      <select
        value={selectedStudent || ""}
        onChange={(e) => setSelectedStudent(e.target.value)}
        style={styles.select as React.CSSProperties}
      >
        <option value="" disabled>Seleccione un alumno</option>
        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.nombre + " " + student.apellido}
          </option>
        ))}
      </select>
      <div style={styles.weekNavigation as React.CSSProperties}>
        <button 
          onClick={handlePreviousWeek} 
          style={styles.button as React.CSSProperties}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Semana Anterior
        </button>
        <button 
          onClick={handleNextWeek} 
          style={styles.button as React.CSSProperties}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Semana Siguiente
        </button>
      </div>
      <div style={styles.dateRange as React.CSSProperties}>
        {getFormattedDateRange(currentWeek)}
      </div>
      {selectedStudent && attendance.length > 0 && (
        <div style={styles.tableContainer as React.CSSProperties}>
          <table style={styles.table as React.CSSProperties}>
            <thead style={styles.tableHead}>
              <tr>
                <th style={styles.tableCell}>Asignatura</th>
                {getWeekDays(currentWeek).map((day, index) => (
                  <th key={index} style={styles.tableCell}>
                    {day.day} <br /> {day.date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody style={styles.tableBody as React.CSSProperties}>
              {filterAttendanceByWeek(attendance, currentWeek).map((record) => (
                <tr key={record.subject} style={styles.tableRow}>
                  <td style={styles.tableCell}>{record.subject}</td>
                  {getWeekDays(currentWeek).map((day, index) => {
                    const classRecord = record.classes.find(cls => formatDate(new Date(cls.date)) === day.date);
                    return (
                      <td key={index} style={classRecord ? getAttendanceStyle(classRecord.attendance) : styles.tableCell}/>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
