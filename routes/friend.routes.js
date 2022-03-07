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
    .then(friends => {
      console.log('working????????', friends)
      res.status(200).json(friends)
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



module.exports = router;
