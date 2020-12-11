const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const Reservation = require("../models/Reservation")
const {veryToken} = require("../utils/auth");

router.get('/', veryToken, (req, res, next) => {
    const {_id} = req.user;
    Reservation.find({_guest: _id})
        .populate({ // <---- agegar todo este para hacer un populate aninado
            path:"property",
            populate:{
                path:"_owner",
                select: "name",
            },
        }) //<----- Populate
        .then((reservation) =>{
            res.status(200).json({result:reservation});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e});
        });
});

router.get('/property/:property_id', veryToken, (req, res, next) => {
    const {property_id} = req.params;
    Reservation.find({property: property_id})
        .populate("_guest","name")
        .then((reservation) =>{
            res.status(200).json({result:reservation});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e});
        });
});

router.post("/", veryToken, (req, res, next) =>{
    const {_id: _guest} = req.user;
    const reservation = {...req.body, _guest};

    Reservation.create(reservation)
        .then((reservation) => {
            res.status(200).json({result:reservation});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e});
        });
});

router.patch("/:id", veryToken, (req, res, next) =>{
    const {id} = req.params;
    Reservation.findByIdAndUpdate(id, req.body, {new:true})
        .then((reservation) =>{
            res.status(200).json({result: reservation});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e})
        });
});

router.delete("/:id", veryToken, (req, res, next) =>{
    const {id} = req.params;
    Reservation.findByIdAndDelete(id)
        .then((reservation) =>{
            res.status(200).json({msg: "Se borro la reservación",
            result: reservation});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e})
        });
});

module.exports = router;