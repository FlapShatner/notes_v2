import Link from 'next/link'
import classes from './single-book-item.module.css'

export default function SingleBook(props) {
  const { title, notes, id, desc } = props
  const linkPath = `/notebooks/${id}`

  function handleDelete(e) {
    e.stopPropagation()
    props.deleteBook(id)
  }

  return (
    <Link href={linkPath}>
      <li className={classes.bookItem}>
        <div>
          <h2>{title}</h2>
          <div className={classes.delete}>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>

        <div>
          <p>{desc}</p>
          <p>{notes} notes</p>
        </div>
      </li>
    </Link>
  )
}
