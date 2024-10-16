import React, { useState } from "react";
import { forgottenPageStyles as styles } from "./forgottenPage.styles";

const ForgottenPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setError("");
    } else {
      setError("Por favor, ingresa un correo electrónico válido.");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <form style={styles.form as React.CSSProperties} onSubmit={handleSubmit}>
        <label htmlFor="email" style={styles.label as React.CSSProperties}>
          Ingresa tu correo electrónico:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleInputChange}
          style={styles.input as React.CSSProperties}
          placeholder="Correo electrónico"
        />
        {error && <p style={styles.errorText as React.CSSProperties}>{error}</p>}
        <button type="submit" style={styles.submitButton as React.CSSProperties}>
          Recuperar Contraseña
        </button>
      </form>
    </div>
  );
};

export default ForgottenPage;
