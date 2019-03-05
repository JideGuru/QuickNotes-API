const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true},
    content: { type: String, required: true},
});

module.exports = mongoose.model('Note', noteSchema);