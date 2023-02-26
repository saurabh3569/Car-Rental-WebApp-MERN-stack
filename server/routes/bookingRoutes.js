const express = require("express");
const router = express.Router();

const { getAllBookings, bookCar, sendStripeKey, getAllBookingsOfUser } = require("../controllers/bookingControllers");
const { protect, isAdmin } = require("../Middleware/authMiddleware");


router.post("/bookcar", protect, bookCar);
router.get("/getallbookings/:id", protect, getAllBookingsOfUser);
router.get("/getallbookings", protect,isAdmin, getAllBookings);
router.get('/publickey', sendStripeKey)

module.exports = router;