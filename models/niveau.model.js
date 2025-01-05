const mongoose = require("mongoose");

const NiveauSchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Please enter niveau name"],
    },

    nbr_chambre: {
      type: Number,
      default: 0,
    },

    etat_construction: {
      type: Boolean,
      required: true,
      default: false,

    },

    id_batiment: {
      type: String,
      required: false,
    },
  }
);


const Niveau = mongoose.model("Niveau", NiveauSchema);

module.exports = Niveau;