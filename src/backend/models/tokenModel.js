const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    device: {type: String, required: true},
    refresh: {type: String, required: true}
})

module.exports = model('Token', TokenSchema)