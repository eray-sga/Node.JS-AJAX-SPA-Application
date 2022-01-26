const express = require('express'),
router = express.Router(),
Yer = require('../models/yer')

//tüm verileri gönder
router.get('/', (req, res) => {
    Yer.find()
    .then((yerlerDB) => {
        res.json(yerlerDB)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})

//yeni yer ekleme
router.post('/', (req, res) => {
    console.log(req.body);
    Yer.create(req.body)
    .then((yeniYer) => {
        res.status(201).json(yeniYer)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})

//tekil verinin detayını getirme
router.get('/:yerID', (req, res) => {
    Yer.findById(req.params.yerID)
    .then((bulunanYer) => {
        res.json(bulunanYer)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})

//update route
router.put('/:yerID', (req, res) => {
    Yer.findByIdAndUpdate({_id:req.params.yerID}, req.body, {new:true})
    .then((yer) => {
        res.json(yer)
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})

//delete işlemi
router.delete('/:yerID', (req, res) => {
    Yer.remove({_id:req.params.yerID})
    .then(() => {
        res.json({
            message:"yer silindi"
        })
    })
    .catch((err) => {
        console.log(err);
        res.send(err)
    })
})

module.exports = router