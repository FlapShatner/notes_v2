import { useState, useRef, useEffect } from 'react'
import { MdClose } from 'react-icons/md'
import ReactDOM from 'react-dom'
import classes from './modal.module.css'

export default function Modal({ show, onClose, children, title }) {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  function handleClick(e) {
    e.preventDefault()
    onClose()
  }

  function handleOutsideClick(e) {
    e.stopPropagation()
    onClose()
  }

  function handleModalClick(e) {
    e.stopPropagation()
  }

  const modalContent = show && (
    <div onClick={handleOutsideClick} className={classes.overlay}>
      <div onClick={handleModalClick} className={classes.modal}>
        <header>
          <a href='#' onClick={handleClick}>
            <MdClose />
          </a>
        </header>
        {title && <h2>{title}</h2>}
        <div>{children}</div>
      </div>
    </div>
  )

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root'))
  } else {
    return null
  }
}
