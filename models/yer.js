const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/gezilecekYerler')
mongoose.set('debug', true)

mongoose.Promise = Promise


const yerSchema = new mongoose.Schema({
    isim: {
        type: String,
        required: true
    },
    ziyaret: {
        type: Boolean,
        default: false
    },
    olusturulmaTarihi: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Yer', yerSchema)