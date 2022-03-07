import axios from 'axios';
import React, { useState, useEffect } from 'react'

const Friends = () => {
  const [mail, setMail] = useState('');

  const onChange = (e) => {
    setMail(e.target.value)
    console.log(mail);

  }

  useEffect(() => {
    axios.get('/friends', { mail })
      .then(friends => {
        // console.log(friends)

      })
      .catch(err => console.log(err))
  }, [mail])


  return (
    <>
      <div>Friends</div>
      <input type="text" value={mail} onChange={onChange} />
    </>
  )
}

export default Friends
