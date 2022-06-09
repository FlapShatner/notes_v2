import { MongoClient } from 'mongodb'

export async function connectDb() {
  const client = await MongoClient.connect(process.env.MONGO_URI)
  return client
}

export async function getUserBooks() {
  // search by userId

  const client = await connectDb()
  const db = client.db('nesting')

  const booksArr = await db.collection('notebooks').find().toArray()
  //   console.log(booksArr)

  return booksArr
}

export async function getBook(id) {
  const client = await connectDb()
  const db = client.db('nesting')

  const book = await db.collection('notebooks').findOne({ bid: id })
  //   console.log(id)
  return book
}

export async function getPaths() {
  const books = await getUserBooks()

  const pathsArr = []
  for (const _id in books) {
    pathsArr.push(_id)
  }
  return pathsArr.map((id) => ({ params: { bid: id } }))
}
