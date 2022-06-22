import classes from './note-item.module.css'
import { useState } from 'react'
import Modal from '../modal/modal'
import DeleteConfirm from '../modal/delete-confirm'

export default function NoteItem(props) {
  const { noteTitle, content, bid, nid, _id } = props

  const [showModal, setShowModal] = useState(false)

  const noteIdent = {
    nid: nid,
    _id: _id,
    bid: bid,
  }
  function handleDelete() {
    props.deleteNote(noteIdent)
  }

  function openModal() {
    setShowModal(true)
  }

  function handleClick(e) {
    e.currentTarget.classList.toggle(classes.isActive)
  }

  return (
    <li onClick={handleClick} className={classes.note}>
      <div className={classes.head}>
        <h3>{noteTitle}</h3>
        <button onClick={openModal}>Delete</button>
      </div>

      <p>{content}</p>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <DeleteConfirm onDelete={handleDelete} onCancel={() => setShowModal(false)} />
      </Modal>
    </li>
  )
}
