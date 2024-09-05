import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "fixed", left: 0, width: '100%', }}>
        <div style={{display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto',}}>
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
