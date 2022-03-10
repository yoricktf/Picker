import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Lists = () => {
  // ----------------------------------security stuff------------------
  const storedToken = localStorage.getItem('authToken')
  const security = { headers: { Authorization: `Bearer ${storedToken}` } }

  // --------------------------------------------------------------------

  const [lists, setLists] = useState([])



  const getAllLists = () => {
    axios.get('/lists', security)
      .then(allLists => {
        // console.log(allLists)
        setLists(allLists.data)

      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getAllLists()
  }, [])

  return (
    <>

      {lists.map((list) => (
        <div className='listCard' key={list._id}>
          <h1 >
            <Link to={`/lists/${list._id}/friends`}>
              {list.listName}
            </Link>
          </h1>
          <h5>{list.listDescription}</h5>

        </div>
      ))}

      <Link to={'/lists/new'}><div className='circleButton'><h1 className='plus'>+</h1></div></Link>



    </>

  )
}

export default Lists
