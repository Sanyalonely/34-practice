const {Schema, model} = require('mongoose')

const NoteSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    content: {type: String, required: true},
    isPinned: {type: Boolean, default: false}
}, { 
    timestamps: true
})

module.exports = model('Note', NoteSchema)