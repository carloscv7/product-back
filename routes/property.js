const express = require('express');
const router = express.Router();

const Property = require("../models/Property")
const {veryToken} = require("../utils/auth");

router.post("/", veryToken, (req, res, next) => {
    const {_id: _owner} = req.user;

    Property.create({...req.body, _owner})
        .then((property)=>{
            res.status(201).json({result: property});
        })
        .catch(e=>{
            res.status(400).json({msg: "Algo salio mal", e});
        });
});

/* GET property page. */
router.get('/', veryToken, (req, res, next) => {
    Property.find(req.query)
        .populate("_owner", "email name profile_picture")
        .then((properties) =>{
            res.status(200).json({result:properties});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e});
        });
});

router.get('/:id', veryToken, (req, res, next) => {
    const {id} = req.params;

    Property.findById(id)
        .then((property) =>{
            res.status(200).json({result:property});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e});
        });
});

router.patch("/:id", veryToken, (req, res, next) =>{
    const {id} = req.params;
    Property.findByIdAndUpdate(id, req.body, {new:true})
        .then((property) =>{
            res.status(200).json({result: property});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e})
        });
});

router.delete("/:id", veryToken, (req, res, next) =>{
    const {id} = req.params;
    Property.findByIdAndRemove(id)
        .then((property) =>{
            res.status(200).json({msg: "Se borro la propiedad",
            result: property});
        })
        .catch(e=>{
            res.status(400).json({msg:"Algo salio mal", e})
        });
});


module.exports = router;