import Link from 'next/link'
import classes from './single-book-item.module.css'

export default function SingleBook(props) {
  const { name, notes, id } = props
  const linkPath = `/notebooks/${id}`

  return (
    <Link href={linkPath}>
      <li className={classes.bookItem}>
        <h2>{name}</h2>
        <p>{notes} notes</p>
      </li>
    </Link>
  )
}
