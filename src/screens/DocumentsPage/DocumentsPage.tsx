import React from "react";
import { documentsPageStyles as styles } from './documentsPage.styles';
import { generateDocument } from '../../services/documents.service';

const DocumentsPage: React.FC = () => {
  const documents = [
    { id: 1, name: "Certificado de Notas", htmlContent: "<h1>Certificado de Notas</h1><p>Este es el certificado de notas.</p>" },
    { id: 2, name: "Matricula", htmlContent: "<!DOCTYPE html>\n<html lang=\"es\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Certificado de Matrícula</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            line-height: 1.6;\n            margin: 50px;\n            border: 1px solid #000;\n            padding: 30px;\n        }\n        .header {\n            text-align: center;\n            margin-bottom: 20px;\n        }\n        .header img {\n            width: 100px;\n            height: auto;\n        }\n        .header h1 {\n            font-size: 24px;\n            margin: 10px 0;\n        }\n        .content {\n            margin: 20px 0;\n        }\n        .content p {\n            margin: 10px 0;\n        }\n        .footer {\n            margin-top: 40px;\n            text-align: center;\n        }\n        .footer p {\n            margin: 5px 0;\n        }\n        .signature {\n            margin-top: 50px;\n            text-align: center;\n        }\n        .signature div {\n            display: inline-block;\n            text-align: center;\n        }\n        .signature div p {\n            margin: 5px 0;\n        }\n        .signature-line {\n            border-top: 1px solid #000;\n            width: 200px;\n            margin: 0 auto;\n        }\n    </style>\n</head>\n<body>\n    <div class=\"header\">\n        <img src=\"https://via.placeholder.com/100\" alt=\"Logo del colegio\">\n        <h1>CERTIFICADO DE MATRÍCULA</h1>\n        <p><strong>Año Escolar: 2024</strong></p>\n    </div>\n\n    <div class=\"content\">\n        <p>El Colegio <strong>\"San Pedro\"</strong>, certifica que el/la estudiante:</p>\n        <p><strong>Nombre del Estudiante:</strong> Juan Pérez Rodríguez</p>\n        <p><strong>Documento de Identidad:</strong> 123456789</p>\n        <p><strong>Grado:</strong> 6° Primaria</p>\n        <p><strong>Fecha de Matrícula:</strong> 10 de diciembre de 2023</p>\n        <p>Se encuentra formalmente matriculado/a en nuestra institución para el presente año académico.</p>\n    </div>\n\n    <div class=\"footer\">\n        <p>Emitido en Ciudad de México, el 10 de diciembre de 2023</p>\n        <p><strong>Colegio San Pedro</strong></p>\n    </div>\n\n    <div class=\"signature\">\n        <div>\n            <p class=\"signature-line\"></p>\n            <p><strong>Director/a del Colegio</strong></p>\n        </div>\n    </div>\n</body>\n</html>" },
  ];

  const handleGenerateDocument = async (htmlContent: string) => {
    try {
      const pdfBlob = await generateDocument(htmlContent);
      const url = window.URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'documento.pdf');
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) {
        link.parentNode.removeChild(link);
      }
    } catch (error) {
      console.error('Error generating document:', error);
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Documentos</h1>
      </header>
      <p style={styles.description}>Accede a tus documentos importantes:</p>
      <ul style={styles.documentList}>
        {documents.map((document) => (
          <li key={document.id} style={styles.documentItem}>
            <button onClick={() => handleGenerateDocument(document.htmlContent)} style={styles.generateButton as React.CSSProperties}>
              Generar {document.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsPage;
