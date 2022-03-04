const Item = require('../models/Item.model')
const router = require("express").Router();

router.post('/new', (req, res, next) => {
  const { name, description, picture } = req.body

  Item.create({ name, description, picture })
    .then(list => {

      res.status(200).json(list)
    })
    .catch(err => next(err))
})


module.exports = router;
