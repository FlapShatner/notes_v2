import classes from './note-item.module.css'

export default function NoteItem(props) {
  const { noteTitle, content } = props

  return (
    <li className={classes.note}>
      <h3>{noteTitle}</h3>
      <p>{content}</p>
    </li>
  )
}
