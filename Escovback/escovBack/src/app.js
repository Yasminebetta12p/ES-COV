const express = require('express');
const connection = require('./config/DatabaseConfig')
const bodyParser = require('body-parser');

const PublicationsRouter = require('./routes/Publication')
const NewsletterRouter = require('./routes/Newsletter')
const userRouter = require('./routes/User')
const authRouter = require('./routes/Auth')
var cors = require('cors')




connection.getConnections();

const app = express();


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  app.use(cors())


app.use(express.json());
app.use(bodyParser.json());
app.use('/api/publications', PublicationsRouter);
app.use('/api/newsletter', NewsletterRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);




module.exports = app;