import React, { useState } from "react";
import { guardiansPageStyles as styles } from './guardiansPage.styles';

interface Guardian {
  id: number;
  firstName: string;
  lastName: string;
  rut: string;
  students: number[];
}

const GuardiansPage: React.FC = () => {
  const [guardians, setGuardians] = useState<Guardian[]>([
    { id: 1, firstName: "María", lastName: "Pérez", rut: "12345678-9", students: [1, 2] },
    { id: 2, firstName: "José", lastName: "Gómez", rut: "98765432-1", students: [3] },
  ]);

  const [filter, setFilter] = useState({ firstName: '', lastName: '', rut: '' });
  const [editingGuardian, setEditingGuardian] = useState<Guardian | null>(null);
  const [newGuardian, setNewGuardian] = useState<Guardian>({
    id: Date.now(),
    firstName: '',
    lastName: '',
    rut: '',
    students: [],
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGuardian({ ...newGuardian, [name]: value });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setEditingGuardian(null);
    setNewGuardian({ id: Date.now(), firstName: '', lastName: '', rut: '', students: [] });
  };

  const handleAddGuardian = () => {
    setGuardians([...guardians, { ...newGuardian, id: Date.now() }]);
    closeModal();
  };

  const handleEditGuardian = (guardian: Guardian) => {
    setEditingGuardian(guardian);
    setNewGuardian(guardian);
    openModal();
  };

  const handleUpdateGuardian = () => {
    setGuardians(guardians.map(guardian => (guardian.id === newGuardian.id ? newGuardian : guardian)));
    closeModal();
  };

  const handleDeleteGuardian = (id: number) => {
    setGuardians(guardians.filter(guardian => guardian.id !== id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredGuardians = guardians.filter(guardian =>
    (filter.firstName ? guardian.firstName.includes(filter.firstName) : true) &&
    (filter.lastName ? guardian.lastName.includes(filter.lastName) : true) &&
    (filter.rut ? guardian.rut.includes(filter.rut) : true)
  );

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Gestión de Apoderados</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media" alt="Logo Colegio" style={styles.schoolImage} />
      </header>
      <div style={styles.body as React.CSSProperties}>
      <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>
        <div style={styles.filterContainer as React.CSSProperties}>
          <input
            type="text"
            name="firstName"
            value={filter.firstName}
            onChange={handleFilterChange}
            placeholder="Nombre"
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="lastName"
            value={filter.lastName}
            onChange={handleFilterChange}
            placeholder="Apellido"
            style={styles.filterInput as React.CSSProperties}
          />
          <input
            type="text"
            name="rut"
            value={filter.rut}
            onChange={handleFilterChange}
            placeholder="RUT"
            style={styles.filterInput as React.CSSProperties}
          />
          <button style={styles.addButton} onClick={openModal}>Agregar Apoderado</button>
        </div>

        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>RUT</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {filteredGuardians.map((guardian) => (
              <tr key={guardian.id}>
                <td>{guardian.id}</td>
                <td>{guardian.firstName}</td>
                <td>{guardian.lastName}</td>
                <td>{guardian.rut}</td>
                <td>
                  <button style={styles.editButton} onClick={() => handleEditGuardian(guardian)}>Editar</button>
                  <button style={styles.deleteButton} onClick={() => handleDeleteGuardian(guardian.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalIsOpen && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modalContent as React.CSSProperties}>
              <h2>{editingGuardian ? "Editar Apoderado" : "Agregar Apoderado"}</h2>
              <input
                type="text"
                name="firstName"
                value={newGuardian.firstName}
                onChange={handleInputChange}
                placeholder="Nombre"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="lastName"
                value={newGuardian.lastName}
                onChange={handleInputChange}
                placeholder="Apellido"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="rut"
                value={newGuardian.rut}
                onChange={handleInputChange}
                placeholder="RUT"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="students"
                value={newGuardian.students.join(', ')}
                onChange={(e) => setNewGuardian({ ...newGuardian, students: e.target.value.split(',').map(Number) })}
                placeholder="IDs de Estudiantes (separados por comas)"
                style={styles.input as React.CSSProperties}
              />
              <div style={styles.modalActions as React.CSSProperties}>
                {editingGuardian ? (
                  <button style={styles.updateButton} onClick={handleUpdateGuardian}>Actualizar Apoderado</button>
                ) : (
                  <button style={styles.addButton} onClick={handleAddGuardian}>Agregar Apoderado</button>
                )}
                <button style={styles.cancelButton} onClick={closeModal}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardiansPage;
