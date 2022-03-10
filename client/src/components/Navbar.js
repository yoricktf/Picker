import './Navbar.css';
import axios from 'axios'
import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'


const Navbar = () => {
  // ----------------------------------security stuff------------------
  const storedToken = localStorage.getItem('authToken')
  const security = { headers: { Authorization: `Bearer ${storedToken}` } }
  // console.log(security)
  // --------------------------------------------------------------------

  const { isLoggedIn, user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState('')
  const [fullUser, setFullUser] = useState('')


  const resetMatches = () => {

    axios.post('/items/resetMatches', { user }, security)
      .then(user => {

        setCurrentUser(user)
      })
    navigate('/lists')
  }


  // ++++++++++++++++++++++++++++++++++++++


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = () => {
    axios.post('/friends/profile', { user }, security)
      .then(response => {
        setFullUser(response.data)
      })
  }

  useEffect(() => {
    getUser()
  }, [user])
  // ++++++++++++++++++++++++++++++++++++++



  return (
    <nav>
      {isLoggedIn ?
        (
          <>
            {/* <button onClick={logoutUser}>back</button> */}
            <h1 className='navText' onClick={resetMatches}>PICKER</h1>
            <img className='profilePicture' src={fullUser.profilePicture} onClick={logoutUser} alt="" />
          </>
        ) : (
          <>
            <Link to='/'>
              <h1 className='navText'>PICKER</h1>
            </Link>
          </>
        )}

    </nav>
  )
}

export default Navbar
