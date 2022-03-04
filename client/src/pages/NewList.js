import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import AddItem from '../components/NewItem'


const NewList = () => {

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [makePublic, setMakePublic] = useState(false)
  const navigate = useNavigate()


  const makeNewList = event => {
    event.preventDefault()

    axios.post('/lists/new', { name, description })
      .then(response => {
        console.log(response)
      })
      .catch(err => console.log(err))
    setName('')
    setDescription('')
    navigate(`/lists`)


  }


  return (
    <>
      <h1>Add New List</h1>
      <form onSubmit={makeNewList}>
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
        {/* <label htmlFor="makePublic">Public: </label>
        <input
          id='makePublic'
          type='checkbox'
          value={makePublic}
          onChange={e => setMakePublic(e.target.value)}
        /> */}

        <button type="submit">Make this list</button>
      </form>
      <h1>---------------new item------------------</h1>
      <AddItem />
    </>

  )
}

export default NewList
