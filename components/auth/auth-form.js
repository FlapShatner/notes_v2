import { useState, useRef } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import classes from './auth-form.module.css'

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()

  if (!response.ok) {
    console.log(data.message || 'Something went wrong')
    return
  }
  const result = await loginUser(email, password)
}

async function loginUser(email, password) {
  const result = await signIn('credentials', {
    redirect: false,
    email: email,
    password: password,
  })
  return result
}

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const emailRef = useRef()
  const passwordRef = useRef()
  const password2Ref = useRef()

  const router = useRouter()

  function toggleAuth() {
    setIsLogin((prev) => !prev)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const emailInput = emailRef.current.value
    const passwordInput = passwordRef.current.value
    const password2Input = password2Ref.current?.value

    if (isLogin) {
      const result = await loginUser(emailInput, passwordInput)

      if (!result.error) {
        router.replace('/')
      }
    } else {
      if (passwordInput.value !== password2Input.value) {
        alert('Passwords do not match')
        return
      } else {
        try {
          const result = await createUser(emailInput, passwordInput)
          emailRef.current.value = ''
          passwordRef.current.value = ''
          password2Ref.current.value = ''
          router.replace('/')
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  async function guestLogin() {
    const result = await signIn('credentials', {
      redirect: false,
      email: 'guest@guest.com',
      password: '1234567',
    })
    if (!result.error) {
      router.replace('/')
    }
  }

  return (
    <section className={classes.authForm}>
      <main>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={handleSubmit}>
          <div className={classes.control}>
            <input type='email' id='email' required ref={emailRef} placeholder='Email Address' />
          </div>
          <div className={classes.control}>
            <input type='password' id='password' required ref={passwordRef} placeholder='Password' />
            {!isLogin && (
              <input type='password' id='password2' required ref={password2Ref} placeholder='Confirm Password' />
            )}
          </div>
          <div className={classes.actions}>
            <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
            <p>or</p>
            <button type='button' onClick={toggleAuth}>
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>

            <a onClick={guestLogin}>Try as guest</a>
          </div>
        </form>
      </main>
    </section>
  )
}
