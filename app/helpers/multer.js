const multer = require('multer');

const upload_pp = multer({
    dest : 'app/profile-picture',
    limit : {
        fileSize : 1000000, 
    },
    fileFilter(req,file,callback) {
        if(!file.originalname.match(/\.(jpeg)$/)) {
            return callback(new Error('please upload a jpg image'));
        }
        callback(undefined,true);
    }
});

const upload_cp = multer({
    dest : 'app/cover-picture',
    limit : {
        fileSize : 1000000,
    },
    fileFilter(req,file,callback) {
        if(!file.originalname.match(/\.(jpeg)$/)) {
            return callback(new Error('please upload a jpg image'));
        }
        callback(undefined,true);
    }
});


module.exports = {
    pp : upload_pp,
    cp : upload_cp
}