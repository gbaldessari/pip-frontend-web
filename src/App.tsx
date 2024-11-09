import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRoutes } from "./routes/AppRoutes";
import { UserProvider, useUser } from './routes/UserContext'; // Asegúrate de que la ruta sea correcta


function Loading() {
    return <div>Cargando...</div>; // Componente de carga simple
}

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <div style={{ position: "fixed", top: 0, left: 0, width: '100%', }}>
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'auto', }}>
                        <MainContent />
                    </div>
                </div>
            </BrowserRouter>
        </UserProvider>
    );
}

const MainContent = () => {
    const { loading } = useUser();

    if (loading) {
        return <Loading />;
    }

    return <AppRoutes />;
}

export default App;
