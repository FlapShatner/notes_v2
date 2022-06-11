import classes from './create-book.module.css'
import { useState } from 'react'

export default function CreateBook(props) {
  const [formData, setFormData] = useState({})
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const book = await response.json()

      console.log(book)
    } else {
      console.log(response)
    }
  }

  return (
    <section className={classes.create}>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' value={formData.title} onChange={onChange} />
        </div>
        <div className={classes.control}>
          <label htmlFor='desc'>Description</label>
          <input type='text' name='description' id='desc' value={formData.description} onChange={onChange} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </section>
  )
}
