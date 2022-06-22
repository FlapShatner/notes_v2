import classes from './create-note-item.module.css'
import { useState } from 'react'
import { BsChevronCompactUp } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'

export default function CreateNoteItem(props) {
  const [uid, setUid] = useState()
  const [formData, setFormData] = useState({
    noteTitle: '',
    content: '',
    nid: '',
  })
  const [isExpand, setIsExpand] = useState(false)

  const onChange = (e) => {
    setUid(Date.now())
    setFormData({ ...formData, [e.target.name]: e.target.value, nid: uid })
  }

  const bid = props.bid

  function passFormdata(e) {
    e.preventDefault()

    props.handleSubmit(formData)
    setFormData({
      noteTitle: '',
      content: '',
    })
  }

  function toggleExpand() {
    setIsExpand(!isExpand)
  }

  if (isExpand) {
    return (
      <section className={classes.create}>
        <form onSubmit={passFormdata}>
          <div className={classes.control}>
            <input
              autoComplete='off'
              type='text'
              name='noteTitle'
              id='noteTitle'
              value={formData.noteTitle}
              onChange={onChange}
              placeholder='title'
            />
          </div>
          <div className={classes.control}>
            <textarea
              autoComplete='off'
              rows='5'
              name='content'
              id='content'
              value={formData.content}
              onChange={onChange}
              placeholder='note'
            />
          </div>
          <button type='submit'>Create</button>
        </form>
        <button onClick={toggleExpand} className={classes.close}>
          <BsChevronCompactUp />
        </button>
      </section>
    )
  }

  return (
    <section className={classes.collapsed}>
      <button type='button' onClick={toggleExpand}>
        New note
      </button>
    </section>
  )
}
