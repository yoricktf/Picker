const User = require('../models/User.model')
const router = require("express").Router();

router.get('/', (req, res, next) => {
  let email = req.body

  console.log(req.body);

  // User.find(email)
  //   .then(user => {
  //     console.log(user)
  //   })


  User.findOne(email)
    .then(foundUser => {
      console.log(foundUser);
      if (foundUser) {
        // console.log(foundUser)
        res.status(200).json(foundUser)
        return
      }
      // res.status(400).json('none found')
      // console.log(foundUser)
    })
    .catch(err => next(err))
})





module.exports = router;
