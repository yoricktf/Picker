import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Lists = () => {
  // ----------------------------------security stuff------------------
  const storedToken = localStorage.getItem('authToken')
  const security = { headers: { Authorization: `Bearer ${storedToken}` } }
  console.log(security)
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
      <div>Lists</div>
      {lists.map((list) => (
        <div key={list._id}>
          <h1 >
            <Link to={`/lists/${list._id}/friends`}>
              {list.listName}
            </Link>
          </h1>
          <h5>{list.listDescription}</h5>

        </div>
      ))}

      <Link to={'/lists/new'}>plus</Link>



    </>

  )
}

export default Lists
