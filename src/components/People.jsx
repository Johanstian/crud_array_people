import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Person } from './Person'

export const People = ({ people, setPeople }) => {

    const [editingId, setEditingId] = useState(null);

    // Estado para establecer si se está editando a una persona

    const [isEditing, setIsEditing] = useState(false);

    const [editedPerson, setEditedPerson] = useState(
        {
            name: '',
            role: '',
            img: ''
        }
    );

    // Estado para eliminar
    const [personToDelete, setPersonToDelete] = useState(null);

    //Método para gestionar campos del form

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPerson(prevState => ({
            ...prevState,
            [name]: value || ''
        }));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        //Agregar persona al array
        setPeople([...people, { id: people.length + 1, ...editedPerson }]);
        //Reiniciar el estado del form
        setEditedPerson({ name: '', role: '', img: '' })
    };

    // Editar a un person

    const handleEdit = (id) => {
        setEditingId(id);
        setIsEditing(true);
        const personToEdit = people.find((person) => person.id === id);
        setEditedPerson({ ...personToEdit });
    }

    // Método para guardar los cambios después de editar a una persona

    const handleSave = (e) => {
        e.preventDefault();
        // Crear un array nuevo reemplazando los datos de la persona editada
        const updatePeople = people.map(person => person.id === editingId ? editedPerson : person)
        //Actualizar el person
        setPeople(updatePeople);
        setIsEditing(false);
        setEditingId(null);
        setEditedPerson({
            name: '',
            role: '',
            img: ''
        })
    }

    // Métodos para eliminar una persona del array
    // Método No. 1: guardar id de persona a eliminar
    const handleDelete = (id) => {
        setPersonToDelete(id);
    };

    // Método 2 confirmar
    const confirmDelete = () => {
        // Filtro en el array, eliminando a la person
        setPeople(people.filter(person => person.id !== personToDelete));
        setPersonToDelete(null);
    };

    //Cancelar eliminación
    const cancelDelete = () => {
        setPersonToDelete(null);
    }

    return (
        <div>
            <h2 className='text-center my-4'>IT Team</h2>
            <div className='container'>
                <div className="row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {people.map((people) => {
                        return (
                            <div key={people.id}>
                                <Person id={people.id} name={people.name} img={people.img} role={people.role}
                                    handleEdit={() => handleEdit(people.id)}
                                    handleDelete={handleDelete}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='container'>
                <h2 className='text-center mt-4'>{isEditing ? 'Actualizar colaborador' : 'Crear nuevo colaborador'}</h2>
                <form>
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input className='form-control' type="text" name='name' value={editedPerson.name} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="role">Rol</label>
                        <input className='form-control' type="text" name='role' value={editedPerson.role} onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="img">Avatar</label>
                        <input className='form-control' type="text" name='img' value={editedPerson.img} onChange={handleChange} required />
                    </div>
                    <div className='mt-2 text-center'>
                        <button type='submit' className='btn btn-primary' onClick={isEditing ? handleSave : handleCreate}>{isEditing ? 'Modificar' : 'Crear'}</button>
                    </div>
                </form>
            </div>

            <div id="deleteModal" className='modal fade' tabIndex="-1">
                <div className='modal-dialog'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>Confirmar eliminación</h4>
                            <button className='btn-close' type='button' data-bs-dismiss="modal" onClick={cancelDelete}></button>
                        </div>

                        <div className='modal-body'>
                            <p>¿Estás seguro de eliminar a {people.find(person => person.id === personToDelete)?.name} ?</p>
                        </div>

                        <div className='modal-footer'>
                            <button className='btn btn-secondary' type='button' data-bs-dismiss="modal" onClick={cancelDelete}>Cancelar</button>
                            <button className='btn btn-danger' type='button' data-bs-dismiss="modal" onClick={confirmDelete}>Eliminar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

People.propTypes = {
    people: PropTypes.array,
    setPeople: PropTypes.func
}
