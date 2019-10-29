let mongoose = require('mongoose')


let Schema = mongoose.Schema

//Define Schema
let MudFileSchema = new Schema({
    user_name: {
        type: String
    },
    file_name : {
        type: String,
        required: [true, 'The file must have a name!']
    },

    source_file: {
        type: Buffer,
        contentType: String
    }
})

//Compile model from schema
module.exports = mongoose.model('mudFileModel', MudFileSchema)
