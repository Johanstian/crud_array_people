import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Person } from './Person'

export const People = ({ people, setPeople }) => {

    const [editingId, setEditingId] = useState(null);
    const [editedPerson, setEditedPerson] = useState({
        name: '', role: '', img: ''
    });

    //Método para gestionar campos del form

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedPerson(prevState => ({
            ...prevState, [name]: value
        }))
    };

    const handleCreate = (e) => {
         e.preventDefault();
         //Agregar persona al array
         setPeople([ ...people, {id: people.lenght + 1, ...editedPerson}]);
         //Reiniciar el estado del form
         setEditedPerson({ name: '', role: '', img: '' })
    };

    return (
        <div>
            <h2 className='text-center my-4'>IT Team</h2>
            <div className='container'>
                <div className="row d-flex flex-wrap row-cols-1 row-cols-md-2 row-cols-lg-3">
                    {people.map((people) => {
                        return(
                            <div key={people.id}>
                                <Person id={people.id} name={people.name} img={people.img} role={people.role}/>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='container mt-4 row p-2'>
                <h2 className='text-center'>Crear nuevo colaborador</h2>
                <form action="">
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input className='form-control' type="text" name='name' defaultValue={editedPerson.name} required />
                    </div>
                </form>
            </div>
        </div>
    )
}

People.propTypes = {
    people: PropTypes.array,
    setPeople: PropTypes.func
}
