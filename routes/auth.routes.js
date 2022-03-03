const router = require("express").Router();
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken');
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post('/signup', (req, res, next) => {
  const { email, password, name } = req.body
  // check if email or name or password are empty
  if (email === '' || password === '' || name === '') {
    res.status(400).json({ message: 'Provide email, password and name' })
    return
  }
  // validate the email address
  // const emailValid = email.includes('@')
  // if (!emailValid) {
  // 	res.status(400).json({ message: 'Provide a valid email address' })
  // 	return
  // }
  if (password.length < 4) {
    res.status(400).json({ message: 'Password has to be 4 chars min' })
    return
  }
  // check the database if a user with the same email exists
  User.findOne({ email })
    .then(foundUser => {
      // if the user already exists send an error
      if (foundUser) {
        res.status(400).json({ message: 'User already exists' })
        return
      }
      // hash the password
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt)
      // create the new user
      return User.create({ email, password: hashedPassword, name })
        .then(createdUser => {
          const { email, name, _id } = createdUser
          const user = { email, name, _id }
          res.status(201).json({ user: user })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json({ message: 'Internal Server Error' })
        })
    })
});

router.post('/login', (req, res, next) => {
  const { email, password } = req.body
  if (email === '' || password === '') {
    res.status(400).json({ message: 'Provide email and password' })
    return
  }
  User.findOne({ email })
    .then(foundUser => {
      if (!foundUser) {
        res.status(400).json({ message: 'User not found' })
        return
      }
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
      if (passwordCorrect) {
        const { _id, email, name } = foundUser
        const payload = { _id, email, name }
        // create the json web token
        const authToken = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { algorithm: 'HS256', expiresIn: '12h' }
        )
        res.status(200).json({ authToken })
      } else {
        res.status(401).json({ message: 'Unable to authenticate' })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    })
});

router.get('/verify', isAuthenticated, (req, res, next) => {
  // if the token is valid we can access it on : req.payload
  console.log('request payload is: ', req.payload)
  res.status(200).json(req.payload)
});

module.exports = router;

router.post('/login', (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === '' || password === '') {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {

      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." })
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };

        // Create and sign the token
        const authToken = jwt.sign(
          payload,
          process.env.TOKEN_SECRET,
          { algorithm: 'HS256', expiresIn: "6h" }
        );

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      }
      else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }

    })
    .catch(err => res.status(500).json({ message: "Internal Server Error" }));
});



router.get('/verify', isAuthenticated, (req, res, next) => {       // <== CREATE NEW ROUTE

  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});

module.exports = router;