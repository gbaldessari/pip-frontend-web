import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { adminCreatorPageStyles as styles } from './adminCreatorPage.styles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useUser } from '../../routes/UserContext'; 

const AdminCreatorPage: React.FC = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [power, setPower] = useState('Estandar'); 
    const [error, setError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const db = getFirestore();
    const { user } = useUser();

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
        if (user?.rol !== 'Alto') {
            setError('Usted no puede crear usuarios de tipo Administradores');
            return;
        }

        if (!validateInputs()) return;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            await setDoc(doc(db, "user", newUser.uid), {
                nombre: name,
                apellido: lastName,
                email: newUser.email,
                poder: power, 
                rol: 'admin',
                uid: newUser.uid,
            });

            await sendEmailVerification(newUser);
            setRegisterSuccess('Administrador creado exitosamente. Revisa tu correo para verificar tu cuenta.');

            alert('Administrador creado exitosamente.');
            setTimeout(() => navigate('/admin'), 5000);
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
                <h2 style={styles.title as React.CSSProperties}>Crear Usuario Administrador</h2>
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
                <select 
                    style={styles.select as React.CSSProperties} 
                    value={power} 
                    onChange={(e) => setPower(e.target.value)}
                >
                    <option value="Estandar">Estandar</option>
                    <option value="Alto">Alto</option>
                </select>
                <button 
                    style={styles.button as React.CSSProperties}
                    onClick={handleRegister}
                >
                    Registrar Administrador
                </button>
                {error && <p style={styles.errorText as React.CSSProperties}>{error}</p>}
                {registerSuccess && <p style={styles.successText as React.CSSProperties}>{registerSuccess}</p>}
            </div>
        </div>
    );
};

export default AdminCreatorPage;
