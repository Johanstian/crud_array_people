import React from 'react'
import PropTypes from 'prop-types'

export const Person = ({ id, name, img, role }) => {
    return (
        <div className='col'>
            <div className="card m-4" style={{width: '18rem'}}>
                <img className="card-img-top" src={img} alt={name} />
                    <div className="card-body">
                        <h4 className="card-title">{name}</h4>
                        <p className="card-text">{role}</p>
                    </div>
                    <div className='container mb-4'>
                    <button className="btn btn-primary">Editar</button>
                    <button className="btn btn-danger ms-1">Borrar</button>
                    </div>
            </div>
        </div>
    )
}

Person.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    img: PropTypes.string,
    role: PropTypes.string,
}