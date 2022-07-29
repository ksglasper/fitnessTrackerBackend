require("dotenv").config()
const express = require("express")
const app = express()
// const client = require("./client");
const apiRouter = require('./api')
const morgan = require("morgan")

app.use(morgan('dev'));

app.use(express.json())


// app.use((req, res, next) => {
//   console.log("<____Body Logger START____>");
//   console.log(req.body);
//   console.log("<_____Body Logger END_____>");
  
//   next();
// });

app.use('/api',apiRouter)

app.get('/', (req, res) =>{
    res.send(`
    <h1>Welcome to the Homepage!</h1>
    <a href='/api'>Head over to the API</a>
    
    `)
    })




// Setup your Middleware and API Router here





module.exports = app;
