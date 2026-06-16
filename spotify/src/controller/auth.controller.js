const UserModel = require('../model/user.schema');
const jwt = require('jsonwebtoken');

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

    const user = await UserModel.create({ username, email, password, role });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

    res.cookie('token', token);

    return res.status(201).json({
        message: 'User registered successfully',
        token
    });
}

module.exports = {
    register
};