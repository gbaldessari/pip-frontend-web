import React, { useState } from "react";
import { employeesPageStyles as styles } from './employeesPage.styles';

interface Employee {
  id: number;
  type: 'Profesor' | 'Administrativo';
  firstName: string;
  lastName: string;
  rut: string;
}

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: 1, type: 'Profesor', firstName: 'Carlos', lastName: 'López', rut: '12345678-9' },
    { id: 2, type: 'Administrativo', firstName: 'Ana', lastName: 'Pérez', rut: '98765432-1' },
  ]);

  const [filter, setFilter] = useState({ type: '', firstName: '', lastName: '', rut: '' });
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee>({
    id: Date.now(),
    type: 'Profesor',
    firstName: '',
    lastName: '',
    rut: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, { ...newEmployee, id: Date.now() }]);
    setModalOpen(false);
    setNewEmployee({ id: Date.now(), type: 'Profesor', firstName: '', lastName: '', rut: '' });
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setNewEmployee(employee);
    setModalOpen(true);
  };

  const handleUpdateEmployee = () => {
    setEmployees(employees.map(employee => (employee.id === newEmployee.id ? newEmployee : employee)));
    setModalOpen(false);
    setEditingEmployee(null);
    setNewEmployee({ id: Date.now(), type: 'Profesor', firstName: '', lastName: '', rut: '' });
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const filteredEmployees = employees.filter(employee =>
    (filter.type ? employee.type === filter.type : true) &&
    (filter.firstName ? employee.firstName.includes(filter.firstName) : true) &&
    (filter.lastName ? employee.lastName.includes(filter.lastName) : true) &&
    (filter.rut ? employee.rut.includes(filter.rut) : true)
  );

  return (
    <div style={styles.container as React.CSSProperties}>
      <header style={styles.header as React.CSSProperties}>
        <h1>Registro de Empleados</h1>
        <img src="https://firebasestorage.googleapis.com/v0/b/escuelapp-f167e.appspot.com/o/Bajos.png?alt=media" alt="Logo Colegio" style={styles.schoolImage} />
      </header>
      <div style={styles.body as React.CSSProperties}>
      <button style={styles.backButton} onClick={() => window.history.back()}>Volver al menú</button>
        <div style={styles.filterContainer as React.CSSProperties}>
          <select name="type" value={filter.type} onChange={handleFilterChange} style={styles.filterInput as React.CSSProperties}>
            <option value="">Tipo</option>
            <option value="Profesor">Profesor</option>
            <option value="Administrativo">Administrativo</option>
          </select>
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
          <button style={styles.addButton as React.CSSProperties} onClick={() => setModalOpen(true)}>
            Agregar Empleado
          </button>
        </div>

        <table style={styles.table as React.CSSProperties}>
          <thead style={styles.tableHead as React.CSSProperties}>
            <tr>
              <th>ID</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>RUT</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody style={styles.tableBody as React.CSSProperties}>
            {filteredEmployees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.type}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.rut}</td>
                <td>
                  <button style={styles.editButton as React.CSSProperties} onClick={() => handleEditEmployee(employee)}>Editar</button>
                  <button style={styles.deleteButton as React.CSSProperties} onClick={() => handleDeleteEmployee(employee.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {modalOpen && (
          <div style={styles.modalOverlay as React.CSSProperties}>
            <div style={styles.modalContent as React.CSSProperties}>
              <h2>{editingEmployee ? "Editar Empleado" : "Agregar Empleado"}</h2>
              <select
                name="type"
                value={newEmployee.type}
                onChange={handleInputChange}
                style={styles.input as React.CSSProperties}
              >
                <option value="Profesor">Profesor</option>
                <option value="Administrativo">Administrativo</option>
              </select>
              <input
                type="text"
                name="firstName"
                value={newEmployee.firstName}
                onChange={handleInputChange}
                placeholder="Nombre"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="lastName"
                value={newEmployee.lastName}
                onChange={handleInputChange}
                placeholder="Apellido"
                style={styles.input as React.CSSProperties}
              />
              <input
                type="text"
                name="rut"
                value={newEmployee.rut}
                onChange={handleInputChange}
                placeholder="RUT"
                style={styles.input as React.CSSProperties}
              />

              <div style={styles.modalActions as React.CSSProperties}>
                {editingEmployee ? (
                  <button style={styles.updateButton as React.CSSProperties} onClick={handleUpdateEmployee}>
                    Actualizar Empleado
                  </button>
                ) : (
                  <button style={styles.addButton as React.CSSProperties} onClick={handleAddEmployee}>
                    Agregar Empleado
                  </button>
                )}
                <button style={styles.cancelButton as React.CSSProperties} onClick={() => setModalOpen(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesPage;
