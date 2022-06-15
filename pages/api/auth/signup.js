import { connectDb } from '../../../helpers/db'
import { hashPassword } from '../../../helpers/auth'

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const { email, password } = data

    if (!email || !email.includes('@') || !password || password.trim().length < 7) {
      res.status(422).json({ message: 'Invalid credentials - password should be at least 7 characters long' })
      return
    }

    const client = await connectDb()

    const db = client.db()

    const existingUser = await db.collection('users').findOne({ email: email })

    if (existingUser) {
      res.status(422).json({ message: 'User already exists, login instead' })
      client.close()
      return
    }

    const hashedPassword = await hashPassword(password)

    const result = await db.collection('users').insertOne({
      email: email,
      password: hashedPassword,
    })

    res.status(201).json({ message: 'User created' })
    client.close()
  }
}

export default handler
