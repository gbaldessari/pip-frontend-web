export const homePageStyles = {
    container: {
        display: 'flex',
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
        alignItems: 'center', // Alinear verticalmente los elementos del header
        backgroundColor: '#1d1551',
        color: '#fff',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        width: '100%',
        position: 'relative',
    },
    headerImage: {
        width: '200px',
        position: 'absolute',
        bottom: '-100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
    },
    bodyImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '20px',
        position: 'relative',
        zIndex: 1,
    },
    // Contenedor de login en fila
    loginContainer: {
        display: 'flex',
        flexDirection: 'row', // Colocar los campos y el botón en fila
        justifyContent: 'flex-end', // Alineación a la derecha
        alignItems: 'center', // Alinear los campos verticalmente con el header
        marginLeft: 'auto', // Empuja el formulario hacia la derecha
        marginBottom: '2rem',
    },

    // Estilo para los campos de texto
    input: {
        width: '200px', // Tamaño ajustado para acomodar todo en fila
        padding: '0.75rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem', // Espacio entre los campos
        borderRadius: '4px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        backgroundColor: '#fff',
        color: '#1d1551',
    },

    // Estilo para el botón de login
    loginButton: {
        width: '100px',
        padding: '0.75rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem', // Empuja el botón hacia la derecha
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#fff',
        color: '#1d1551',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    },
};
