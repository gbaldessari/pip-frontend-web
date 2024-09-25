import { mainPageStyles } from "./mainPage.styles";

const MainPage: React.FC = () => {
  return (
    <div style={mainPageStyles.container as React.CSSProperties}>
      <header style={mainPageStyles.header as React.CSSProperties}>
        <img src="src/assets/Cerro_Grande_La_Serena.jpg" style={mainPageStyles.backgroundImage as React.CSSProperties} />
        <img src="src/assets/Bajos.png" style={mainPageStyles.headerImage as React.CSSProperties} />
        <button style={mainPageStyles.headerButton as React.CSSProperties}>Header Button</button>
      </header>

      <main style={mainPageStyles.body as React.CSSProperties}>
        <div style={mainPageStyles.subBody as React.CSSProperties}>
          <button style={mainPageStyles.bodyButton as React.CSSProperties}>Evaluaciones</button>
          <button style={mainPageStyles.bodyButton as React.CSSProperties}>Documentos</button>
          <button style={mainPageStyles.bodyButton as React.CSSProperties}>Reportes</button>
        </div>
        <div style={mainPageStyles.subBody as React.CSSProperties}>
          <button style={mainPageStyles.bodyButton as React.CSSProperties}>Servicios</button>
          <button style={mainPageStyles.bodyButton as React.CSSProperties}>Reclamos</button>
        </div>
      </main>
    </div>
  );
};

export default MainPage;
