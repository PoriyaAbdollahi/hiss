const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {type:String , required:true }, 
    email: {type:String , required:true } ,
    password: {type:String , required:true }, 
    picture: {type:String , required:true ,default:"https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?b=1&k=20&m=517998264&s=170667a&w=0&h=CZ2MbiNDGXBTjFKA2Qd4Ly0FXIUkckBLhamwcUJaHG4="} 
},
    { timestamps: true }

)
const User = mongoose.model("User", userSchema)
module.exports = User