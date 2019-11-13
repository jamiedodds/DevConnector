const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    contactName: {
        type: String,
        required: true
    },
    contactAddress: {
        type: String
    },
    contactPhoneNumber: {
        type: String
    },
    contactEmail: {
        type: String
    }
});

module.exports = Contact = mongoose.model('contacts', ContactSchema);
