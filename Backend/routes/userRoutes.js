const express = require('express');
const UserModel = require('../models/User');
const bcrypt = require('bcrypt')
const user = express.Router();
const jwt = require('jsonwebtoken')

user.get('/' , (req,res)=>{
    res.send('Welcome in user routes')
});

user.post("/signup" , async (req,res)=>{
    try {
        const {username , email , password , role} = req.body;

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = new UserModel({username , email , password:hashedPassword , role});
        await user.save();

        res.status(201).json({msg:'User Signup successfully',user})
        
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
});

user.post('/login' , async (req,res)=>{
    try {
        const {email , password} = req.body;

        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(401).json({msg:'User is not found , Please signup firstly'})
        };

        const validPassword = await bcrypt.compare(password , user.password);

        if(!validPassword){
            return res.status(401).json({msg:'password is not correct'})
        }

        const token = jwt.sign({user:{_id:user.id , role:user.role}} , process.env.JWT_SECRET_KEY , {expiresIn: '1h'});

        res.status(201).json({msg:`${user.username} logged in successfully`,token})
    } catch (error) {
        res.status(501).json({msg:error.message})
    }
})













module.exports = user