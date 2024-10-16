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
    },
    header: {
        top: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1d1551',
        color: '#fff',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: '100%',
        position: 'relative',
    },
    headerImage: {
        width: '200px',
        position: 'absolute',
        bottom: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
    },
    bodyImage: {
        width: '100%',
        height: '100vh',
        objectFit: 'cover',
        borderRadius: '20px',
        position: 'relative',
        zIndex: 1,
    },
    loginContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
        zIndex: 2,
    },
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
    },
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
    },
    forgotPasswordButton: {
        marginTop: '1rem',
        backgroundColor: 'transparent',
        border: 'none',
        color: '#4273ff',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};
