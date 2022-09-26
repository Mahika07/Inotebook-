const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv");
dotenv.config();
const sshkey = process.env.sshkey
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
        let sucess = false;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ sucess, errors: errors.array() });
        }
        try {
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ sucess, error: "sorry this emil alreday exists" });
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
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, sshkey);
            sucess = true;
            // res.json({ user })
            res.json({ sucess, token })
        }
        catch (error) {
            console.log(error);
            res.status(500).send("some error occured")
        }
    })

//authicating login

router.post('/login', [body('email', 'Enter a valid email').isEmail(), body('password', 'password cannot be blank').exists()], async (req, res) => {
    const errors = validationResult(req);
    let sucess = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ sucess, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            sucess = false;
            return res.status(400).json({ sucess, error: "please login with correct email or password" });
        }
        const pass = await bcrypt.compare(password, user.password);
        if (!pass) {
            sucess = false;
            return res.status(400).json({ sucess, error: "please login with correct email or password" });
        }
        const data = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(data, sshkey);
        sucess = true;
        res.json({ sucess, token })
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


