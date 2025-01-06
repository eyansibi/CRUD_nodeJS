const Batiment = require("../models/batiment.model");

const getBatiments = async (req, res) => {
  try {
    const b = await Batiment.find({});
    res.status(200).json(b);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBatiment = async (req, res) => {
  try {
    const { id } = req.params;
    const b = await Batiment.findById(id);
    res.status(200).json(b);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createBatiment = async (req, res) => {
  try {
    const b = await Batiment.create(req.body);
    res.status(200).json(b);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBatiment = async (req, res) => {
  try {
    const { id } = req.params;

    const b = await Batiment.findByIdAndUpdate(id, req.body);

    if (!b) {
      return res.status(404).json({ message: "batiment not found" });
    }

    const updatedBatiment = await Batiment.findById(id);
    res.status(200).json(updatedBatiment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBatiment= async (req, res) => {
  try {
    const { id } = req.params;

    const b = await Batiment.findByIdAndDelete(id);

    if (!b) {
      return res.status(404).json({ message: "batiment not found" });
    }

    res.status(200).json({ message: "batiment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
async function calculBatiemnt(req, res, next) {
  try {
    const data = await Batiment.find();
    let i = 0;
    data.forEach((element) => {
      console.log(element.nbr_niveau >= 5);
      if (element.nbr_niveau >= 5 && element.adresse == "gabes") i++;
    });
    return i;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getBatiments,
  getBatiment,
  createBatiment,
  updateBatiment,
  deleteBatiment,
  calculBatiemnt
};