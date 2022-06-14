import { useState, useRef, useEffect } from 'react'
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

  const modalContent = show && (
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <header>
          <a href='#' onClick={handleClick}>
            close
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
