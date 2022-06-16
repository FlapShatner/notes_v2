import { useState } from 'react'
import { getSession } from 'next-auth/react'
import { connectDb } from '../helpers/db'

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
    <section>
      <h2>Your Info</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {isEdit ? (
            <>
              <label htmlFor='name'>Name:</label>
              <input id='name' placeholder={userName} value={formData.name} name='name' onChange={handleChange}></input>
            </>
          ) : (
            <p>{displayName || 'Edit to set your name'}</p>
          )}
        </div>
        <div>
          {isEdit ? (
            <>
              <label htmlFor='email'>Email:</label>

              {/* get email from props */}
              <input
                id='email'
                placeholder={userEmail}
                value={formData.email}
                name='email'
                onChange={handleChange}></input>
            </>
          ) : (
            <p>{userEmail}</p>
          )}
        </div>
        {isEdit ? (
          <button type='submit'>Submit</button>
        ) : (
          <button type='button' onClick={toggleEdit}>
            Edit
          </button>
        )}
        <button type='button' onClick={() => setIsEdit(false)}>
          Cancel
        </button>
      </form>
    </section>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  console.log(session)

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
