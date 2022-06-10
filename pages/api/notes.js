import connectDb from '../../helpers/dbConnect'
import { Note } from '../../models/book-model'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await connectDb()

      const { title, content } = req.body
      const note = new Note({
        title: title,
        content: content,
        //figure out book id
      })
      //save note to db
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Error connecting to database' })
    }
  }
}
