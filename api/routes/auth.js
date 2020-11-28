const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { registerValidation, loginValidation } = require('../validation');

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/me', (req, res) => {
    const token = req.body.token;
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        const userId = decoded._id;
        const user = await User.findOne({ _id: userId })

        res.json({ id: user._id, name: user.name, email: user.email })
    });


})

router.post('/register', async (req, res) => {
    //validate data
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists');

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    })
    try {
        const saveUser = await user.save();
        res.json({ user: user._id });
    } catch (err) {
        res.json({ message: err })
    }
})

router.post('/login', async (req, res) => {
    //validate data
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //CHECK Email
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email not find or password is wrong');

    //CHECK PAssword
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('password is wrong');

    //Create and assign Token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({ access_token: token, user: { id: user._id, name: user.name, email: user.email } });
});

module.exports = router;