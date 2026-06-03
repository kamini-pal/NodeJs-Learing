const express = require('express');


const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

const notes = [];

// Route to create a new note
app.post('/notes', (req, res) => {
    const note = req.body;
   
    notes.push(note);
    res.status(201).json({
        message: 'Note created successfully',
    });
});

// Route to get all notes
app.get('/notes', (req, res) => {
    res.status(200).json({
        message: 'Notes retrieved successfully',
        data: notes,
    });
});


//delete a note
app.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
   delete notes[noteId];
    res.status(200).json({
        message: 'Note deleted successfully',
    });
});

//update a note

app.patch('/notes/:id', (req, res) => {
    const noteId = req.params.id;

    const discription = req.body.description;

    notes[noteId].description = discription;
    res.status(200).json({
        message: 'Note updated successfully',
    });
});

module.exports = app;