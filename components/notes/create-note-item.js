import classes from './create-note-item.module.css'
import { useState } from 'react'

export default function CreateNoteItem() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    //submit note to api
  }

  return (
    <section className={classes.create}>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='title'
          />
        </div>
        <div className={classes.control}>
          <input
            type='text'
            name='content'
            id='content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='note'
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </section>
  )
}
