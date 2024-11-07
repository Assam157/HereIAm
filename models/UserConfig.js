const mongoose=require("mongoose")
const MongoDb=require("../config/mongoose1")

const Item1=new mongoose.Schema({
    username:
    [
        type=String,
        require=true,
        unique=true 
    ],
    password:
    [
        type=String,
        require=true,
        unique=true
    ],
    recoveryPhoneNo:[
        type=String,
        rquire=true,
    ]
})

const User=mongoose.model("User",Item1)

module.exports=User;