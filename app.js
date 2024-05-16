require('dotenv').config();  // S'assurer du changement des variables d'environnements dans la premiere ligne  OK OK OK 
const express = require('express');
const cors = require('cors');
const { connectdb } = require('./services/mongoose');
const userRoutes = require('./routes/user');
const reunionRoutes = require('./routes/reunionRoutes'); // Assurez-vous que le chemin est correct
const projetRoutes = require('./routes/projet'); // Mise à jour du nom de fichier de route
const equipeRoutes = require('./routes/equipe');
const problemRoutes = require('./routes/problems');
const actionRoutes = require('./routes/action'); // Mise à jour pour importer les routes des actions
const problemController = require('./controllers/problemController'); // Import du contrôleur problemController
const bodyParser = require('body-parser');
const multer = require('multer'); // Import de multer pour la gestion des fichiers
const userController = require('./controllers/userController'); 
const Problem = require('./models/Problem');

const app = express();
const port = process.env.PORT || 5005;
console.log('DB URI:', process.env.DB_URI);

app.use(express.json());
app.use(cors());
// Pour les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api', actionRoutes); 
app.use('/', reunionRoutes);
app.use('/api', reunionRoutes);
app.use(projetRoutes); 
app.use('/api', projetRoutes); 
app.use('/api/projets', projetRoutes); 
app.use('/api/equipes', equipeRoutes);
app.use('/api/problems', problemRoutes)
app.post('/projets/commenter', problemController.commenterProblem);
app.post('/affecter-tache', problemController.affecterTacheAUtilisateur);
app.use('/problems', problemRoutes);

// Ajouter une route pour la racine qui renvoie un message
app.get('/', (req, res) => {
    res.send('Voici le backend avec Node.js');
});

(async () => {
    try {
        await connectdb();
        console.log('Connected to database');

        app.listen(port, '0.0.0.0', () => {
            console.log(`Le serveur est lancé à : http://localhost:${port}`);
        });
