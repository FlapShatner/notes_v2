import { getBook, getPaths } from '../../helpers/db'
import { Fragment } from 'react'
import BookContent from '../../components/books/book-content'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function Notebook(props) {
  const router = useRouter()
  const { book } = props
  const bookData = JSON.parse(book)
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/auth')
    },
  })
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <Fragment>
      <BookContent bookData={bookData} />
    </Fragment>
  )
}

export async function getStaticProps(ctx) {
  const data = await getBook(ctx.params.bid)
  const book = JSON.stringify(data)
  // console.log(book)

  return {
    props: {
      book: book,
    },
    revalidate: 10,
  }
}

export async function getStaticPaths() {
  const paths = await getPaths()

  return {
    paths: paths,
    fallback: 'blocking',
  }
}
