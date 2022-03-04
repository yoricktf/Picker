const Item = require('../models/Item.model')
const router = require("express").Router();

router.post('/new', (req, res, next) => {
  const { itemName, itemDescription, itemPicture } = req.body

  Item.create({ itemName, itemDescription, itemPicture })
    .then(list => {

      res.status(200).json(list)
    })
    .catch(err => next(err))
})


module.exports = router;
