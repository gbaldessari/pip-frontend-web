import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { AlumnoResponse, Promedio } from '../../services/services.types';

export const Certificate = ({ student }: { student: AlumnoResponse }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page style={stylesPDF.page}>
        <View style={stylesPDF.header}>
          <Text style={stylesPDF.title}>CERTIFICADO DE MATRÍCULA</Text>
          <Text style={stylesPDF.subtitle}>Año Escolar: {new Date().getFullYear()}</Text>
        </View>
        <View style={stylesPDF.content}>
          <Text style={stylesPDF.text}>El Colegio "Bajos del Cerro Chico", certifica que el/la estudiante:</Text>
          <Text style={stylesPDF.studentInfo}>{`${student.nombre} ${student.apellido}`}</Text>
          <Text style={stylesPDF.studentInfo}>{`Rut: ${student.rut}`}</Text>
          <Text style={stylesPDF.studentInfo}>{`Curso: ${student.curso}`}</Text>
          <Text style={stylesPDF.text}>Se encuentra formalmente matriculado/a en nuestra institución</Text>
          <Text style={stylesPDF.text}>para el presente año académico.</Text>
        </View>
        <View style={stylesPDF.footer}>
          <Text style={stylesPDF.text}>Emitido en La Serena, el {currentDate}</Text>
          <Text style={stylesPDF.text}>Colegio Bajos del Cerro Chico</Text>
        </View>
        <View style={stylesPDF.signature}>
          <Text style={stylesPDF.signatureName}>Gonzalo Honores</Text>
          <Text style={stylesPDF.signatureLine}></Text>
          <Text style={stylesPDF.signatureTitle}>Director del Colegio</Text>
          <View style={{ marginTop: 10 }}>
          </View>
        </View>
      </Page>
    </Document>
  );
};


export const GradesCertificate = ({ student, subjects }: { student: AlumnoResponse, subjects: Promedio[] }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page style={stylesPDF.page}>
        <View style={stylesPDF.header}>
          <Text style={stylesPDF.title}>CERTIFICADO DE NOTAS</Text>
          <Text style={stylesPDF.subtitle}>Año Escolar: {new Date().getFullYear()}</Text>
        </View>
        <View style={stylesPDF.content}>
          <Text style={stylesPDF.text}>El Colegio "Bajos del Cerro Chico", certifica que el/la estudiante:</Text>
          <Text style={stylesPDF.studentInfo}>{`${student.nombre} ${student.apellido}`}</Text>
          <Text style={stylesPDF.studentInfo}>{`Rut: ${student.rut}`}</Text>
          <Text style={stylesPDF.studentInfo}>{`Curso: ${student.curso}`}</Text>
          <Text style={stylesPDF.text}>Ha obtenido los siguientes promedios en las asignaturas cursadas:</Text>
          <View style={stylesPDF.table}>
            <View style={stylesPDF.tableRow}>
              <Text style={stylesPDF.tableHeader}>Asignatura</Text>
              <Text style={stylesPDF.tableHeader}>Promedio</Text>
            </View>
            {subjects.map((subject, index) => (
              <View key={index} style={stylesPDF.tableRow}>
                <Text style={stylesPDF.tableCell}>{subject.asignatura}</Text>
                <Text style={stylesPDF.tableCell}>{subject.promedio}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={stylesPDF.footer}>
          <Text style={stylesPDF.text}>Emitido en La Serena, el {currentDate}</Text>
          <Text style={stylesPDF.text}>Colegio Bajos del Cerro Chico</Text>
        </View>
        <View style={stylesPDF.signature}>
          <Text style={stylesPDF.signatureName}>Gonzalo Honores</Text>
          <Text style={stylesPDF.signatureLine}></Text>
          <Text style={stylesPDF.signatureTitle}>Director del Colegio</Text>
        </View>
      </Page>
    </Document>
  );
};

const stylesPDF = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 30,
    lineHeight: 1.6,
    backgroundColor: '#ffffff',
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottom: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    margin: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  subtitle: {
    fontSize: 18,
    margin: 5,
    color: '#666666',
  },
  content: {
    margin: 20,
    textAlign: 'left',
  },
  text: {
    marginBottom: 10,
    fontSize: 14,
    color: '#333333',
  },
  studentInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  grades: {
    marginTop: 10,
    textAlign: 'left',
    marginLeft: 50,
  },
  grade: {
    marginBottom: 5,
    fontSize: 14,
    color: '#333333',
  },
  footer: {
    marginTop: 40,
    textAlign: 'center',
    borderTop: 1,
    paddingTop: 10,
  },
  signature: {
    marginTop: 50,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  signatureName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  signatureLine: {
    borderTop: 1,
    width: 200,
    margin: '10px auto',
  },
  signatureTitle: {
    marginTop: 5,
    color: '#666666',
  },
  table: {
    width: 'auto',
    margin: '10px 0',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
    borderBottom: 1,
    borderColor: '#000',
    width: '50%',
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 12,
    padding: 5,
    borderBottom: 1,
    borderColor: '#000',
    width: '50%',
    textAlign: 'center',
  },
});
