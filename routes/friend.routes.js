const { Router } = require('express');
const User = require('../models/User.model')
const router = require("express").Router();

router.get('/', (req, res, next) => {
  User.find()
    .then(user => {
      res.status(200).json(user)
      // console.log(user)
    })
    .catch(err => next(err))
})

router.post('/user', (req, res, next) => {
  console.log('this one', req.body)

  User.findById(req.body._id)
    .populate('friends')
    .then(user => {
      // console.log('working????????', user.friends)
      res.status(200).json(user.friends)
    })
})


router.post('/addFriend', (req, res, next) => {
  const searchResult = req.body.searchResult
  const currentUserId = req.body.user._id
  User.findByIdAndUpdate(currentUserId, { $push: { friends: searchResult } }, { new: true })
    .then(user => {

      res.status(200).json(user.friends)
      // console.log(user)
    })
    .catch(err => next(err))
  // console.log('add friend route triggered')
})

//---------------------------V2 BELOW HERE-------------------------------------------------------------

// router.post('/search', (req, res, next) => {
//   User.findOne(req.body)
//     .then(foundFriend => {
//       // console.log('nananaananna', foundFriend);
//       res.status(200).json(foundFriend)
//     })
//     .catch(err => next(err))
// })

// //get all users friends
// router.get('/allfriends', (req, res, next) => {
//   // console.log('this is the body', req.body);
//   User.find()
//     .then(foundUser => {
//       // if (foundUser._id === user.friends) { }
//       // console.log("this is from the backend", foundUser)
//       // if foundUser
//     })
// })

module.exports = router;
