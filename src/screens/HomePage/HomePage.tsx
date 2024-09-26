import React from 'react';
import { homePageStyles } from './homePage.styles';

const HomePage: React.FC = () => {
    return (
        <div style={homePageStyles.container as React.CSSProperties}>
            <header style={homePageStyles.header as React.CSSProperties}>
                <img src="src/assets/Bajos.png" style={homePageStyles.headerImage as React.CSSProperties} />

                <div style={homePageStyles.loginContainer as React.CSSProperties}>
                    <input
                        type="text"
                        placeholder="Usuario"
                        style={homePageStyles.input as React.CSSProperties}
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        style={homePageStyles.input as React.CSSProperties}
                    />
                    <button style={homePageStyles.loginButton as React.CSSProperties}>
                        Ingresar
                    </button>
                </div>
            </header>
            <img
                src="src/assets/Cerro_Grande_La_Serena.jpg"
                style={homePageStyles.bodyImage as React.CSSProperties}
            />
        </div>
    );
};

export default HomePage;
