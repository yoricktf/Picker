import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth'

const Friends = () => {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState('');
  const { user } = useContext(AuthContext);
  let searchResult;

  const onChange = (e) => {
    setName(e.target.value)
  }


  const addFriend = e => {
    console.log(user)
    // user.friends.push(searchResult);
    axios.post('/friends/addFriend', { searchResult, user })
      .then(friend => {
      })
  }

  useEffect(() => {
    axios.get('/friends')
      .then(allFriends => {
        // console.log(allFriends)
        setFriends(allFriends.data)
      })
      .catch(err => console.log(err))
  }, [])

  // console.log(friends)

  for (let friend of friends) {
    if (friend.name === name) {
      searchResult = friend
    }
  }
  // console.log(searchResult);



  return (
    <>
      <div>Friends</div>
      <input type="text" value={name} onChange={onChange} />


      {searchResult ?
        (
          <div className="userCard">
            <h1>{searchResult.name}</h1>
            <button onClick={addFriend}>add as friend</button>
          </div>


        ) : (
          <h1></h1>
        )

      }
    </>
  )
}

export default Friends
