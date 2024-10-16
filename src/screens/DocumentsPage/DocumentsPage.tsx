import React from "react";
import { documentsPageStyles as styles } from './documentsPage.styles';

const DocumentsPage: React.FC = () => {
  // Lista de documentos disponibles para descargar
  const documents = [
    { id: 1, name: "Certificado de Notas", url: "/downloads/certificado-notas.pdf" },
    { id: 2, name: "Carta de Conducta", url: "/downloads/carta-conducta.pdf" },
    { id: 3, name: "Constancia de Inscripción", url: "/downloads/constancia-inscripcion.pdf" },
    { id: 4, name: "Certificado de Finalización", url: "/downloads/certificado-finalizacion.pdf" },
  ];

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Documentos</h1>
      </header>
      <p style={styles.description}>Accede a tus documentos importantes:</p>
      <ul style={styles.documentList}>
        {documents.map((document) => (
          <li key={document.id} style={styles.documentItem}>
            <a href={document.url} download style={styles.downloadButton}>
              {document.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;
