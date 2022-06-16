import Head from 'next/head'
import { Fragment } from 'react'
import NotesSpace from '../components/home/notes-space'
import { getUserBooks } from '../helpers/db'
import { getSession, useSession } from 'next-auth/react'

export default function Home(props) {
  const { userBooks } = props

  return (
    <Fragment>
      <Head>
        <title>Note Books</title>
        <meta name='description' content='An app for taking and organizing notes' />
      </Head>
      <NotesSpace books={userBooks} />
    </Fragment>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    }
  }
  const userId = session.user.email
  // console.log(session.user)

  const objBooks = await getUserBooks(userId)
  const userBooks = JSON.stringify(objBooks)

  return {
    props: {
      userBooks: userBooks,
    },
  }
}
