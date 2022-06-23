import { useState } from 'react'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { connectDb } from '../../helpers/db'
import classes from './profile.module.css'

export default function Profile(props) {
  const [isEdit, setIsEdit] = useState(false)

  const { userName, userEmail } = props
  const [displayName, setDisplayName] = useState(userName)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  //send form data to api
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/auth/update', {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      setDisplayName(formData.name)

      setIsEdit(false)
    }
    const res = await response.json()
    console.log(res)
  }

  function toggleEdit(e) {
    e.preventDefault()
    setIsEdit((prev) => !prev)
  }

  return (
    <section className={classes.profile}>
      <div className={classes.buttonDiv}>
        <Link href='/'>
          <button className={classes.back}>Back</button>
        </Link>
      </div>
      <div className={classes.card}>
        <h2>Your Info</h2>
        <form onSubmit={handleSubmit}>
          <div>
            {isEdit ? (
              <>
                <input
                  id='name'
                  placeholder='What should we call you?'
                  value={formData.name}
                  name='name'
                  onChange={handleChange}></input>
              </>
            ) : (
              <p>{displayName || 'Edit to set your name'}</p>
            )}
          </div>
          <div>
            <p>{userEmail}</p>
          </div>

          {isEdit ? (
            <>
              <button className={classes.left} type='submit'>
                Submit
              </button>
              <button className={classes.right} type='button' onClick={() => setIsEdit(false)}>
                Cancel
              </button>
            </>
          ) : (
            <button className={classes.edit} type='button' onClick={toggleEdit}>
              Edit
            </button>
          )}
        </form>
      </div>
    </section>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  //   console.log(session)

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }

  const sessionEmail = session.user.email

  const client = await connectDb()
  const db = client.db()
  const profile = await db.collection('users').findOne({ email: sessionEmail })
  //   console.log(profile)
  const userEmail = profile.email
  const userName = profile.name

  return {
    props: {
      userEmail: userEmail,
      userName: userName || null,
    },
  }
}
