import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { homePageStyles as styles } from './homePage.styles';
import { useUser } from '../../routes/UserContext';

const HomePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const navigate = useNavigate();
    const { fetchUserData, user } = useUser();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoginSuccess('Login exitoso');

            // Obtener el rol del usuario desde Firestore
            await fetchUserData(userCredential.user.uid); // Llama a fetchUserData aquí
        } catch (err: any) {
            setError('Error al iniciar sesión: ' + err.message);
        }
    };

    // Uso de useEffect para redirigir según el rol del usuario
    useEffect(() => {
        if (user && user.rol) {
            if (user.rol === 'profesor') {
                navigate('/teacher');
            } else if (user.rol === 'admin') {
                navigate('/admin');
            } else if (user.rol === 'apoderado') {
                navigate('/main');
            }
        }
    }, [user, navigate]); // El efecto se ejecuta cuando 'user' cambia

    return (
        <div style={styles.container as React.CSSProperties}>
            <header style={styles.header as React.CSSProperties}>
                <img src="src/assets/Bajos.png" style={styles.headerImage as React.CSSProperties} />
                <div style={styles.loginContainer as React.CSSProperties}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        style={styles.input as React.CSSProperties}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        style={styles.input as React.CSSProperties}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button 
                        style={styles.loginButton as React.CSSProperties}
                        onClick={handleLogin}
                    >
                        Ingresar
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {loginSuccess && <p style={{ color: 'green' }}>{loginSuccess}</p>}
                    <button style={styles.forgotPasswordButton as React.CSSProperties}>
                        Olvidé mi contraseña
                    </button>
                </div>
            </header>
            <img
                src="src/assets/Cerro_Grande_La_Serena.jpg"
                style={styles.bodyImage as React.CSSProperties}
            />
        </div>
    );
};

export default HomePage;
