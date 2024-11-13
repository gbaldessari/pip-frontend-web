import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { registerPageStyles as styles } from './registerPage.styles'; // Importar estilos
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Iconos de ojo para ver/ocultar contraseña
import { registerApoderado, registerUser } from '../../services/auth.service';
import { RegisterApoderado, RegisterUser} from '../../services/services.types';

const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const validateInputs = () => {
        if (!name || !lastName) {
            setError('Nombre y Apellido no pueden estar vacíos.');
            return false;
        }
        if (password.length < 8) {
            setError('La contraseña debe tener al menos 8 caracteres.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        if (!validateInputs()) return;
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            console.log("🚀 ~ handleRegister ~ userCredential:", userCredential)

            const data : RegisterApoderado = {
                id: user.uid,
                nombre: name,
                apellido: lastName
            }

            const dataUser : RegisterUser = {
                id: user.uid,
                nombre: name,
                apellido: lastName,
                rol: 'apoderado',
                uid: user.uid
            }

            const userResp = await registerApoderado(data)
            const userResp2 = await registerUser(dataUser)
            
            console.log("🚀 ~ handleRegister ~ userResp2:", userResp2)
            console.log("🚀 ~ handleRegister ~ userResp:", userResp)
            
            await sendEmailVerification(user);
            setLoginSuccess('Registro exitoso. Revisa tu correo para verificar tu cuenta.');

            setTimeout(() => navigate('/'), 5000);

        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Este correo ya está registrado.');
            } else if (err.code === 'auth/invalid-email') {
                setError('Correo inválido.');
            } else {
                setError('Error al crear la cuenta: ' + err.message);
            }
        }
            
    };

    return (
        <div style={styles.container as React.CSSProperties}>
            <div style={styles.formContainer as React.CSSProperties}>
                <h2 style={styles.title as React.CSSProperties}>Registro de Apoderado</h2>
                <input
                    type="text"
                    placeholder="Nombre"
                    style={styles.input as React.CSSProperties}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Apellido"
                    style={styles.input as React.CSSProperties}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Correo"
                    style={styles.input as React.CSSProperties}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div style={styles.passwordContainer as React.CSSProperties}>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        style={styles.input as React.CSSProperties}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                        style={styles.eyeIcon as React.CSSProperties}
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>
                <input
                    type="password"
                    placeholder="Confirmar Contraseña"
                    style={styles.input as React.CSSProperties}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button 
                    style={styles.button as React.CSSProperties}
                    onClick={handleRegister}
                >
                    Registrar
                </button>
                {error && <p style={styles.errorText as React.CSSProperties}>{error}</p>}
                {loginSuccess && <p style={styles.successText as React.CSSProperties}>{loginSuccess}</p>}
                <button
                    style={styles.backButton as React.CSSProperties}
                    onClick={() => navigate('/')}
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default RegisterPage;
