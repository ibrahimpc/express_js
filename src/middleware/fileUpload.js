const multer = require('multer');
const path = require('path');
const util = require('util')


const storage=multer.diskStorage({
    destination:'uploads/',
    filename:function (req,file,cb){
        cb(null,file.fieldname + '_' + Date.now()+path.extname(file.originalname));
    },
})

function checkFileType(file,cb){
    //allowed file extensions
    const fileTypes=/jpeg|jpg|png|gif|mp4|mov/;
    const extName= fileTypes.test(path.extname(file.originalname).toLowerCase());

    const mimeType= fileTypes.test(file.mimetype);
    if(extName && mimeType){
        return cb(null,true);
    }else{
        cb('Error: Images can only be a format of(jpeg,jpg,png,gif,mp4,mov)')
    }
}

const upload =multer({
    storage:storage,
    // limits:{fileSize:1024*1024*2},   //max 2 mb file limit only upload
    fileFilter:function (req,file,cb){
        checkFileType(file,cb);
    }
}).array('file',5); //allow only 5 images at a time

const applyMiddleWare=util.promisify(upload)
module.exports=applyMiddleWare



