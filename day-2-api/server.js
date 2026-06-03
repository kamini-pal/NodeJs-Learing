const app = reqiure('./src/app');


const PORT = 3000;

app.listen(PORT, (req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})