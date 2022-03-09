const Item = require('../models/Item.model')
const User = require('../models/User.model')
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
      // console.log(items)
      res.status(200).json(items)
    })
})

router.post('/liked', (req, res, next) => {
  const { id, user } = req.body
  console.log("body is ", req.body)
  console.log("item id is ", id)
  console.log("user is ", user)
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


      // userChoice = user.matches
      // friend = user.friends.toString()

      // User.findById(friend)
      //   .then(response => {

      //     friendsChoice = response.matches

      //     for (choice of userChoice) {
      //       if (friendsChoice.includes(choice)) {
      //         // console.log('match', choice);


      //         Item.findById(choice)
      //           .then(repo => {
      //             console.log('===================', repo)
      //             matches.push(repo)
      //             // console.log("gggggggggggg", matches);
      //           })

      //         // matches.push(choice)

      //       }
      //     }

      //     // console.log("---------------------", matches);
      //     // res.status(200).json(matches)


      //   })
      //   .then(res => {
      //     console.log("---------------------", matches);
      //     res.status(200).json(matches)
      //   })
    })
})


module.exports = router;
