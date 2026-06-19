const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log('MongoDB connected')
         
    }
    catch(error){
        console.log('Error connecting to MongoDB:', error)
    }
}

module.exports = connectDB