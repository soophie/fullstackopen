import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Note from './components/Note';

const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true);

    useEffect(() => {
        axios
            .get('http://localhost:1337/notes')
            .then(response => {
                setNotes(response.data)
            })
    }, [])
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)
    const rows = () =>
        notesToShow.map((note, index) => <Note key={index} note={note} />);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        }

        setNotes(notes.concat(noteObject));
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    return (
        <div>
            <h1>Notes</h1>
            <button onClick={() => setShowAll(!showAll)}>
                show {showAll ? 'important': 'all'}
            </button>
            <ul>
                {rows()}
            </ul>
            <form onSubmit={addNote}>
                <input 
                    value={newNote}
                    onChange={handleNoteChange} />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App