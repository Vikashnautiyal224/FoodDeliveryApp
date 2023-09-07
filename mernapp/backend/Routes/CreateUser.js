const express = require('express');
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");

const bccrypt = require("bcryptjs");
const jwtSecret = "mynameisvikashnautiayal"

router.post("/createUser", [
    body('email', 'Incorrect Email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'password length is to0 short').isLength({ min: 5 })
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const salt = await bccrypt.genSalt(10);
    let secPassword = await bccrypt.hash(req.body.password, salt)


    try {
        await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location
        })
        res.json({ success: true });
    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})

router.post("/loginUser", [
    body('email', 'Incorrect Email').isEmail(),
    body('password', 'password length is to0 short').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    try {
        let userData = await User.findOne({ email });
        if (!userData) {
            return res.status(400).json({ errors: "Try logging with correct email" });
        }
        const pwdCompare = await bccrypt.compare(req.body.password, userData.password)
        if (!pwdCompare) {
            return res.status(400).json({ errors: "Try logging with correct password" });
        }
        const data = {
            user: {
                id: userData.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        return res.json({ success: true,authToken:authToken});

    } catch (error) {
        console.log(error)
        res.json({ success: false });
    }
})
module.exports = router;