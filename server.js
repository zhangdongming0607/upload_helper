/**
 * Created by zhangdongming on 16-9-14.
 */
var express=require('express');
var path=require('path');
var app=express();
var fs=require('fs');
var multer=require('multer');
var fs=require('fs');
app.use(express.static(__dirname));
app.get('/',function (req,res) {
    res.sendfile(path.resolve("demo.html"));
});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname  + '-' + Date.now()+'.'+file.mimetype.split('/')[1]);
    }
});
var upload = multer({ storage: storage });
app.post('/upload',upload.single('fileTest'),function (req,res) {
    console.log(req.file);
    // fs.write('upload/')
    res.send('ok');
});
app.listen(3000);