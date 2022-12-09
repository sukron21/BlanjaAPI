const multer = require('multer');
const path = require('path');

const currentDate = new Date();
const dateTime = currentDate.getDate() + '' + (currentDate.getMonth()+1) + '' + currentDate.getFullYear();
const timestamp = currentDate.getHours() + '' + currentDate.getMinutes() + '' + currentDate.getSeconds() + '' + currentDate.getMilliseconds();

const multerUpload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {[
            cb(null, './public')
        ]},
        filename: (req, file, cb) => {
            const name = path.basename(file.originalname);
            const ext = path.extname(file.originalname);
            const nameSplit = name.split(`${ext}`);

            const fileName = nameSplit[0] + '-' + dateTime + timestamp + ext;
            cb(null, fileName);
        }
    }),
    
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);

        if(ext === '.jpg' || ext === '.png' || ext === '.jpeg' || ext === '.jfif'){
            cb(null, true);
        }else{
            const error = {
                message: 'File type is not supported'
            }
            cb(error, false);
        }
    }
})

module.exports = {
    uploadPhoto: (req, res, next) => {
        const multerSingle = multerUpload.single('photo');
        multerSingle(req, res, (err) => {
            if(err){
                res.json({
                    message: 'upload product photo failed bor',
                    error: err
                })
                console.log(err);
            }else{
                next();
            }
        })
    },

    uploadPhotouser: (req, res, next) => {
        const multerSingle = multerUpload.single('image');
        multerSingle(req, res, (err) => {
            if(err){
                res.json({
                    message: 'upload user image failed',
                    error: err
                })
                console.log(err);
            }else{
                next();
            }
        })
    },

}