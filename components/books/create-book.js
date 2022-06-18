import classes from './create-book.module.css'
import { useState } from 'react'

export default function CreateBook(props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  })
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    props.handleSubmit(formData)
    setFormData({
      title: '',
      description: '',
    })
  }

  return (
    <section className={classes.create}>
      <form onSubmit={handleSubmit}>
        <div className={classes.control}>
          <label htmlFor='title'>Title</label>
          <input type='text' name='title' id='title' value={formData.title} onChange={onChange} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <input type='text' name='description' id='description' value={formData.description} onChange={onChange} />
        </div>
        <button type='submit'>Create</button>
      </form>
    </section>
  )
}
