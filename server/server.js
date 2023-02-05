const dotenv = require('dotenv').config()

const express = require('express')

const morgan = require('morgan')

const app = express();

const port = process.env.PORT

app.use(morgan('dev'))


app.get('/', (req, res) => {
    res.status(200).json({
        message: "Hello Boss <3"
    })
})

app.listen(port, () => {
    console.log(`The server is listening on PORT ${port}`);
})