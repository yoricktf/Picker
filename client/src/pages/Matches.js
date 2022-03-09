import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/auth'


const Matches = () => {
  const { user } = useContext(AuthContext);


  const [matchedItems, setMatchedItems] = useState([])


  const checkForMatches = () => {
    console.log('checking for matches')
    axios.post('/items/matches', { user })
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


  useEffect(() => {
    checkForMatches()
  }, [user])

  console.log(matchedItems);


  return (
    <>
      <div>Matches</div>
      {matchedItems.map(match => (
        <div key={match._id}>
          <h1>{match.itemName}</h1>
        </div>
      ))}
    </>

  )
}

export default Matches
