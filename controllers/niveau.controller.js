const Batiment = require("../models/batiment.model");
const Niveau = require("../models/niveau.model");



const getNiveau = async (req, res) => {
    try {
      const n = await Niveau.find({});
      res.status(200).json(n);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  const getNiveaubyid = async (req, res) => {
    try {
      const { id } = req.params;
      const n = await Niveau.findById(id);
      res.status(200).json(n);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
const createNiveau = async (req, res) => {
    try {
      const n = await Niveau.create(req.body);
      res.status(200).json(n);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
const construction = async (req, res) => {
    const { id } = req.params; // ID du niveau

    try {
        // Vérifier si le niveau existe
        const niveau = await Niveau.findById(id);
        if (!niveau) {
            return res.status(404).json({ message: "Niveau non trouvé !" });
        }

        // Si le niveau est déjà construit
        if (niveau.etat_construction) {
            return res.status(400).json({ message: "Le niveau est déjà construit." });
        }

        // Récupérer le bâtiment associé
        const batiment = await Batiment.findById(niveau.id_batiment);
        if (!batiment) {
            return res.status(404).json({ message: "Bâtiment associé non trouvé !" });
        }

        // Mettre à jour l'état du niveau
        niveau.etat_construction = true;
        await niveau.save();

        // Mettre à jour le nombre de niveaux du bâtiment
        batiment.nbr_niveau += 1;
        await batiment.save();

        res.status(200).json({
            message: "Construction réalisée avec succès !",
            niveau,
            batiment
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNiveau,getNiveaubyid,createNiveau,construction };