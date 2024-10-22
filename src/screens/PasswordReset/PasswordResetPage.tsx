import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase-config';
import { passwordResetStyles as styles } from './passwordReset.styles';

const PasswordResetPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handlePasswordReset = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('El correo electrónico no tiene un formato válido');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage('Revisa tu correo para restablecer tu nueva contraseña');
            setTimeout(() => {
                navigate('/'); // Regresar a la HomePage después de 3 segundos
            }, 3000);
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                setError('No existe un usuario con ese correo');
            } else {
                setError('Error al enviar el correo de restablecimiento: ' + err.message);
            }
        }
    };

    return (
        <div style={styles.container as React.CSSProperties}>
            <header style={styles.header as React.CSSProperties}>
                <img src="src/assets/Bajos.png" style={styles.headerImage as React.CSSProperties} />
                <div style={styles.resetContainer as React.CSSProperties}>
                    <h2 style={{ color: '#fff' }}>Recuperar contraseña</h2>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        style={styles.input as React.CSSProperties}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        style={styles.resetButton as React.CSSProperties}
                        onClick={handlePasswordReset}
                    >
                        Enviar correo de recuperación
                    </button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    <button
                        style={styles.backButton as React.CSSProperties}
                        onClick={() => navigate('/')}
                    >
                        Volver al login
                    </button>
                </div>
            </header>
            
        </div>
    );
};

export default PasswordResetPage;
