import React, { useState, useEffect } from "react";
import { gradesAdminPageStyles as styles } from "./gradesAdminPage.styles";
import { collection, getDocs, addDoc, getFirestore } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  grade?: number; // Calificación
}

interface Subject {
  id: string;
  name: string;
}

interface Course {
  id: string;
  name: string;
}

const GradesAdminPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [evaluationDate, setEvaluationDate] = useState<string>("");
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      const subjectSnapshot = await getDocs(collection(db, "Asignaturas"));
      const subjectsData = subjectSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().nombre }));
      setSubjects(subjectsData);
    };

    const fetchCourses = async () => {
      const courseSnapshot = await getDocs(collection(db, "Cursos"));
      const coursesData = courseSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().nombre }));
      setCourses(coursesData);
    };

    fetchSubjects();
    fetchCourses();
  }, [db]);

  const handleSelectCourse = async (courseId: string) => {
    setSelectedCourse(courseId);
    const studentSnapshot = await getDocs(collection(db, "Alumnos"));
    const studentsData = studentSnapshot.docs
      .filter(doc => doc.data().curso === courseId)
      .map(doc => ({ id: doc.id, name: doc.data().nombre }));
    setStudents(studentsData);
  };

  const handleGradeChange = (studentId: string, grade: number) => {
    setStudents(prevStudents =>
      prevStudents.map(student => (student.id === studentId ? { ...student, grade } : student))
    );
  };

  const handleSubmitEvaluation = async () => {
    if (!selectedSubject || !selectedCourse || !evaluationDate) {
      alert("Por favor complete todos los campos antes de registrar la evaluación.");
      return;
    }

    students.forEach(async student => {
      if (student.grade !== undefined) {
        await addDoc(collection(db, "Evaluaciones"), {
          alumnoId: student.id,
          calificacion: student.grade,
          profesorId: "profesor_id", // Reemplaza esto con el ID del profesor actual
          asignaturaId: selectedSubject,
          fecha: evaluationDate,
        });
      }
    });

    alert("Evaluación registrada exitosamente");
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
            value={selectedSubject || ""}
            onChange={(e) => setSelectedSubject(e.target.value)}
            style={styles.select as React.CSSProperties}
          >
            <option value="">-- Selecciona una asignatura --</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>{subject.name}</option>
            ))}
          </select>

          <label style={styles.label as React.CSSProperties}>Curso:</label>
          <select
            value={selectedCourse || ""}
            onChange={(e) => handleSelectCourse(e.target.value)}
            style={styles.select as React.CSSProperties}
          >
            <option value="">-- Selecciona un curso --</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>

          <label style={styles.label as React.CSSProperties}>Fecha de Evaluación:</label>
          <input
            type="date"
            value={evaluationDate}
            onChange={(e) => setEvaluationDate(e.target.value)}
            style={styles.input as React.CSSProperties}
          />

          <h2>Calificaciones de Estudiantes</h2>
          <table style={styles.table as React.CSSProperties}>
            <thead style={styles.tableHead as React.CSSProperties}>
              <tr>
                <th style={styles.tableCell as React.CSSProperties}>Nombre</th>
                <th style={styles.tableCell as React.CSSProperties}>Calificación</th>
              </tr>
            </thead>
            <tbody style={styles.tableBody as React.CSSProperties}>
              {students.map(student => (
                <tr key={student.id}>
                  <td style={styles.tableCell as React.CSSProperties}>{student.name}</td>
                  <td style={styles.tableCell as React.CSSProperties}>
                    <input
                      type="number"
                      value={student.grade || ""}
                      onChange={(e) => handleGradeChange(student.id, parseFloat(e.target.value))}
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

          <button style={styles.submitButton as React.CSSProperties} onClick={handleSubmitEvaluation}>
            Registrar Evaluación
          </button>
        </div>
      </div>
    </div>
  );
};

export default GradesAdminPage;
