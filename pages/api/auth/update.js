import { connectDb } from '../../../helpers/db'
import { getSession } from 'next-auth/react'

async function handler(req, res) {
  if (req.method === 'PUT') {
    const data = req.body
    const { email, name } = data
    const session = await getSession({ req: req })
    const userId = session.user.email

    const client = await connectDb()

    const db = client.db()

    const profile = await db.collection('users').findOne({ email: email })

    if (!profile) {
      res.status(422).json({ message: 'User does not exist' })
      client.close()
      return
    }

    const result = await db.collection('users').updateOne({ email: userId }, { $set: { name: name, email: email } })

    if (!result.acknowledged) {
      res.status(500).json({ message: 'Error updating profile' })
      client.close()
      return
    }

    res.status(200).json({ message: 'User updated' })
    client.close()
  }
}

export default handler
