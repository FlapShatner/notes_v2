import classes from './create-note-item.module.css'
import { useState } from 'react'

export default function CreateNoteItem(props) {
  const [formData, setFormData] = useState({})

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const bid = props.bid

  function passFormdata(e) {
    e.preventDefault()
    props.handleSubmit(formData)
  }

  return (
    <section className={classes.create}>
      <form onSubmit={passFormdata}>
        <div className={classes.control}>
          <input
            type='text'
            name='noteTitle'
            id='noteTitle'
            value={formData.noteTitle}
            onChange={onChange}
            placeholder='title'
          />
        </div>
        <div className={classes.control}>
          <input
            type='text'
            name='content'
            id='content'
            value={formData.content}
            onChange={onChange}
            placeholder='note'
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </section>
  )
}
