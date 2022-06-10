import classes from './notes-space.module.css'
import CreateBook from '../books/create-book'
import SingleBook from '../books/single-book-item'

export default function NotesSpace(props) {
  const books = JSON.parse(props.books)

  return (
    <section className={classes.container}>
      <CreateBook />
      <ul>
        {books.map((book) => (
          <SingleBook key={book._id} id={book.bid} title={book.title} notes={book.notes.length} />
        ))}
      </ul>
    </section>
  )
}
