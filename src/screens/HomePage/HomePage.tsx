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
    const [showPrompt, setShowPrompt] = useState(true);
    const navigate = useNavigate();
    const { fetchUserData, user } = useUser();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoginSuccess('Login exitoso');
            setError('');
            setShowPrompt(false);
            await fetchUserData(userCredential.user.uid);
        } catch (err: any) {
            setError('Error al iniciar sesión: ' + err.message);
            setLoginSuccess('');
            setShowPrompt(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

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
    }, [user, navigate]);

    return (
        <div style={styles.container as React.CSSProperties}>
            <img
                src="src/assets/Cerro_Grande_La_Serena.jpg"
                style={styles.bodyImage as React.CSSProperties}
            />
            <header style={styles.header as React.CSSProperties}>
                <img src="src/assets/Bajos.png" style={styles.headerImage as React.CSSProperties} />
                <h1 style={styles.welcomeTitle}>Bienvenido al Sistema de Gestión Integral<br />Bajos del Cerro Chico</h1>
                <div style={styles.loginContainer as React.CSSProperties}>
                    <div style={styles.messageContainer as React.CSSProperties}>
                        {error && <p style={styles.errorMessage as React.CSSProperties}>{error}</p>}
                        {loginSuccess && <p style={styles.successMessage as React.CSSProperties}>{loginSuccess}</p>}
                        {showPrompt && !error && !loginSuccess && (
                            <p style={styles.successMessage as React.CSSProperties}>Por favor, inicia sesión</p>
                        )}
                    </div>
                    <input
                        type="text"
                        placeholder="Usuario"
                        style={styles.input as React.CSSProperties}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        style={styles.input as React.CSSProperties}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button 
                        style={styles.loginButton as React.CSSProperties}
                        onClick={handleLogin}
                    >
                        Ingresar
                    </button>
                    <button style={styles.forgotPasswordButton as React.CSSProperties} onClick={() => navigate('/password-reset')}>
                        Olvidé mi contraseña
                    </button>
                    <button
                        style={styles.registerButton as React.CSSProperties}
                        onClick={() => navigate('/register')}
                    >
                        Registrarse como Apoderado
                    </button>
                </div>
            </header>
        </div>
    );
};

export default HomePage;
