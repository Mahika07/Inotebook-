const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv");
// dotenv.config();
// const KEY = process.env.KEY || "mahikasharma@$000"
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
// router.get('/', (req, res) => {
//     // console.log(req.body)
//     res.json([])
// })

var jwt = require('jsonwebtoken');

//creating user
router.post('/createuser',

    [body('name', 'Enter a valid name').isLength({ min: 3 }), body('email', 'Enter a valid Email').isEmail(), body('password', 'password length should be minimum 5').isLength({ min: 5 })],

    async (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        let success = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "sorry this email already exists" });
            }

            //securing password by adding salt

            const salt = await bcrypt.genSalt(10);
            const securepass = await bcrypt.hash(req.body.password, salt);
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securepass
            })
            // .catch((err) => {
            //     console.log(err)
            //     res.json({ error: 'please enter a unique email', message: err.message })
            // })

            //generating token
            console.log("all saved")
            const data = {
                user: {
                    id: user.id
                }
            }
            console.log("2 saved")
            const token = jwt.sign(data, "mahikasharma@$000");
            console.log("3 saved")
            success = true;
            // res.json({ user })
            res.json({ success, token })
            console.log("4 saved")
        }
        catch (error) {
            console.log(error);
            res.status(500).send("some error occured")
        }
    })

//authicating login

router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'password cannot be blank').isLength({ min: 5 })], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email or password" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            success = false;
            return res.status(400).json({ success, error: "please login with correct email or password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, "mahikasharma@$000");
        success = true;
        res.json({ success, token })
    }
    catch (error) {
        console.log(error);
        res.status(500).send("some error occured")
    }
})

//get user details after login

router.post('/getuser', fetchuser, async (req, res) => {

    try {
        const userid = req.user.id
        console.log(userid)
        const user = await User.findById(userid).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error)
        res.status(500).send("some error occured");
    }


})
module.exports = router;


