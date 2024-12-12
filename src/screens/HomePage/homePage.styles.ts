import { CSSProperties } from 'react';

export const homePageStyles = {
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#f4f4f4',
        backgroundColor: '#1d1551',
        overflow: 'hidden',
        width: '100%',
        height: '100vh',
        position: 'relative',
        zIndex: 1,
    } as CSSProperties,
    header: {
        top: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        color: '#fff',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: '100%',
        height: '100vh',
        position: 'relative',
        zIndex: 2,
    } as CSSProperties,
    headerImage: {
        width: '200px',
        position: 'relative',
        zIndex: 2,
        marginBottom: '10px',
    } as CSSProperties,
    bodyImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '20px',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
    } as CSSProperties,
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        zIndex: 2,
        marginTop: '10px',
    } as CSSProperties,
    welcomeTitle: {
        color: '#fff',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '10px',
    } as CSSProperties,
    input: {
        width: '200px',
        padding: '0.75rem',
        margin: '0.5rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        backgroundColor: '#f0f0f0',
        color: '#333',
        transition: 'all 0.3s ease',
        ':focus': {
            borderColor: '#4273ff',
            boxShadow: '0 0 5px rgba(66, 115, 255, 0.5)',
        },
    } as CSSProperties,
    loginButton: {
        width: '120px',
        padding: '0.75rem',
        margin: '0.5rem',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#4273ff',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    } as CSSProperties,
    forgotPasswordButton: {
        marginTop: '1rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#003366', // Azul marino
        fontSize: '1.1rem', // Tamaño de fuente un poco más grande
        textDecoration: 'underline',
        cursor: 'pointer',
    } as CSSProperties,
    registerButton: {
        width: '120px',
        padding: '0.75rem',
        margin: '0.75rem',
        borderRadius: '20px',
        border: 'none',
        backgroundColor: '#FF9800',
        color: '#fff',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    } as CSSProperties,
    messageContainer: {
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '-10px',
    } as CSSProperties,
    errorMessage: {
        color: 'red',
        fontWeight: 'bold',
        border: '1px solid red',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#f8d7da',
        width: 'auto',
        textAlign: 'center',
    } as CSSProperties,
    successMessage: {
        color: 'green',
        fontWeight: 'bold',
        border: '1px solid green',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#d4edda',
        width: 'auto',
        textAlign: 'center',
    } as CSSProperties,
    passwordContainer: {
        position: 'relative',
        margin: '10px 0', // ajusta según sea necesario
    } as CSSProperties,
    
};
