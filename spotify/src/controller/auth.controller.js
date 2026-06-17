const UserModel = require('../model/user.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

async function register(req, res) {
    const { username, email, password, role = 'user' } = req.body;

    const userexist = await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(userexist){
        return res.status(400).json({message: 'User already exists'})
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
         username,
          email,
           password: hash,
            role });

    const token = jwt.sign({
         id: user._id,
          role: user.role },
           process.env.JWT_SECRET);

    res.cookie('token', token);

    return res.status(201).json({
        message: 'User registered successfully',
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}

async function loginuser(req,res){
    const { username, email, password } = req.body;

    const user = await UserModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    


if(!user){
    return res.status(400).json({message: 'Invalid credentials'})
}

const passwordMatch = await  bcrypt.compare(password , user.password)

if(!passwordMatch){
    return res.status(400).json({message: 'Invalid credentials'})
}

const token = jwt.sign({
    id: user._id,
    role: user.role
}, process.env.JWT_SECRET)

res.cookie('token', token)

return res.status(200).json({
    message: 'User logged in successfully',
    user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
    }
})

}

module.exports = {register, loginuser}