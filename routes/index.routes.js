const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// You put the next routes here 👇


// router.get("/categories", (req, res, next) => {
//   res.json("All good in here");
// });

module.exports = router;
