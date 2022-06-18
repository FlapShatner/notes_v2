import AuthForm from '../components/auth/auth-form'
import { getSession } from 'next-auth/react'

export default function AuthPage() {
  return <AuthForm />
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
