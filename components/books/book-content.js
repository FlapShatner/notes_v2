import classes from './book-content.module.css'
import NoteItem from '../notes/note-item'
import Link from 'next/link'

export default function BookContent(props) {
  const { bookData } = props
  const { name, notes } = bookData
  return (
    <section className={classes.notebook}>
      <header>
        <Link href='/'>
          <button>Back</button>
        </Link>
        <div>
          <h2>{name}</h2>
        </div>
      </header>
      <ul className={classes.notes}>
        {notes.map((note) => (
          <NoteItem title={note.title} content={note.content} key={note._id} />
        ))}
      </ul>
    </section>
  )
}
