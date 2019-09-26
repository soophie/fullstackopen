import React from 'react'
import Header from './Header'
import Part from './Part'
import Total from './Total'

const Course = ({course}) => {
    const courses = () =>
        course.parts.map((part, i) => <Part key={i} part={part.name} exercises={part.exercises} />)
    


    return (
        <>
            <Header course={course.name} />
            {courses()}
            {<Total parts={course.parts} />}
        </>
    )
}

export default Course