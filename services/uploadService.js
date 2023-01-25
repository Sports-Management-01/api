const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1])
    }
})
const uploadFilter = (allowedTypes = '') => {
    return (req, file, cb) => {
        let acceptedMimetypes = []
        switch (allowedTypes) {
            case 'image':
                acceptedMimetypes = [
                    'image/png',
                    'image/jpg',
                    'image/jpeg',
                ]
                break;
            case 'document':
                acceptedMimetypes = [
                    'application/msword',
                    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    'application/pdf'
                ]
                break
            default:
                acceptedMimetypes = allowedTypes
        }

        if (acceptedMimetypes.indexOf(file.mimetype) > -1) {
            cb(null, true)
        } else {
            cb(null, false)
        }
    }
}

module.exports = {
    storage,
    uploadFilter
}