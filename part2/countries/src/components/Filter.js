import React from 'react';

const Filter = (props) => {
    return (
        <form>
            <label>find countries <input value={props.filter} onChange={props.onChange} /></label>
        </form>
    )
}

export default Filter