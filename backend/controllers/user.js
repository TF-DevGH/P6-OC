const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Fonction de hachage du mot de passe
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};

// Fonction d'ajout d'utilisateur à la base de données
const addUserToDatabase = async (email, hashedPassword) => {
    try {
        const user = new User({
            email: email,
            password: hashedPassword
        });
        await user.save();
        return { success: true, message: 'Utilisateur créé !' };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Fonction de vérification des informations d'identification
const verifyUserCredentials = async (email, password) => {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return { success: false, error: 'Utilisateur non trouvé !' };
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return { success: false, error: 'Mot de passe incorrect !' };
        }
        return { success: true, userId: user._id };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// Fonction de génération de token
const generateToken = (userId) => {
    return jwt.sign({ userId: userId }, `${process.env.TOKEN}`, { expiresIn: '24h' });
};

// Fonction d'inscription
const signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        const result = await addUserToDatabase(email, hashedPassword);
        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

// Fonction de connexion
const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await verifyUserCredentials(email, password);
    if (result.success) {
        const token = generateToken(result.userId);
        res.status(200).json({ userId: result.userId, token: token });
    } else {
        res.status(401).json({ error: result.error });
    }
};

module.exports = {
    hashPassword,
    addUserToDatabase,
    verifyUserCredentials,
    generateToken,
    signup,
    login,
};
