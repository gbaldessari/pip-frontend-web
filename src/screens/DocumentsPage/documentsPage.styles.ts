export const documentsPageStyles = {
  container: {
    top: '0',
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#f4f4f4',
    backgroundColor: '#1d1551',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  header: {
    top: '0',
    backgroundColor: '#427390',
    color: '#fff',
    padding: '2.5rem 2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
    marginBottom: '2rem',
  },
  description: {
    fontSize: '1.4rem',
    marginBottom: '2rem',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  documentList: {
    justifyContent: 'center',
    alignItems: 'center',
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  documentItem: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#2a1d6a',
    borderRadius: '5px',
    color: '#fff',
    width: '80%',
    margin: '0 auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  documentName: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
  },
  downloadButton: {
    backgroundColor: '#4273ff',
    color: '#fff',
    textDecoration: 'none',
    padding: '1rem 2rem',
    borderRadius: '5px',
    fontSize: '1.2rem',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  downloadButtonHover: {
    backgroundColor: '#365bbf',
  },
  generateButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    padding: '1rem 2rem',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    marginTop: '2rem',
    display: 'block',
    textAlign: 'center',
    border: 'none',
    transition: 'background-color 0.3s ease',
  },
  generateButtonHover: {
    backgroundColor: '#218838',
  },
  select: {
    padding: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
    marginBottom: '2rem',
    fontSize: '1rem',
  },
};
