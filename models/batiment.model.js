const mongoose = require("mongoose");

const Batimenchema = mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "Please enter batiment name"],
    },

    nbr_niveau: {
      type: Number,
      required: true,
      default: 0,
    },

    description: {
      type: String,
      required:[true, "Please enter description"],
    },

    adresse: {
      type: String,
      required: false,
    },
  }
  
);


const Batiment = mongoose.model("Batiment", Batimenchema);

module.exports = Batiment;