const mongoose = require('mongoose')

const Leave = mongoose.model('Leaves', {
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String
    },
    numberOfBusinessDays: {
        type: Number
    },
    numberOfHours: {
        type: Number
    },
    leaveType: {
        type: String
    },
    approvedStatus: {
        type: String
    },
    appliedInESA: {
        type: String
    }
    
})

module.exports = Leave