const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');

// **Converted from callback to async due to Mongoose dropping callback support**
const getUser = async (req, res, callback) => {
    try {
        if (req.payload && req.payload.email) {
            const user = await User.findOne({ email: req.payload.email }).exec();

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            callback(req, res, user.name);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(404).json(err);
    }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

    // Uncomment following line to show result of query on console
    // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
            }
};


// GET: /trips:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
    .find({'code' : req.params.tripCode }) // Return single record
    .exec();

    // Uncomment following line to show result of query on console
    // console.log(q);

    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
            }
};


// POST: /trips - Adds a new trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async(req, res) => {
    getUser(req, res, (req, res) => {
        Model.create({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
        (err, trip) => {
            if(err) {
                return res
                    .status(400)
                    .json(err);
            } else {
                return res
                    .status(201)
                    .json(trip);
            }
        }
    );
});
};


// PUT: /trips/:tripCode - Adds a new trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async(req, res) => {
    getUser(req, res, (req, res) => {
        Model.findOneAndUpdate(
            {'code':req.params.tripCode },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            { new: true }
        )
        .then((trip) => {
            if (!trip) {
                return res
                    .status(404)
                    .send({
                        message: 'Trip not found with code ' + req.params.tripCode,
                    });
            }
            res.send(trip);
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res
                    .status(404)
                    .send({
                        message: 'Trip not found with code ' + req.params.tripCode,
                    });
            }
            return res
                .status(500)
                .json(err)
            });
        });
    };


module.exports = {
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip
};