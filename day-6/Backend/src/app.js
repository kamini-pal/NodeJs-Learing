const express = require('express');
const multer = require('multer');
const uploadImage = require('./services/storage.service');
const PostModel = require('./model/post.model');
const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({storage:multer.memoryStorage()});

// create new post

app.post('/posts', upload.single('image'),  async (req, res) => {
    console.log(req.body);
    console.log(req.file);

    const result = await uploadImage(req.file.buffer);

    const newPost = await PostModel.create({
        image : result.url,
        caption : req.body.caption
    });

    return res.status(201).json({
        message : "Post created successfully",
        post : newPost
    });


});


//get image from imagekit

app.get('/posts', async (req, res) => {

    const posts = await PostModel.find();
    
    return res.status(200).json({
        message : "Posts fetched successfully",
        posts
    });
});

module.exports = app;