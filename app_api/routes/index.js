const express = require("express");
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt'); 
const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'payload'
});

const authController = require('../controllers/authentication');
const tripsController = require("../controllers/trips");

// define route for login endpoint
router
    .route('/login')
    .post(authController.login);

// define route for register endpoint
router
    .route('/register')
    .post(authController.register);

router
    .route("/trips")
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)

module.exports = router;