import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { Navigate, useNavigate } from "react-router-dom";

const Matches = () => {
  // ----------------------------------security stuff------------------
  const storedToken = localStorage.getItem('authToken')
  const security = { headers: { Authorization: `Bearer ${storedToken}` } }
  // --------------------------------------------------------------------
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const [matchedItems, setMatchedItems] = useState([])


  const checkForMatches = () => {
    console.log('checking for matches')
    axios.post('/items/matches', { user }, security)
      .then(user => {

        let userMatches = user.data.matches
        let friends = user.data.friends
        let friendsMatches = [];
        let completeMatches = []

        for (let friend of friends) {
          for (let item of friend.matches) {
            friendsMatches.push(item)
          }
        }
        for (let element of userMatches) {
          if (JSON.stringify(friendsMatches).includes(JSON.stringify(element))) {
            completeMatches.push(element)
          }
        }
        setMatchedItems(completeMatches)
      })
  }

  const resetMatches = () => {
    console.log('object');

    axios.post('/items/resetMatches', { user }, security)
      .then(response => {
      })
    navigate('/lists')
  }

  // -----------WORKING-------------
  useEffect(() => {
    checkForMatches()
  }, [user])
  // -----------WORKING-------------





  return (
    <>
      <h2>Matches</h2>
      {matchedItems.map(match => (
        <div className='form' key={match._id}>
          <h1>{match.itemName}</h1>
          <img className='itemPicture' src={match.itemPicture} alt="" />
          <p>{match.itemDescription}</p>
        </div>
      ))}
      <button className='matchButton' onClick={resetMatches}>Pick Again</button>
    </>

  )
}

export default Matches
