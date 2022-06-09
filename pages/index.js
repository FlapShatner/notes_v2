import Head from 'next/head'
import { Fragment } from 'react'
import NotesSpace from '../components/home/notes-space'
import { getUserBooks } from '../helpers/db'

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

export async function getStaticProps() {
  const userId = 123456
  const objBooks = await getUserBooks()
  const userBooks = JSON.stringify(objBooks)

  return {
    props: {
      userBooks: userBooks,
    },
    revalidate: 10,
  }
}
