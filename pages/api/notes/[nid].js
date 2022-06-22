import connectDb from '../../../helpers/dbConnect'
import { Book } from '../../../models/book-model'

export default async function handler(req, res) {
  const _id = req.query.nid
  const { method } = req

  try {
    await connectDb()
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error connecting to database' })
  }

  if (method === 'DELETE') {
    if (req.body.nid) {
      try {
        const { nid, bid } = req.body
        const book = await Book.findOne({ bid: bid })
        const response = await Book.findOneAndUpdate({ bid: bid }, { $pull: { notes: { nid: nid } } }, { new: true })

        // const note = await book.notes.pull({ nid: nid })
        console.log(response)
        const result = await book.save()
        res.status(200).json(result)
        res.end()
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error deleting note' })
        res.end()
        return
      }
    } else {
      try {
        const { bid } = req.body
        const book = await Book.findOne({ bid: bid })
        book.notes.id(_id).remove()
        const result = await book.save()
        res.status(200).json({ message: `Note ${_id} deleted` })
        res.end()
      } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error connecting to database' })
      }
    }
  }
}
