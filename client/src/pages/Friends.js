import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Link, useParams, useNavigate } from "react-router-dom";

const Friends = () => {
  // ----------------------------------security stuff------------------
  const storedToken = localStorage.getItem('authToken')
  const security = { headers: { Authorization: `Bearer ${storedToken}` } }
  // --------------------------------------------------------------------
  const [name, setName] = useState('');
  const [friends, setFriends] = useState('');
  const [usersFriends, setUsersFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const [userFriends, setAllUsers] = useState([])
  const { id } = useParams()
  const listId = id
  // const navigate = useNavigate()
  let searchResult;




  const onChange = (e) => {
    setName(e.target.value)
  }

  const currentUser = () => {
    axios.post('/friends/user', user, security)
      .then(response => {
        // console.log(response.data);
        setAllUsers(response.data)
      })
  }
  useEffect(() => {
    currentUser()
  }, [])



  const addFriend = () => {
    // console.log(user)
    axios.post('/friends/addFriend', { searchResult, user }, security)
      .then(usersFriends => {
        // console.log(updatedUser)
        setUsersFriends(usersFriends.data)
        // navigate('/Lists/:id/friends')
        window.location.reload(true);
      })
  }

  useEffect(() => {
    axios.get('/friends', security)
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
      <div className="form">
        <h2>Search for new friends</h2>
        <input type="text" className='searchInput' value={name} onChange={onChange} />
      </div>

      {searchResult ?
        (
          <div className='possibleFriendCard'>
            <img className='profilePicture' src={searchResult.profilePicture} alt="" />
            <h1 className='profileName'>{searchResult.name}</h1>
            <div onClick={addFriend} className='circleButton'><h1 className='plus'>+</h1></div>
            {/* <button onClick={addFriend}>add as friend</button> */}
          </div>
        ) : (
          <h1></h1>
        )
      }
      {
        userFriends.map((friend) => (
          <div className='friendCard' key={friend._id}>
            <img className='profilePicture' src={friend.profilePicture} alt="" />
            <h1 className='profileName'>
              <Link to={`/lists/${listId}/items`}>
                {friend.name}
              </Link>
            </h1>
          </div>
        ))
      }


    </>
  )
}

export default Friends



//-------------------------V2 BELOW HERE------------------------------------------------------------------------

// import axios from 'axios';
// import React, { useState, useEffect, useContext } from 'react'


// import { AuthContext } from '../context/auth'
// // import { Link, useParams } from "react-router-dom";

// const Friends = () => {
//   const { user } = useContext(AuthContext);
//   const [name, setName] = useState('')
//   const [friend, setFriend] = useState()
//   const [usersFriends, setUsersFriends] = useState([]);
//   // let searchResult;


//   useEffect(() => {
//     console.log('User', user);
//     axios.get('/friends/allfriends', user)
//       .then(response => {
//         console.log('here is the response', response)
//       })
//   }, [])


//   const findUser = event => {
//     event.preventDefault()
//     axios.post('/friends/search', { name: name })
//       .then(foundFriend => {
//         // console.log(foundFriend.data);
//         // searchResult = foundFriend.data
//         setFriend(foundFriend.data)
//       })
//   }


//   const addFriend = () => {
//     // console.log(user)
//     axios.post('/friends/addFriend', { friend, user })
//       .then(usersFriends => {
//         // console.log(updatedUser)
//         setUsersFriends(usersFriends.data)
//         console.log(usersFriends);
//       })
//   }


//   return (
//     <>
//       <form onSubmit={findUser}>
//         <input type="text" value={name} onChange={e => setName(e.target.value)} />
//         <button type='submit'>search for friend</button>
//       </form>



//       {/* <h1>{friend.name}</h1> */}

//       {friend ?
//         (
//           <div className="userCard">
//             <h1>{friend.name}</h1>
//             <button onClick={addFriend}>add as friend</button>
//           </div>
//         ) : (
//           <h1></h1>
//         )
//       }



//       <ul>
//         {usersFriends.map((friend) => (
//           <div key={friend._id}>
//             <li >
//               {/* <Link to={`/lists`}> */}
//               {friend._id}
//               {/* </Link> */}
//             </li>
//           </div>
//         ))}

//       </ul>
//     </>
//   )
// }

// export default Friends
