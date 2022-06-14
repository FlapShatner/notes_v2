import connectDb from '../../../helpers/dbConnect'
import { Book } from '../../../models/book-model'

export default async function handler(req, res) {
  const nid = req.query.nid
  const { method } = req

  try {
    await connectDb()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error connecting to database' })
  }

  if (method === 'DELETE') {
    try {
      const { bid } = req.body
      const book = await Book.findOne({ bid: bid })
      book.notes.id(nid).remove()
      const result = await book.save()

      res.status(200).json({ message: `Note ${nid} deleted` })
      res.end()
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error connecting to database' })
    }
  }
}
