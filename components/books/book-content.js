import classes from './book-content.module.css'
import NoteItem from '../notes/note-item'
import CreateNoteItem from '../notes/create-note-item'
import { createNote, delNote } from '../../helpers/noteActions'

import Link from 'next/link'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function BookContent(props) {
  const { bookData } = props
  const { title, notes, bid } = bookData
  const [notesArray, setNotesArray] = useState(notes)

  async function submitData(formData) {
    const response = await createNote(formData, bid)
    if (response.ok) {
      setNotesArray([...notesArray, formData])

      const note = await response.json()
      console.log(note)
    } else {
      console.log(response)
    }
  }
  // call delete function in helpers/noteActions.js

  async function deleteNote(noteId) {
    const { nid } = noteId
    const response = await delNote(noteId)
    if (response.ok) {
      setNotesArray(notesArray.filter((note) => note.nid !== nid))
      console.log(`note ${nid} deleted`)
    } else {
      console.log('error deleting note')
    }
  }

  return (
    <section className={classes.notebook}>
      <Link href='/'>
        <button>Back</button>
      </Link>
      <div className={classes.outline}>
        <header>
          <div>
            <h2>{title}</h2>
          </div>
        </header>
        <CreateNoteItem bid={bid} handleSubmit={submitData} />

        <ul className={classes.notes}>
          {notesArray.map((note) => (
            <NoteItem
              bid={bid}
              deleteNote={deleteNote}
              noteTitle={note.noteTitle}
              content={note.content}
              _id={note._id}
              nid={note.nid}
              key={note._id || uuidv4()}
            />
          ))}
        </ul>
        <div className={classes.footer} />
      </div>
    </section>
  )
}
