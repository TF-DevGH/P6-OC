const express = require('express');
const router = express.Router();
const multer = require('../config/multer-config');

const authMiddleware = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce'); // Utiliser un nom plus approprié, comme "sauceCtrl"
const auth = require('../middleware/auth');

// Assurez-vous que le chemin statique est correct
router.use('/images', express.static('backend/images'));

router.get('/', authMiddleware, auth, sauceCtrl.getAllSauces);

// Utilisez multer.single('image') ici pour la route POST
router.post('/', authMiddleware, auth, multer, sauceCtrl.createSauce);

router.get('/:id', authMiddleware, auth, sauceCtrl.getOneSauce);

// Utilisez multer.single('image') ici pour la route PUT
router.put('/:id', authMiddleware, auth, multer, sauceCtrl.modifySauce);

router.delete('/:id', authMiddleware, auth, sauceCtrl.deleteSauce);

// Exemple de route pour le like
router.post('/:id/like', authMiddleware, auth, sauceCtrl.likeSauce);

module.exports = router;
