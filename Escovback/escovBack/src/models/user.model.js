const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const schema = new Schema({
    id: { type: String, required: false },
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    contact: { type: String, required: false },
    publication: [{
        type: Schema.Types.ObjectId,
        ref: "Publications"
    }],
 
    newsletter: {
        type: Schema.Types.ObjectId,
        ref: "Newsletter",
    },
    verified: {
        type: Boolean,
        default: false,
      }

}, { timestamps: true })

module.exports = mongoose.model('User', schema);