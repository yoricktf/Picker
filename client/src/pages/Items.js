import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from '../context/auth'

const Items = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  const { id } = useParams()
  const listId = id

  // const getAllItems = () => {
  //   axios.get('/items')
  //     .then(response => {
  //       // console.log(response.data)
  //       setItems(response.data)
  //     })
  // }
  // useEffect(() => {
  //   getAllItems()
  // }, [])


  const getListItems = () => {
    axios.post('/items/listItems', { id: listId })
      .then(response => {
        console.log(response.data.itemsArray)
        setItems(response.data.itemsArray)
      })
  }

  useEffect(() => {
    getListItems()
  }, [])








  const addItem = (e) => {
    // const storedToken = localStorage.getItem('authToken')
    console.log(e.target.value)
    // axios.post('/items/liked', { id: e.target.value, headers: { Authorization: `Bearer ${storedToken}` } })
    axios.post('/items/liked', { id: e.target.value, user })
  }

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
