export const registerPageStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#1d1551', // Color de fondo igual al HomePage
    },
    formContainer: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
    eyeIcon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
        color: '#333',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#FF9800', // Botón similar al registro de HomePage
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        margin: '10px 0',
    },
    backButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#4273ff', // Botón azul para volver
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    errorText: {
        color: 'red',
        marginTop: '10px',
    },
    successText: {
        color: 'green',
        marginTop: '10px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
};
