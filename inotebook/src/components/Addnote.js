import React, { useContext, useState } from 'react'
import notecontext from '../context/notes/NoteContext'
const Addnote = (props) => {
    const context = useContext(notecontext)
    const { addNote } = context

    const [notes, setnote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();//taki page load na ho
        props.showAlert("Note Added", "dark")
        addNote(notes.title, notes.description, notes.tag)
        setnote({ title: "", description: "", tag: "" })
    }

    const onchange = (e) => {
        setnote({ ...notes, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={notes.title} aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={notes.description} onChange={onchange} minLength={5} required />
                </div>

                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={notes.tag} onChange={onchange} />
                </div>
                <button disabled={notes.title.length < 5 || notes.description.length < 5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
