require('dotenv').config()

const connectDB = require('./db/connect')
const products = require('./models/product')
const dummyItems = require('./products.json')

const start = async () => {
    try{
        await connectDB(process.env.DB_URL)
        await products.deleteMany()
        await products.create(dummyItems)
        console.log('SUCCESS!!!')
        process.exit(0)
    } catch(error){
        console.log(error)
        process.exit(1)
    }
}
start()