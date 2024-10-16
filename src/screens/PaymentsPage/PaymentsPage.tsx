import React from "react";
import { paymentsPageStyles as styles } from './paymentsPage.styles';

const PaymentsPage: React.FC = () => {
  return (
    <div style={styles.container as React.CSSProperties}>
      <h1 style={styles.heading as React.CSSProperties}>Control de Pagos</h1>
      <p style={styles.description as React.CSSProperties}>Esta sección está actualmente en construcción. Pronto podrás gestionar los pagos de los estudiantes.</p>
      <div style={styles.constructionBox as React.CSSProperties}>
        <p style={styles.constructionText as React.CSSProperties}>
          ¡Estamos trabajando en esta funcionalidad! Volverá pronto.
        </p>
      </div>
    </div>
  );
};

export default PaymentsPage;
