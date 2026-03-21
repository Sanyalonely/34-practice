const {Schema, model} = require('mongoose')

const trashSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    content: {type: String, required: true},
    createdAt: {type: Date},
    updatedAt: {type: Date}
})

module.exports = model('Trash', trashSchema)