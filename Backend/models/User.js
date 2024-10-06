const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{type:String , required: true},
    email:{type: String , required: true , unique:true , match:[ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please valid email']},
    password:{type: String , required: true},
    role: {type: String , enum:['admin' , 'seller' , 'buyer'],required:true}
},{
    versionKey:false
});

const UserModel = mongoose.model('User' , UserSchema);

module.exports = UserModel

