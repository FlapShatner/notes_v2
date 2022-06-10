import classes from './create-book.module.css'
import { useState } from 'react'

export default function CreateBook() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const book = await response.json()
      console.log(book)
    } else {
      console.log('error')
    }
  }

  return (
    <section className={classes.create}>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={classes.control}>
          <label htmlFor='desc'>Description</label>
          <input
            type='text'
            name='desc'
            id='desc'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </section>
  )
}
