import React from 'react'

const Filter = (props) => {
    return (
        <form>
            <div>
            <label>Filter by name <input value={props.filter} onChange={props.onChange} /></label>
            </div>
        </form>
    )
}
export default Filter