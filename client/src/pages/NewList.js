import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';



const NewList = () => {

  const [listName, setListName] = useState('')
  const [listDescription, setListDescription] = useState('')
  // const [makePublic, setMakePublic] = useState(false)
  const navigate = useNavigate()
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  // const [picture, setPicture] = useState('');
  const [itemsArray, setItemsArray] = useState([])
  // const [item, setItem] = useState({})


  const itemNew = event => {
    event.preventDefault()
    axios.post('/items/new', { itemName, itemDescription })
      .then(response => {
        // console.log(response.data)
        setItemsArray([...itemsArray, response.data])
        // itemsArray.push(response)
      })
      .catch(err => console.log(err))
    setItemName('')
    setItemDescription('')
    console.log(itemsArray)
  }


  const listNew = event => {
    event.preventDefault()
    axios.post('/lists/new', { listName, listDescription, itemsArray })
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err))
    setListName('')
    setListDescription('')
    navigate(`/lists`)
  }


  return (
    <>
      <div>
        <h1>------------------Add New List------------------</h1>
        <form onSubmit={listNew}>
          <label htmlFor="listName">listName: </label>
          <input
            id="listName"
            type="text"
            value={listName}
            onChange={e => setListName(e.target.value)}
          />
          <label htmlFor="listDescription">listDescription: </label>
          <input
            id="listDescription"
            type="text"
            value={listDescription}
            onChange={e => setListDescription(e.target.value)}
          />
          {/* <label htmlFor="makePublic">Public: </label>
        <input
          id='makePublic'
          type='checkbox'
          value={makePublic}
          onChange={e => setMakePublic(e.target.value)}
        /> */}

          <button type="submit">Make this list</button>
        </form>
      </div>

      <div>
        <h1>---------------new item------------------</h1>
        <form onSubmit={itemNew}>
          <label htmlFor="itemName">itemName: </label>
          <input
            id="itemName"
            type="text"
            value={itemName}
            onChange={e => setItemName(e.target.value)}
          />
          <label htmlFor="itemDescription">itemDescription: </label>
          <input
            id="itemDescription"
            type="text"
            value={itemDescription}
            onChange={e => setItemDescription(e.target.value)}
          />
          {/* <label htmlFor="picture">Picture: </label>
        <input
          id="picture"
          type="text"
          value={picture}
          onChange={e => setPicture(e.target.value)}
        /> */}

          <button type="submit">add item</button>
        </form>
        <>
          <div>Items</div>
          {itemsArray.map((item) => (
            <div key={item._id}>
              <h3 >

                {item.itemName}

              </h3>
              <p>{item.itemDescription}</p>
            </div>
          ))}
        </>
      </div>
    </>
  )
}

export default NewList
