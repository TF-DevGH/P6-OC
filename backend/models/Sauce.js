const mongoose = require('mongoose');

/*Schéma de données avec toutes les informations dont nos objets auront besoin
(La méthode "Schema" de Mongoose vous permet de créer un schéma de données pour votre base de données MongoDB.) :                                                                                                   */

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

//Exportation du modèle (La méthode "model" transforme ce modèle en un modèle utilisable.):
module.exports = mongoose.model('Sauce', sauceSchema);

/* 
Ce modèle permet non seulement d'appliquer notre structure de données,
mais aussi de simplifier les opérations de lecture et d'écriture dans la base de données.
*/