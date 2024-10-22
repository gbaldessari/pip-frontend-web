export const studentsPageStyles = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#1d1551',
    color: '#f4f4f4',
    width: '100%',
    minHeight: '100vh',
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
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '2rem',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: '#2d2369',
    color: '#f4f4f4',
  },
  tableBody: {
    textAlign: 'center',
  },
  tableCell: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.5rem',
    width: '100%',
    maxWidth: '400px',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    marginRight: '0.5rem',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    color: '#fff',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    borderRadius: '8px',
    border: 'none',
    padding: '1rem',
  },
  updateButton: {
    backgroundColor: '#ffc107',
    color: '#fff',
    padding: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
  },
  cancelButton: {
    backgroundColor: '#6c757d',
    color: '#fff',
    padding: '1rem',
    cursor: 'pointer',
    borderRadius: '4px',
    border: 'none',
    marginLeft: '1rem',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  filterInput: {
    marginRight: '1rem',
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    width: '200px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1d1551',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  modalActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};