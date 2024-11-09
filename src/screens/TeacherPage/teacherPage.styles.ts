export const teacherPageStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#f4f4f4',
    backgroundColor: '#1d1551',
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    top: '0',
    backgroundColor: '#1d1551',
    color: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    width: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImage: {
    width: '150px',
    position: 'relative',
    zIndex: 2,
    padding: '1rem',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: 1,
  },
  userInfo: {
    zIndex: 2,
    marginLeft: '2rem',
  },
  welcomeText: {
    fontSize: '1.8rem',
    color: '#fff',
  },
  headerButton: {
    backgroundColor: '#4273ff',
    fontSize: '1.5rem',
    color: '#fff',
    border: 'none',
    padding: '1rem 2rem',
    marginRight: '2rem',
    borderRadius: '5px',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#315bb7',
      transform: 'scale(1.05)',
    },
  },
  body: {
    padding: '10rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
  },
  subBody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    flexWrap: 'wrap',
  },
  bodyButton: {
    backgroundColor: '#427390',
    fontSize: '1.5rem',
    color: '#fff',
    padding: '2rem 5rem',
    margin: '1rem',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#315b73',
      transform: 'scale(1.05)',
    },
    '@media (max-width: 768px)': {
      padding: '1.5rem 3rem',
      fontSize: '1.2rem',
    },
  },
  logoutButton: {
    backgroundColor: '#ff4747',
    fontSize: '1rem',
    color: '#fff',
    border: 'none',
    padding: '1rem 0.5rem',
    margin: '5rem',
    borderRadius: '520px',
    cursor: 'pointer',
    zIndex: 2,
    transition: 'background-color 0.3s ease, transform 0.2s ease',
    '&:hover': {
      backgroundColor: '#cc3737',
      transform: 'scale(1.05)',
    },
  },
};
