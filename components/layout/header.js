import classes from './header.module.css'
import Link from 'next/link'
import Logo from './logo'
import { signOut } from 'next-auth/react'

export default function Header() {
  function handleLogout() {
    signOut()
  }

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
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}
