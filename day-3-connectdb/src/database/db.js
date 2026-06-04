const mongoose = require('mongoose');



  async function connectDB(){
      await mongoose.connect('mongodb+srv://kamini9926_db_user:6PNDDjzmZ1po9mks@backendlearning.9k7fru1.mongodb.net/')
        console.log('Connected to MongoDB');
}

module.exports= connectDB;