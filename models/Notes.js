const mongoose = require('mongoose');
const { Schema } = mongoose
const NotesSchema = new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },//knsa user ka hai pta chl paye like a forgn key
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,

        },
        tag: {
            type: String

        },
        date: {
            type: Date,
            default: Date.now
        }
    }, { freezeTableName: true }
)
module.exports = mongoose.model('Notes', NotesSchema);