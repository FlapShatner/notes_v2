import classes from './notes-space.module.css'
import CreateBook from '../books/create-book'
import SingleBook from '../books/single-book-item'
import { useState } from 'react'

export default function NotesSpace(props) {
  const books = JSON.parse(props.books)
  const [booksArray, setBooksArray] = useState(books)

  async function handleSubmit(formData) {
    const response = await fetch('/api/books', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const book = await response.json()
      setBooksArray([...booksArray, book])
      console.log(book)
    } else {
      console.log(response)
    }
  }

  return (
    <section className={classes.container}>
      <CreateBook handleSubmit={handleSubmit} />
      <ul>
        {booksArray.map((book) => (
          <SingleBook
            key={book._id}
            desc={book.description}
            id={book.bid}
            title={book.title}
            notes={book.notes.length}
          />
        ))}
      </ul>
    </section>
  )
}
