const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    from: [{ type: String, required: true }],
    to: [{ type: String, required: true }],
    date: { type: String },
    nb: { type: Number,default : 0 },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, { timestamps: true })

module.exports = mongoose.model('Newsletter', schema);