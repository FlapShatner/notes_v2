import classes from './notes-space.module.css'
import CreateBook from '../books/create-book'
import SingleBook from '../books/single-book-item'
import { useState } from 'react'

export default function NotesSpace(props) {
  const books = JSON.parse(props.books)
  const [booksArray, setBooksArray] = useState(books)

  return (
    <section className={classes.container}>
      <CreateBook />
      <ul>
        {booksArray.map((book) => (
          <SingleBook key={book._id} id={book.bid} title={book.title} notes={book.notes.length} />
        ))}
      </ul>
    </section>
  )
}
