const express = require("express");
const {getNiveau,getNiveaubyid,createNiveau,construction } = require('../controllers/niveau.controller.js');

const router = express.Router();

router.get('/', getNiveau);
router.get('/:id', getNiveaubyid);

router.post('/', createNiveau);
router.put("/:id/construction", construction);


module.exports = router;