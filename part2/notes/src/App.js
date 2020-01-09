import React, {useState, useEffect} from 'react';
import Note from './components/Note';
import Notification from './components/Notification';

import noteService from './services/notes';
const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2019</em>
        </div> 
    )
}
const App = (props) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('')
    const [showAll, setShowAll] = useState(true);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => {
                setNotes(initialNotes)
            })
    }, [])
    const notesToShow = showAll ? notes : notes.filter(note => note.important === true)

    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id);
        const changedNote = {...note, important: !note.important}
        noteService
            .update(id, changedNote)
            .then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setMessage(`Note '${note.content}' was already deleted from server`)
                setTimeout(() => {
                    setMessage(null)
                }, 5000);
                setNotes(notes.filter(n => n.id  !== id))
            })
      }
    const rows = () =>
        notesToShow.map((note, index) => <Note key={index} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />);

    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() > 0.5,
            id: notes.length + 1
        }
        noteService
            .create(noteObject)
            .then(returnedNote => {
                setNotes(notes.concat(returnedNote))
                setNewNote('')
            })
            .catch(error => {
                alert("Something happened, that shouldn't happen. So sorry")
            })
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }
    return (
        <div>
            <h1>Notes</h1>
            <Notification message={message} />
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
            <Footer />
        </div>
    )
}

export default App