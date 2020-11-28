const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const private = require('./routes/verifyToken');

//import routes
const authRoute = require('./routes/auth');
const sampleRoute = require('./routes/sample')

//config
dotenv.config();

//connnict tout débé
mongoose.connect(
    process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () =>
    console.log('Connect to db')
);


//Middlewares
app.use(cors());
app.use(bodyParser.json());

//Route middleware REGISTER
app.use('/api/user', authRoute);
app.use('/api/sample', private, sampleRoute); //for exemple

//ROUTES (get, post, patch, delete)
app.get('/', (req, res) => {
    res.send('We are on home');
})


app.listen(3000);