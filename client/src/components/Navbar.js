import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'


const Navbar = () => {

  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const resetMatches = () => {
    console.log('object');

    axios.post('/items/resetMatches', { user })
      .then(response => {
      })
    navigate('/lists')
  }



  return (
    <nav>
      {isLoggedIn ?
        (
          <>
            {/* <button onClick={logoutUser}>back</button> */}

            <h1 onClick={resetMatches}>PICKER</h1>

            <div><p>{user.name}</p></div>
            <button onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/'>
              <h1>PICKER</h1>
            </Link>
          </>
        )}
    </nav>
  )
}

export default Navbar
