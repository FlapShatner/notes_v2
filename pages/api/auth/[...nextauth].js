import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { connectDb } from '../../../helpers/db'
import { verifyPassword } from '../../../helpers/auth'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectDb()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          throw new Error('User not found')
          client.close()
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          throw new Error('Invalid credentials')
          client.close()
        }

        client.close()
        return { email: user.email, name: user.name }
      },
    }),
  ],
  secret: 'secretsecret',
})
