import classes from './note-item.module.css'

export default function NoteItem(props) {
  const { title, content } = props

  return (
    <li className={classes.note}>
      <h3>{title}</h3>
      <p>{content}</p>
    </li>
  )
}
