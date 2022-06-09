import classes from './notes-space.module.css'

import SingleBook from '../books/single-book-item'

export default function NotesSpace(props) {
  const books = JSON.parse(props.books)

  return (
    <section className={classes.container}>
      <ul>
        {books.map((book) => (
          <SingleBook key={book._id} id={book.bid} name={book.name} notes={book.notes.length} />
        ))}
      </ul>
    </section>
  )
}
