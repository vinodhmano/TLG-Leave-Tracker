const mongoose = require('mongoose')

const User = mongoose.model('Users', {
    id: {
        type: Number,
        required: true
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    supervisor: {
        type: String
    }
    
})

module.exports = User