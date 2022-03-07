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

router.post('/addFriend', (req, res, next) => {
  const searchResult = req.body.searchResult
  const currentUserId = req.body.user._id
  User.findByIdAndUpdate(currentUserId)
    .then(user => {
      user.friends.push(searchResult)
      console.log(user)
    })
  // console.log('add friend route triggered')
})



module.exports = router;
