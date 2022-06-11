import { getUserBooks } from '../../helpers/db'
import connectDb from '../../helpers/dbConnect'
import { Book, Note } from '../../models/book-model'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb()

      const { noteTitle, content, bid } = req.body
      const note = new Note({
        noteTitle: noteTitle,
        content: content,
      })

      const result = await Book.findOne({ bid: bid })
      result.notes.push(note)
      const book = await result.save()
      res.status(201)
      res.end(JSON.stringify(book))
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error connecting to database' })
    }
  }
}
