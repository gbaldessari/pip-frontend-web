export const adminCreatorPageStyles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#003366', // Color azul oscuro
        padding: '20px', // Espaciado en el contenedor
        overflowY: 'auto', // Permite scroll si es necesario
    },
    formContainer: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        textAlign: 'center',
        color: '#333',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    select: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    errorText: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center',
    },
    successText: {
        color: 'green',
        marginTop: '10px',
        textAlign: 'center',
    },
    backButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#6c757d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    },
    eyeIcon: {
        position: 'absolute',
        right: '10px',
        top: '50%',
        transform: 'translateY(-50%)',
        cursor: 'pointer',
    },
    passwordContainer: {
        position: 'relative',
        width: '100%',
    },
};
