import Link from 'next/link'
import classes from './single-book-item.module.css'
import { useState } from 'react'
import Modal from '../modal/modal'
import DeleteConfirm from '../modal/delete-confirm'

export default function SingleBook(props) {
  const { title, notes, id, desc } = props
  const linkPath = `/notebooks/${id}`
  const [showModal, setShowModal] = useState(false)

  function handleDelete(e) {
    e.stopPropagation()
    props.deleteBook(id)
  }

  function openModal(e) {
    e.stopPropagation()
    setShowModal(true)
  }

  function handleCancel(e) {
    e.stopPropagation()
    setShowModal(false)
  }

  return (
    <Link href={linkPath}>
      <li className={classes.bookItem}>
        <div>
          <h2>{title}</h2>
          <div className={classes.delete}>
            <button onClick={openModal}>Delete</button>
          </div>
        </div>

        <div>
          <p>{desc}</p>
          <p>{notes} notes</p>
        </div>
        <Modal onClose={() => setShowModal(false)} show={showModal}>
          <DeleteConfirm onCancel={handleCancel} onDelete={handleDelete} />
        </Modal>
      </li>
    </Link>
  )
}
