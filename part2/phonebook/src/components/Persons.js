import React from 'react'

const Persons = ({persons, removePerson}) => {

    return (
        <>
            {persons.map((person, index) => <p key={index}>{person.name} {person.number} <button onClick={() => removePerson(person)} value={index}>delete</button></p>)}
        </>
    )
}

export default Persons