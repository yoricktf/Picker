const List = require('../models/List.model')
const Item = require('../models/Item.model')

const router = require("express").Router();

router.get('/', (req, res, next) => {
  List.find()
    .then(lists => {
      res.status(200).json(lists)
      console.log('lists should be showing')
    })
});

router.post('/new', (req, res, next) => {
  const { listName, listDescription, isPublic, itemsArray } = req.body

  List.create({ listName, listDescription, isPublic, itemsArray })
    .then(list => {


      // Item.insertMany()
      //   .then()



      res.status(200).json(list)
    })
    .catch(err => next(err))
})

// router.get('/:id', (req, res, next) => {
//   List.findById(req.params.id)
//     .then(list => {
//       res.status(200).json(list)
//     })
// })




module.exports = router;
