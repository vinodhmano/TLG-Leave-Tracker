const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    numberOfBusinessDays: {
        type: Number,
        required: true
    },
    leaveType: {
        type: String
    },
    approvedStatus: {
        type: String
    },
    appliedInESA: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Leave = mongoose.model('Leave', leaveSchema)

module.exports = Leave