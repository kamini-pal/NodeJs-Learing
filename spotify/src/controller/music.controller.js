const musicModel = require('../model/music.schema')
const jwt = require('jsonwebtoken')
const {uploadFile} = require('../service/strorage.service')


async function addMusic(req, res) {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }
    
     try{
         const decoded = jwt.verify(token,process.env.JWT_SECRET)

         if(decoded.role !== 'artist'){
            return res.status(403).json({message: 'Forbidden'})
         }
     
       const {title} = req.body;
       const file = req.file;

    //    const result = await uploadfile(file.buffer.toString('base64'))
       const result = await uploadFile(file.buffer.toString('base64'));

       const music = await musicModel.create({
        uri : result.url,
        title,
        artist:decoded.id
       })

       res.status(201).json({
        id : music._id,
        title : music.title,
        uri:music.uri,
        artist:music.artist
       })


        }


     catch (error) {
        // ✅ BONUS: Terminal me error log karein taaki debugging aasan ho
        console.error("Error in addMusic:", error); 
        
        return res.status(500).json({ 
            message: 'Internal Server Error', 
            error: error.message 
        })
    }


}

module.exports = {
    addMusic
}