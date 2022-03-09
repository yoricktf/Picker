const Item = require('../models/Item.model')
const User = require('../models/User.model')
const List = require('../models/List.model')
const router = require("express").Router();



router.post('/new', (req, res, next) => {
  const { itemName, itemDescription, itemPicture } = req.body
  Item.create({ itemName, itemDescription, itemPicture })
    .then(list => {
      res.status(200).json(list)
    })
    .catch(err => next(err))
})



router.get('/', (req, res, next) => {
  Item.find()
    .then(items => {
      res.status(200).json(items)
    })
})



router.post('/listItems', (req, res, next) => {

  List.findById(req.body.id)
    .populate('itemsArray')
    .then(list => {

      res.status(200).json(list)
    })
})




router.post('/liked', (req, res, next) => {
  const { id, user } = req.body
  User.findByIdAndUpdate(user._id, { $push: { matches: id } }, { new: true })
    .then(currentUser => {
      console.log('currentuser', currentUser)
    })
})



router.post('/matches', (req, res, next) => {
  const { user } = req.body
  User.findById(user._id)
    .populate('matches')
    .populate('friends')
    .populate({
      path: 'friends',
      populate: {
        path: 'matches',
        model: 'Item'
      }
    })
    .then(user => {
      res.json(user)
    })
})

router.post('/resetMatches', (req, res, next) => {
  const { user } = req.body
  // User.findByIdAndUpdate(user._id, { $pullAll: { matches } },)
  User.findByIdAndUpdate(user._id, { $set: { matches: [] } })
    .then(user => {

    })
})












module.exports = router;
