const app = require('./src/app');

const connectDB = require('./src/databse/db');

connectDB();

const PORT =  3000;
app.listen(PORT , () =>{
    console.log(`Server is running on port ${PORT}`);
})
