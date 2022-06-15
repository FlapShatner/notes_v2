import { MongoClient } from 'mongodb'

export async function connectDb() {
  const client = await MongoClient.connect(process.env.MONGODB_URI)
  return client
}

export async function getUserBooks(userId) {
  // search by userId
  // console.log(userId)
  const client = await connectDb()
  const db = client.db()

  const booksArr = await db.collection('books').find({ userId: userId }).toArray()
  //   console.log(booksArr)

  return booksArr
}

export async function getBook(id) {
  const client = await connectDb()
  const db = client.db()

  const book = await db.collection('books').findOne({ bid: id })
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
