const Booking = require("../models/Booking");
const Car = require("../models/Car");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// booking car  
const bookCar = async (req, res) => {

    const { token } = req.body;

    try {
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id,
        });


        if (customer) {
            const newbooking = new Booking(req.body);
            await newbooking.save();
            const car = await Car.findOne({ _id: req.body.car });
            console.log(req.body.car);
            car.bookedTimeSlots.push(req.body.bookedTimeSlots);

            await car.save();
            res.send("Your booking is successfull");
        }

        else res.status(400).json('Payment Failed...')

    } catch (error) {
        res.status(500).json(error)
    }

}

// get all booking list of a single user
const getAllBookingsOfUser = async (req, res) => {

    try {
        const bookings = await Booking.find({ user: req.params.id }).populate("car").sort({createdAt : -1})

        if (bookings.length === 0) return res.status(400).json('You Never Booked Any Car')

        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json(error)
    }

}

// get all booking list [ ADMIN ]
const getAllBookings = async (req, res) => {

    try {
        const bookings = await Booking.find({}).populate("car").populate("user", "-password").sort({createdAt : -1})

        if (bookings.length === 0) return res.status(400).json('No one Booked Any Car')

        res.status(200).json(bookings)
    } catch (error) {
        res.status(500).json(error)
    }

}

// sending stripe public key to front end
const sendStripeKey = async (req, res) => {
    try {
        res.status(200).json({ STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY })
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = { bookCar, getAllBookings, sendStripeKey, getAllBookingsOfUser }