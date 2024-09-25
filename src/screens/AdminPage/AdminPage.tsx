import { adminPageStyles } from "./adminPage.styles";

const AdminPage: React.FC = () => {
  return (
    <div style={adminPageStyles.container as React.CSSProperties}>
      <header style={adminPageStyles.header as React.CSSProperties}>
        <img src="src/assets/Cerro_Grande_La_Serena.jpg" style={adminPageStyles.backgroundImage as React.CSSProperties} />
        <img src="src/assets/Bajos.png" style={adminPageStyles.headerImage as React.CSSProperties} />
        <button style={adminPageStyles.headerButton as React.CSSProperties}>Header Button</button>
      </header>

      <main style={adminPageStyles.body as React.CSSProperties}>
        <div style={adminPageStyles.subBody as React.CSSProperties}>
          <button style={adminPageStyles.bodyButton as React.CSSProperties}>Registro de estudiantes</button>
          <button style={adminPageStyles.bodyButton as React.CSSProperties}>Gestión de asignaturas</button>
          <button style={adminPageStyles.bodyButton as React.CSSProperties}>Control de asistencia</button>
        </div>
        <div style={adminPageStyles.subBody as React.CSSProperties}>
          <button style={adminPageStyles.bodyButton as React.CSSProperties}>Control de pagos</button>
          <button style={adminPageStyles.bodyButton as React.CSSProperties}>Registro de empleados</button>
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
