const express = require("express");
const router = express.Router();

const { register, login, getAllUser } = require("../controllers/userControllers");

const { protect, isAdmin } = require('../Middleware/authMiddleware')

router.post("/login", login);
router.post("/register", register);

router.get('/userlist', protect, isAdmin, getAllUser)

module.exports = router;   