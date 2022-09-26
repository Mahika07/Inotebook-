import React, { useContext } from 'react'
import notecontext from '../context/notes/NoteContext'



const Noteitem = (props) => {
    const context = useContext(notecontext)
    const { deleteNote } = context

    const { note, updateNote } = props;

    const handledelete = () => {
        props.showAlert("Noted deleted successfully", "primary")
        deleteNote(note._id)
    }
    return (
        <>
            <div className="card  my-2 mx-2 " style={{ width: '18rem' }}>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>

                    <p className="card-text">{note.description}</p>
                    <h6 class="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <div className='d-flex justify-content-between '>
                        <i className="fa-solid fa-trash" onClick={handledelete}></i>
                        <i className="fa-solid fa-pen " onClick={() => { updateNote(note) }}></i>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Noteitem
