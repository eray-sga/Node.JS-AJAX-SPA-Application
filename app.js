const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const yerlerRoutes = require('./routes/yerler')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static(__dirname + '/public/css/'))
app.use(express.static(__dirname + '/public/js/'))
app.use(express.static(__dirname + '/public/assets/'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/spa/anaSayfa.html'))
})

app.use('/api/yerler', yerlerRoutes)

app.listen(port, () => {
    console.log(`sunucu ${port} portunda ayaklandı`);
})