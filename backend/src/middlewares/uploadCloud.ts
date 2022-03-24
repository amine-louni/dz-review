const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'algerian-review',
    },
});

const uploadCloud = multer({ storage: storage }).single('file');

export default uploadCloud