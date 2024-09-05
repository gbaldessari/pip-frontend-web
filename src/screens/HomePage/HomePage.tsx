import React from 'react';
import { homePageStyles } from './HomePage.styles';

const HomePage: React.FC = () => {
    return (
        <div style={homePageStyles.container}>
            <header style={homePageStyles.header}>
                <h1 style={homePageStyles.headerTitle}>Bajos del Cerro Chico</h1>
                <p style={homePageStyles.headerSubtitle}>
                  Accede a documentos, notas, reportes y más.
                </p>
            </header>
        </div>
    );
};

export default HomePage;
