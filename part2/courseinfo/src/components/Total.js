import React from 'react'

const Total = ({parts}) => {
    const exercisesSum = parts
        .map(part => part.exercises)
        .reduce((acc, curr) => acc + curr);

    return (
        <p><strong>Number of exercises {exercisesSum}</strong></p>
    )
}
export default Total