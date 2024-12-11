import React, { useState, useEffect } from "react";
import { documentsPageStyles as styles } from './documentsPage.styles';
import { pdf } from '@react-pdf/renderer';
import { getAlumnosdeUnApoderado, obtenerNotas } from "../../services/auth.service";
import { AlumnoResponse, NotaResponse, Promedio } from "../../services/services.types";
import { Certificate, GradesCertificate } from "./documents.template";


const DownloadLink = ({ loading, onClick }: { loading: boolean, onClick: () => void }) => {
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={onClick}
      style={{
        ...styles.downloadButton,
        ...(hover ? styles.downloadButtonHover : {}),
      } as React.CSSProperties}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {loading ? "Generando documento..." : "Descargar Documento"}
    </button>
  );
};

const DocumentsPage: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [students, setStudents] = useState<AlumnoResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudents = async () => {
    const user = localStorage.getItem('user_uid');
    if (!user) {
      console.error("El UID del usuario no está disponible.");
      return;
    }
    try {
      const response = await getAlumnosdeUnApoderado(user);
      if (response.data) {
        console.log(response.data);
        setStudents(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error al obtener los alumnos.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDownload = async () => {
    if (!selectedStudent) return;
    const student = students.find((s) => s.id === selectedStudent);
    if (!student) return;
    const blob = await pdf(<Certificate student={student} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificado_matricula.pdf';
    a.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  const obtenerPromedios = (notas: NotaResponse[]) => {
    const subjects: { [key: string]: number[] } = {};

    notas.forEach((nota) => {
      if (!subjects[nota.asignatura]) {
        subjects[nota.asignatura] = [];
      }
      subjects[nota.asignatura].push(nota.calificacion);
    });

    const promedios: Promedio[] = Object.keys(subjects).map((asignatura) => {
      const notasAsignatura = subjects[asignatura];
      const promedio = notasAsignatura.reduce((acc, curr) => acc + curr, 0) / notasAsignatura.length;
      return { asignatura, promedio };
    });
    console.log(promedios);
    return promedios;
  };

  const fetchGrades = async (studentId: string) => {
    if (!studentId) return;
    const response = await obtenerNotas(studentId);
    if (response.data) {
      return obtenerPromedios(response.data);
    }
    else{
      console.log(response.error);
      alert("Error al obtener las notas");
    }
  }

  const handleDownloadGrades = async (evaluations: Promedio[]) => {
    if (!selectedStudent) return;
    const student = students.find((s) => s.id === selectedStudent);
    if (!student) return;
    setLoading(true);
    const blob = await pdf(<GradesCertificate student={student} subjects={evaluations} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'certificado_notas.pdf';
    a.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  };

  const documents = [
    { id: 1, name: "Certificado de Notas" },
    { id: 2, name: "Certificado de Matrícula" },
  ];

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Documentos</h1>
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
      {selectedStudent && (
        <>
          <p style={styles.description as React.CSSProperties}>Accede a tus documentos importantes:</p>
          <ul style={styles.documentList as React.CSSProperties}>
            {documents.map((doc) => (
              <li key={doc.id} style={styles.documentItem as React.CSSProperties}>
                <p style={styles.documentName as React.CSSProperties}>{doc.name}</p>
                {doc.name === "Certificado de Matrícula" && (
                  <DownloadLink loading={loading} onClick={handleDownload} />
                )}
                {doc.name === "Certificado de Notas" && (
                  <DownloadLink loading={loading} onClick={async () => handleDownloadGrades(await fetchGrades(selectedStudent) || [])} />
                )}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default DocumentsPage;