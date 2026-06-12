const express = require('express');
const userModel = require('../model/user.model');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    const { userName, email, password } = req.body;

    const userAlreadyExist = await userModel.findOne({ email });

    if(userAlreadyExist) {
        return res.status(409).json({
            message : "User already exist"
        })
    }
    const user = await userModel.create({userName, email, password});

    const token = jwt.sign({id : user._id}, process.env.SECRET_KEY );

    res.cookie("token", token);

    res.status(201).json({
        message : "User registered successfully",
    
        user
    })
}



module.exports = { register };