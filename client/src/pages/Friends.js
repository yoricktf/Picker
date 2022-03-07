import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth'

const Friends = () => {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState('');
  const [usersFriends, setUsersFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const storedToken = localStorage.getItem('authToken')
  let searchResult;

  const onChange = (e) => {
    setName(e.target.value)
  }

  console.log(user)

  const currentUser = () => {
    axios.post('/friends/user', user)
      .then(response => {
        console.log(response);
      })
  }

  useEffect(() => {
    currentUser()
  }, [])


  const addFriend = () => {
    // console.log(user)
    axios.post('/friends/addFriend', { searchResult, user })
      .then(usersFriends => {
        // console.log(updatedUser)
        setUsersFriends(usersFriends.data)
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


  for (let friend of friends) {
    if (friend.name === name) {
      searchResult = friend
    }
  }



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
      <ul>
        {/* {usersFriends.map((friend) => (
          <li>{friend}</li>

        ))} */}

      </ul>
    </>
  )
}

export default Friends
