const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
        id: {
            type: Number,
            required: true
        },
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        supervisor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        tokens : [{
            token : {
                type: String
            }
        }]  
    }, {
        timestamps: true
    }
)

userSchema.methods.getAuthToken = async function(_id){
    const user = this
    const token = await jwt.sign({_id : user._id.toString() }, "mysecretkey", { expiresIn: "5 days" })
    user.tokens = user.tokens.concat( { token })
    await user.save()
    return token
}

userSchema.statics.findUserByEmpId = async (empId) =>{
    const user = User.findOne({ id : empId})
    if(!user) throw new Error ("User not found")
    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User