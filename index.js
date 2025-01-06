const express = require('express');
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socketIO = require("socket.io");

// Import des routes
const batimentRoute = require("./routes/batiment.route");
const niveauRoute = require("./routes/niveau.route");
const {getNiveau,
    construction
  } = require("./controllers/niveau.controller");
  const{calculBatiemnt}=require("./controllers/batiment.controller")
// Initialisation de l'application Express
const app = express();

// Configuration du moteur de rendu Twig
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

// Middleware pour analyser les requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/batiment", batimentRoute);
app.use("/niveau", niveauRoute);

// Création d'un serveur HTTP
const server = http.createServer(app);

// Configuration de Socket.IO
const io = socketIO(server);

// Fonction pour récupérer tous les niveaux (à personnaliser selon votre modèle)
const getAllNiveau = async () => {
  const Niveau = require("./models/niveau.model"); // Assurez-vous que ce modèle existe
  return await Niveau.find({});
};

// Gestion des connexions Socket.IO
io.on("connection", async (socket) => {
  console.log("Un utilisateur est connecté");

  // Émission d'un message de bienvenue
  socket.emit("msg", "Utilisateur connecté au serveur Socket.IO");

  // Récupération et envoi des données de tous les niveaux
  try {
    const niveaux = await getAllNiveau();
    socket.emit("msg", JSON.stringify(niveaux));
  } catch (error) {
    console.error("Erreur lors de la récupération des niveaux :", error.message);
    socket.emit("msg", "Erreur lors de la récupération des données des niveaux.");
  }


  socket.on("construire", async (data) => {
    console.log("Demande de construction pour le niveau ID :", data);

    try {
      // Simuler un objet `req` et `res`
      const req = { params: { id: data } };
      const res = {
        status: (code) => ({
          json: (response) => {
            console.log(`Construction terminée avec le statut ${code} :`, response);
            socket.emit("msg", response.message || "Erreur inconnue.");
          },
        }),
      };

      // Appeler la fonction `construction`
      await construction(req, res);

      // Récupérer les niveaux mis à jour
      const niveauxMisAJour = await getAllNiveau();
      socket.emit("msg", JSON.stringify(niveauxMisAJour));
    } catch (error) {
      console.error("Erreur lors de la construction :", error.message);
      socket.emit("msg", "Erreur interne lors de la construction.");
    }
  });

  socket.on("calcul", async (data) => {
    const c = await calculBatiemnt();
    console.log("jjjjjj", "la somme des niveaux est :" + JSON.stringify(c));
    io.emit("msg", "la somme des niveaux est :" + JSON.stringify(c));
  });
  // Gestion de la déconnexion
  socket.on("disconnect", () => {
    console.log("Un utilisateur s'est déconnecté");
  });

  

});

// Connexion à la base de données MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/examBatiment", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connexion à la base de données réussie !");
    // Démarrage du serveur HTTP
    server.listen(3030, () => {
      console.log("Le serveur est en cours d'exécution sur le port 3030");
    });
  })
  .catch((error) => {
    console.error("Échec de la connexion à la base de données :", error.message);
    process.exit(1); // Arrête le processus si la connexion échoue
  });
