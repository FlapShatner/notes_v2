import connectDb from '../../helpers/dbConnect'
import { Book } from '../../models/book-model'
import { v4 as uuidv4 } from 'uuid'
import { getSession } from 'next-auth/react'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb()
      const session = await getSession({ req: req })
      const userId = session.user.email

      const { title, description } = req.body
      const book = new Book({
        title: title,
        description: description,
        notes: [],
        bid: uuidv4(),
        userId: userId,
      })

      const response = await book.save()
      res.statusCode = 201
      res.end(JSON.stringify(response))
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Error saving book' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await connectDb()
      const { bid } = req.body
      const book = await Book.findOneAndDelete({ bid: bid })
      res.statusCode = 200
      res.end(JSON.stringify(book))
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error deleting book' })
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ message: 'Get request successful' })
  }
}
