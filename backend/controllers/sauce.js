const { json } = require('body-parser');
const Sauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  delete sauceObject._userId;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(420).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      res.status(200).json(sauce);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
{
        Sauce.updateOne(
          { _id: req.params.id },
          {
            ...sauceObject,
            _id: req.params.id,
          }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({
        error,
      });
    });
};

exports.deleteSauce = (req, res, next) => {
  Sauce.deleteOne({ _id: req.params.id })
    .then(() => {
      //Supprimer l'image.
      res.status(200).json({
        message: 'Deleted!',
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.likeSauce = (req, res, next) => {
  const sauceId = req.params.id;
  const userId = req.body.userId;
  const like = req.body.like;

  Sauce.findOne({ _id: sauceId })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ error: 'Sauce not found' });
      }

      const indexLiked = sauce.usersLiked.indexOf(userId);
      const indexDisliked = sauce.usersDisliked.indexOf(userId);

      if (like === 1) {
        // User likes the sauce
        if (indexLiked === -1) {
          sauce.usersLiked.push(userId);
        }

        // Remove user from dislikes if previously disliked
        if (indexDisliked !== -1) {
          sauce.usersDisliked.splice(indexDisliked, 1);
        }
      } else if (like === -1) {
        // User dislikes the sauce
        if (indexDisliked === -1) {
          sauce.usersDisliked.push(userId);
        }

        // Remove user from likes if previously liked
        if (indexLiked !== -1) {
          sauce.usersLiked.splice(indexLiked, 1);
        }
      } else if (like === 0) {
        // User removes like or dislike
        if (indexLiked !== -1) {
          sauce.usersLiked.splice(indexLiked, 1);
        } else if (indexDisliked !== -1) {
          sauce.usersDisliked.splice(indexDisliked, 1);
        }
      } else {
        return res.status(400).json({ error: 'Invalid like value' });
      }

      sauce.likes = sauce.usersLiked.length;
      sauce.dislikes = sauce.usersDisliked.length;

      sauce
        .save()
        .then(() => res.status(200).json({ message: 'Like updated successfully' }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) =>
     res.status(500).json({ error }));
};
