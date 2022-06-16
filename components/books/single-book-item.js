import Link from 'next/link'
import classes from './single-book-item.module.css'

export default function SingleBook(props) {
  const { title, notes, id, desc } = props
  const linkPath = `/notebooks/${id}`

  return (
    <Link href={linkPath}>
      <li className={classes.bookItem}>
        <h2>{title}</h2>
        <div>
          <p>{desc}</p>
          <p>{notes} notes</p>
        </div>
      </li>
    </Link>
  )
}
