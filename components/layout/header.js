import classes from './header.module.css'
import Link from 'next/link'
import Logo from './logo'

export default function Header() {
  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
