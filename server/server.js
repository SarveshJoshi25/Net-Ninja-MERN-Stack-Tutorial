const dotenv = require('dotenv').config()

const express = require('express')

const morgan = require('morgan')

const mongoose = require('mongoose')


const port = process.env.PORT

mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected");
    app.listen(port, () => {
        console.log(`The server is listening on PORT ${port}`);
    })
})
.catch((error) => {
    console.log(error);
})

const app = express();



const workoutRouters = require('./routes/workout')
const userRouter = require('./routes/user')

app.use(morgan('dev'))
app.use(express.json()) //This middleware helps reading JSON sent by requests
app.use('/api/workout', workoutRouters)
app.use('/api/user', userRouter)

