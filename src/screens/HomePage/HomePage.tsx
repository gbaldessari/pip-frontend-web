import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { homePageStyles as styles } from './homePage.styles';
import { useUser } from '../../routes/UserContext';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const storage = getStorage();

const HomePage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [showPrompt, setShowPrompt] = useState(true);
    const [headerImageUrl, setHeaderImageUrl] = useState('');
    const [bodyImageUrl, setBodyImageUrl] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { fetchUserData, user } = useUser();

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setLoginSuccess('Inicio de sesión exitoso');
            setError('');
            setShowPrompt(false);
            localStorage.setItem('user_uid', userCredential.user.uid);
            await fetchUserData(userCredential.user.uid);
        } catch (err: any) {
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('El correo electrónico no es válido.');
                    break;
                case 'auth/user-not-found':
                    setError('No se encontró un usuario con este correo.');
                    break;
                case 'auth/wrong-password':
                    setError('La contraseña es incorrecta.');
                    break;
                case 'auth/too-many-requests':
                    setError('Demasiados intentos fallidos. Inténtalo más tarde.');
                    break;
                default:
                    setError('Error al iniciar sesión. Revisa tus datos.');
            }
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
        const fetchImages = async () => {
            try {
                const headerRef = ref(storage, 'Bajos.png');
                const bodyRef = ref(storage, 'Cerro_Grande_La_Serena.jpg');

                const headerUrl = await getDownloadURL(headerRef);
                const bodyUrl = await getDownloadURL(bodyRef);

                setHeaderImageUrl(headerUrl);
                setBodyImageUrl(bodyUrl);
            } catch (error) {
                console.error('Error al cargar las imágenes:', error);
                setError('No se pudieron cargar las imágenes.');
            }
        };

        fetchImages();
    }, []);

    useEffect(() => {
        if (user && location.pathname === '/') {
            if (user.rol === 'profesor') {
                navigate('/teacher');
            } else if (user.rol === 'admin') {
                navigate('/admin');
            } else if (user.rol === 'apoderado') {
                navigate('/main');
            }
        }
    }, [user, navigate, location.pathname]);

    return (
        <div style={styles.container as React.CSSProperties}>
            <img
                src={bodyImageUrl}
                style={styles.bodyImage as React.CSSProperties}
                alt="Cerro Grande La Serena"
            />
            <header style={styles.header as React.CSSProperties}>
                <img 
                    src={headerImageUrl} 
                    style={styles.headerImage as React.CSSProperties} 
                    alt="Bajos del Cerro Chico"
                />
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
                    <div style={styles.passwordContainer}>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Contraseña"
                            style={styles.input as React.CSSProperties}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button
                            style={styles.eyeButton}
                            onMouseDown={() => setShowPassword(true)}
                            onMouseUp={() => setShowPassword(false)}
                            onMouseLeave={() => setShowPassword(false)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button 
                        style={styles.loginButton as React.CSSProperties}
                        onClick={handleLogin}
                    >
                        Ingresar
                    </button>
                    <button 
                        style={styles.forgotPasswordButton as React.CSSProperties} 
                        onClick={() => navigate('/password-reset')}
                    >
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
