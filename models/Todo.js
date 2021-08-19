const {Schema, model} = require('mongoose') //Require mongoose objects

const schema = new Schema({
    title:{
        type: String,
        default: false
    },
    completed:{
        type: Boolean,
        default:false
    }
})

module.exports = model('crudmen', schema)