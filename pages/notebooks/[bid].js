import { getBook, getPaths } from '../../helpers/db'

import BookContent from '../../components/books/book-content'

export default function Notebook(props) {
  const { book } = props
  const bookData = JSON.parse(book)

  return <BookContent bookData={bookData} />
}

export async function getStaticProps(ctx) {
  const data = await getBook(ctx.params.bid)
  const book = JSON.stringify(data)
  //   console.log(book)

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
