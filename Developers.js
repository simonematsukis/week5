const mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        uppercase: true
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String
    }
});
module.exports = mongoose.model('developers', developerSchema);