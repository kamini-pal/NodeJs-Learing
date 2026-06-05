
console.log("APP FILE LOADED");
const express = require('express');
const notemodel = require('./module/note.module');

const app = express();


app.use(express.json());

//create a note route
 
app.post('/notes' , async (req,res) =>{
    const data = req.body;

      await notemodel.create({
        title : data.title,
        description : data.description
    });

    res.status(201).json({
        message : 'Note created successfully'
    })
})



//get all notes route

app.get('/notes' , async (req,res) =>{
    const notes = await notemodel.find();

    console.log(notes);
    res.status(200).json({
        message : 'Notes fetched successfully',
        notes : notes
    })
})

app.use((req, res) => {
    console.log("REQUEST RECEIVED:", req.method, req.url);
    res.status(404).send("Route not found");
});

//update a note route

app.patch('/notes/:id' , async (req,res) =>{
    const id = req.params.id;
    const title = req.body.title;

    await notemodel.findOneAndUpdate(
        { _id: id },
        { title: title }
    );

    res.status(200).json({
        message : 'Note updated successfully'
    })
})

//delete a note route

app.delete('/notes/:id' , async (req,res) =>{
    const id = req.params.id;

    await notemodel.findOneAndDelete(
        { _id: id }
    );

    res.status(200).json({
        message : 'Note deleted successfully'
    })
})

module.exports = app;
