import classes from './header.module.css'
import Link from 'next/link'
import Logo from './logo'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

export default function Header() {
  const { data: session, status } = useSession()

  const userName = session?.user?.name

  function handleLogout() {
    signOut()
  }

  return (
    <header className={classes.header}>
      <Link href='/'>
        <a>
          {userName && <p>{`${userName}'s`}</p>}
          <Logo />
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
          {session && (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
