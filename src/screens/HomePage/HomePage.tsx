import React from 'react';
import { homePageStyles as styles } from './homePage.styles';

const HomePage: React.FC = () => {
    return (
        <div style={styles.container as React.CSSProperties}>
            <header style={styles.header as React.CSSProperties}>
                <img src="src/assets/Bajos.png" style={styles.headerImage as React.CSSProperties} />

                <div style={styles.loginContainer as React.CSSProperties}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        style={styles.input as React.CSSProperties}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        style={styles.input as React.CSSProperties}
                    />
                    <button style={styles.loginButton as React.CSSProperties}>
                        Ingresar
                    </button>
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
