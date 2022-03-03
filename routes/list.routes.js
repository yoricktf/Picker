const List = require('../models/List.model')

const router = require("express").Router();


router.get("/categories", (req, res, next) => {
  res.json("All good in here");
});

module.exports = router;
