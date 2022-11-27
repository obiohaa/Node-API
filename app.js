require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()

const connectDB = require('./db/connect')
const apiRoutes = require('./routes/products')
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send('API TESTs')
})

//API routes
app.use('/api/v1/products', apiRoutes)

//Error middleware
app.use(notFoundMiddleware);
app.use(errorMiddleware)

const port = process.env.PORT || 3000

//Server Connection
const start = async() =>{
    try{
        await connectDB(process.env.DB_URL)
        app.listen(port, console.log(`server is listening to port ${port}...`))
    } catch (error){
        console.log(error)
    }
}
start()