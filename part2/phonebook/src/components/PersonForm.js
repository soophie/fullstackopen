import React from 'react'

const PersonForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
        <div>
          <label>name: <input value={props.name} onChange={props.onNameChange} /></label>
        </div>
        <div>
          <label>number: <input value={props.number} onChange={props.onNumberChange} /></label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm