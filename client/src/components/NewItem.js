import axios from 'axios';
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // const [picture, setPicture] = useState('');
  const [itemsArray, setItemsArray] = useState([])
  const [item, setItem] = useState({})


  const handleSubmit = event => {

    event.preventDefault()

    setItem({})


    axios.post('/items/new', { name, description })
      .then(response => {
        // console.log(response.data)
        setItemsArray([...itemsArray, response.data])
        // itemsArray.push(response)
      })
      .catch(err => console.log(err))
    setName('')
    setDescription('')

    console.log(itemsArray)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="description">Description: </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={e => setDescription(e.target.value)}
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

              {item.name}

            </h3>
            <p>{item.description}</p>
          </div>
        ))}
      </>
    </>
  )
}

export default ItemForm
