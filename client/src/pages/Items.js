import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth'

const Items = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([])
  const navigate = useNavigate()


  const getAllItems = () => {
    axios.get('/items')
      .then(response => {
        // console.log(response.data)
        setItems(response.data)
      })
  }

  useEffect(() => {
    getAllItems()
  }, [])

  const addItem = (e) => {
    // const storedToken = localStorage.getItem('authToken')
    console.log(e.target.value)
    // axios.post('/items/liked', { id: e.target.value, headers: { Authorization: `Bearer ${storedToken}` } })
    axios.post('/items/liked', { id: e.target.value, user })
  }

  // const checkForMatches = () => {
  //   console.log('checking for matches')
  //   axios.post('/items/matches', { user })
  //     .then(matches => {
  //       console.log(matches.data)
  //     })
  // }

  const matchesPage = () => {
    navigate(`/matches`)
  }


  return (
    <>
      {items.map((item) => (
        <div key={item._id} >
          <h1>{item.itemName}</h1>
          <button value={item._id} onClick={addItem}>yes</button>
        </div>
      ))}
      {/* <button onClick={checkForMatches}>check for matches</button> */}
      <button onClick={matchesPage}>check for matches</button>
    </>
  )
}

export default Items
