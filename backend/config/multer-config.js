const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/heic': 'heic',
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name.split('.')[0] + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');

/* ANCIENNE VERSION A COMPARER :
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'backend/images'); // Assurez-vous que le chemin est correct
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = file.mimetype.split('/')[1];
    callback(null, name + Date.now() + '.' + extension);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype.startsWith('image/')) {
    callback(null, true);
  } else {
    callback(new Error('Seuls les fichiers image sont autorisés !'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
*/