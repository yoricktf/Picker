import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    const requestBody = { email, password, name }
    axios.post('/auth/signup', requestBody)
      .then(response => {
        // redirect to login
        navigate('/')
        console.log('routing is working???????????????????????????????????')
      })
      .catch(err => {
        console.log('there is an error')
        const errorDescription = err.response.data.message
        setErrorMessage(errorDescription)
      })
  }

  const handleEmail = e => setEmail(e.target.value)
  const handleName = e => setName(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const [errorMessage, setErrorMessage] = useState(undefined);

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email: </label>
        <input type="text" value={email} onChange={handleEmail} />
        <label htmlFor="password">Password: </label>
        <input type="password" value={password} onChange={handlePassword} />
        <label htmlFor="name">Name: </label>
        <input type="text" value={name} onChange={handleName} />
        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <h5>{errorMessage}</h5>}

      <h3>Already have an account?</h3>
      <Link to='/'>Login</Link>
    </>
  )
}
