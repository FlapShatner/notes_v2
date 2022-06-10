import connectDb from '../../helpers/dbConnect'
import { Note, Book } from '../../models/book-model'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb()

      const { title, content } = req.body
      const book = new Book({
        title: title,
        content: content,
        notes: [],
        bid: uuidv4(),
      })

      const response = await book.save()
      res.statusCode = 201
      res.end(JSON.stringify(response))
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Error saving book' })
    }
  } else if (req.method === 'GET') {
    res.status(200).json({ message: 'Get request successful' })
  }
}
