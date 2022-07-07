import classes from './404.module.css'
import { BsChevronLeft } from 'react-icons/bs'

export default function Custom404() {
  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <h1>404 :(</h1>
        <section>
          <h2>Page not found</h2>
          <button>Go Back</button>
        </section>
      </div>
    </div>
  )
}
