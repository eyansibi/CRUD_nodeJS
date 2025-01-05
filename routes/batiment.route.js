const express = require("express");
const Batiment = require("../models/batiment.model.js");
const router = express.Router();
const {getBatiments,
    getBatiment,
    createBatiment,
    updateBatiment,
    deleteBatiment,} = require('../controllers/batiment.controller.js');
    
    router.get("/afficheNiveau", (req, res, next) => {
        res.render("afficheNiveau");
      });
    
//get all products
router.get('/', getBatiments);
//get product by id
router.get("/:id", getBatiment);
//add product 
router.post("/", createBatiment);
// update a product
router.put("/:id", updateBatiment);
// delete a product
router.delete("/:id", deleteBatiment);

module.exports = router;