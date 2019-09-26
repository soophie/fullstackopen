import React from 'react'

const Persons = ({persons}) => {
    return (
        <>
            {persons.map((person, index) => <p key={index}>{person.name} {person.number}</p>)}
        </>
    )
}

export default Persons