import React, { useState } from "react";
import { recoverPageStyles as styles } from "./recoverPage.styles";

const RecoverPage: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      setMessage("");
      return;
    }

    // Simulación de envío de token y nueva contraseña
    if (token && newPassword && confirmPassword) {
      // Aquí se debería realizar la lógica de validación del token y restablecimiento de contraseña en el backend
      setMessage("Tu contraseña ha sido restablecida exitosamente.");
      setError("");
    } else {
      setError("Por favor, completa todos los campos.");
      setMessage("");
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <form style={styles.form as React.CSSProperties} onSubmit={handleSubmit}>
        <label htmlFor="token" style={styles.label as React.CSSProperties}>
          Token de recuperación:
        </label>
        <input
          type="text"
          id="token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          style={styles.input as React.CSSProperties}
          placeholder="Ingresa el token de recuperación"
        />
        
        <label htmlFor="newPassword" style={styles.label as React.CSSProperties}>
          Nueva contraseña:
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input as React.CSSProperties}
          placeholder="Ingresa tu nueva contraseña"
        />

        <label htmlFor="confirmPassword" style={styles.label as React.CSSProperties}>
          Confirmar nueva contraseña:
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input as React.CSSProperties}
          placeholder="Confirma tu nueva contraseña"
        />

        {error && <p style={styles.errorText as React.CSSProperties}>{error}</p>}
        
        <button type="submit" style={styles.submitButton as React.CSSProperties}>
          Restablecer Contraseña
        </button>
      </form>

      {message && <p style={styles.successText as React.CSSProperties}>{message}</p>}
    </div>
  );
};

export default RecoverPage;
