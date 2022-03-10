import axios from 'axios';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import service from "../api/serviceItemPic";



const NewList = () => {
  // ----------------------------------security stuff------------------
  const storedToken = localStorage.getItem('authToken')
  const security = { headers: { Authorization: `Bearer ${storedToken}` } }
  // --------------------------------------------------------------------
  const [listName, setListName] = useState('')
  const [listDescription, setListDescription] = useState('')
  // const [makePublic, setMakePublic] = useState(false)
  const navigate = useNavigate()
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemsArray, setItemsArray] = useState([])
  const [itemPicture, setItemPicture] = useState("");

  const itemNew = event => {
    event.preventDefault()
    axios.post('/items/new', { itemName, itemDescription, itemPicture }, security)
      .then(response => {
        // console.log(response.data)
        setItemsArray([...itemsArray, response.data])
        // itemsArray.push(response)
      })
      .catch(err => console.log(err))
    setItemName('')
    setItemPicture('')
    setItemDescription('')
    console.log(itemsArray)
  }


  // ======================// ======================// ======================

  const handleFileUpload = e => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("itemPicture", e.target.files[0]);

    service
      .uploadImage(uploadData)
      .then(response => {
        // console.log("response is: ", response);
        // response carries "secure_url" which we can use to update the state
        setItemPicture(response.secure_url);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };

  // ======================// ======================// ======================

  const listNew = event => {
    event.preventDefault()
    axios.post('/lists/new', { listName, listDescription, itemsArray }, security)
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
          <input type="file" onChange={(e) => handleFileUpload(e)} />
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
    </>
  )
}

export default NewList
