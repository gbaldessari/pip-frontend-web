import React from "react";
import { servicesPageStyles as styles } from './servicesPage.styles';

const ServicesPage: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Servicios</h1>
      <p style={styles.message}>Próximamente podrás acceder a servicios como matrículas y mensualidades.</p>
      <div style={styles.underConstruction}>
        <h2 style={styles.subtitle}>Página en construcción</h2>
        <p style={styles.text}>Estamos trabajando en esta funcionalidad. Vuelve pronto para más actualizaciones.</p>
      </div>
    </div>
  );
};

export default ServicesPage;
