import { CSSProperties } from "react";

export const employeesPageStyles = {
  container: {
    backgroundColor: "#1d1551", // Color de fondo azul más oscuro
    padding: "20px",
    borderRadius: "8px",
    minHeight: "100vh", // Para ocupar toda la altura de la pantalla
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Centrar horizontalmente
  } as CSSProperties,
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
    width: "100%", // Para ocupar el ancho completo
    padding: "0 20px", // Espacio lateral
  } as CSSProperties,
  schoolImage: {
    borderRadius: "50%",
    width: "100px",
    height: "100px",
  } as CSSProperties,
  body: {
    display: "flex",
    flexDirection: "column",
    width: "100%", // Para que el cuerpo ocupe todo el ancho
    padding: "0 20px", // Espacio lateral
  } as CSSProperties,
  backButton: {
    backgroundColor: "#ffc107", // Color amarillo para el botón de volver
    color: "#000",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
    alignSelf: "flex-start", // Alinear a la izquierda
  } as CSSProperties,
  filterContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
    width: "100%", // Para que ocupe todo el ancho
  } as CSSProperties,
  filterInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: "1 1 200px",
  } as CSSProperties,
  addButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  } as CSSProperties,
  table: {
    width: "100%",
    borderCollapse: "collapse",
  } as CSSProperties,
  tableHead: {
    backgroundColor: "#0056b3", // Color azul más oscuro para el encabezado
    color: "#fff",
    fontWeight: "bold",
  } as CSSProperties,
  saveButton: {
    backgroundColor: '#4CAF50', // Verde
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
  
  closeButton: {
    backgroundColor: '#f44336', // Rojo
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: '#e53935',
    },
  },
  tableBody: {
    backgroundColor: "#333333", // Color gris para el cuerpo de la tabla
    color: "#fff", // Letras blancas
  } as CSSProperties,
  editButton: {
    backgroundColor: "#ffc107",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    marginRight: "5px",
  } as CSSProperties,
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
  } as CSSProperties,
  modalOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties,
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "400px",
  } as CSSProperties,
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "100%",
    marginBottom: "10px",
  } as CSSProperties,
  modalActions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  } as CSSProperties,
  updateButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  } as CSSProperties,
  cancelButton: {
    backgroundColor: "#6c757d",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  } as CSSProperties,
  modalContent: {
    backgroundColor: '#1d1551',
    padding: '2rem',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    color: '#f4f4f4',
  } as CSSProperties,
  // Estilos para el botón de título "Registro de estudiantes"
  titleButton: {
    backgroundColor: "#87CEEB", // Celeste
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
    margin: "20px 0",
    fontSize: "1.2em",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Sombra para efecto de profundidad
  } as CSSProperties,
  titleButtonHover: {
    transform: "scale(1.05)", // Efecto de hover
  },
};