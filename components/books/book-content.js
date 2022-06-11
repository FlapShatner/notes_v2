import classes from './book-content.module.css'
import NoteItem from '../notes/note-item'
import CreateNoteItem from '../notes/create-note-item'
import Link from 'next/link'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

export default function BookContent(props) {
  const { bookData } = props
  const { title, notes, bid } = bookData
  const [notesArray, setNotesArray] = useState(notes)

  async function submitData(formData) {
    const { noteTitle, content } = formData
    //submit note to api
    const response = await fetch('http://localhost:3000/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        noteTitle: noteTitle,
        content: content,
        bid: bid,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      setNotesArray([...notesArray, formData])

      const note = await response.json()
      console.log(note)
    } else {
      console.log(response)
    }
  }

  return (
    <section className={classes.notebook}>
      <header>
        <Link href='/'>
          <button>Back</button>
        </Link>
        <div>
          <h2>{title}</h2>
        </div>
      </header>
      <CreateNoteItem bid={bid} handleSubmit={submitData} />

      <ul className={classes.notes}>
        {notesArray.map((note) => (
          <NoteItem noteTitle={note.noteTitle} content={note.content} key={note._id || uuidv4()} />
        ))}
      </ul>
    </section>
  )
}
