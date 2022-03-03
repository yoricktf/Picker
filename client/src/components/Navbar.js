import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'

const Navbar = () => {

  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

  return (
    <nav>
      {isLoggedIn ?
        (
          <>
            <button onClick={logoutUser}>back</button>
            <Link to='/categories'>
              <h1>PICKER</h1>
            </Link>
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
