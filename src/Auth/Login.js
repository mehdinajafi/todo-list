import React, { useCallback, useContext } from 'react'
import { withRouter, Redirect } from 'react-router'
import fbase from '../firebase.js'
import { AuthContext } from './AuthContext.js'
import { Link } from 'react-router-dom'
import '../styles/auth-styles/forms.css'

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault()
      const { email, password } = event.target.elements
      try {
        await fbase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value)
        history.push('/')
      } catch (error) {
        alert(error)
      }
    },
    [history]
  )

  const { currentUser } = useContext(AuthContext)

  if (currentUser) {
    return <Redirect to="/" />
  }

  return (
    <div className="form-container">
      <form onSubmit={handleLogin} className="form-box">
        <h1>Login</h1>
        <label>
          Email
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          Password
          <input name="password" type="password" placeholder="Password" />
        </label>
        <button type="submit">Login</button>
        <p>
          New user? <Link to="./signup">Craete an account</Link>
        </p>
      </form>
    </div>
  )
}

export default withRouter(Login)
