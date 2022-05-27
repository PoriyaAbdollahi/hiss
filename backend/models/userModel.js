const mongoose = require('mongoose')
const bcyrpt = require("bcryptjs")
const userSchema = mongoose.Schema({
    name: {type:String , required:true }, 
    email: { type: String, required: true ,unique:true } ,
    password: {type:String , required:true }, 
    picture: {type:String ,required:true,default:"https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?b=1&k=20&m=517998264&s=170667a&w=0&h=CZ2MbiNDGXBTjFKA2Qd4Ly0FXIUkckBLhamwcUJaHG4=" } 
},
    { timestamps: true }

)

userSchema.methods.matchPassword = async function(enteredPassword){
    console.log(this.password)
    return await bcyrpt.compare(enteredPassword, this.password)
}

userSchema.pre("save", async function(next){ 
    if (!this.isModified) { 
        next()
    }
    const salt = await bcyrpt.genSalt(10)
    this.password = await bcyrpt.hash(this.password, salt)
})
const User = mongoose.model("User", userSchema)
module.exports = User