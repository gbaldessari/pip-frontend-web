import React, { useState } from "react";
import { complaintsPageStyles as styles } from './complaintsPage.styles';

interface Complaint {
  id: number;
  type: string;
  message: string;
  status: string;
}

const ComplaintsPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, type: "Reclamo", message: "No me llegó el certificado de notas.", status: "Sin respuesta" },
    { id: 2, type: "Sugerencia", message: "Sería bueno tener más horarios de atención.", status: "Respondido" },
  ]);

  const [message, setMessage] = useState("");
  const [type, setType] = useState("Reclamo");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newComplaint: Complaint = {
      id: complaints.length + 1,
      type,
      message,
      status: "Sin respuesta",
    };
    setComplaints([...complaints, newComplaint]);
    setMessage("");
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Reclamos y Sugerencias</h1>
      </header>
      <div style={styles.formContainer}>
        <h2 style={styles.subtitle}>Enviar Reclamo o Sugerencia</h2>
        <form onSubmit={handleSubmit} style={styles.form as React.CSSProperties}>
          <label style={styles.label}>Tipo:</label>
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            style={styles.select}
          >
            <option value="Reclamo">Reclamo</option>
            <option value="Sugerencia">Sugerencia</option>
          </select>

          <label style={styles.label}>Mensaje:</label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            style={styles.textArea}
            required
          />

          <button type="submit" style={styles.button}>Enviar</button>
        </form>
      </div>

      <div style={styles.complaintsContainer}>
        <h2 style={styles.subtitle}>Reclamos y Sugerencias Anteriores</h2>
        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableCell}>Tipo</th>
              <th style={styles.tableCell}>Mensaje</th>
              <th style={styles.tableCell}>Estado</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {complaints.map((complaint) => (
              <tr key={complaint.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{complaint.type}</td>
                <td style={styles.tableCell}>{complaint.message}</td>
                <td style={styles.tableCell}>{complaint.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComplaintsPage;
