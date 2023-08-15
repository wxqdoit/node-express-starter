const express = require('express')
const multiparty = require("multiparty");
const path = require("path");
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.json({limit:'5000mb'}));
app.use(bodyParser.urlencoded({limit:'5000mb',extended:true}));
// //
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//配置跨域请求
app.all('*', (req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    /*res.header("X-Powered-By",' 3.2.1');*/
    // res.header("Content-Type", "multipart/form-data; boundary");
    next();

});

let form = new multiparty.Form();//实例一个multiparty
form.uploadDir = path.resolve(__dirname,'./file');

app.post('/upload', function (req, res) {

    console.log('req::::')
    console.log(req.body)



    form.parse(req,  (err, fields, files)=> {//开始解析前台传过来的文件
        if(err){
            res.send({data:err})

        }else {
            console.log(err,fields, files)
            res.send({data:'111'})

            // let data_files = [];
            // for(let i = 0 ;i<files.img.length;i++){
            //     let obj = {};
            //     //记住centos下面 路径是/ 如/static/upload/
            //     obj.file_name ='/static/upload/'+files.img[i].path.split('upload\\')[1];
            //     obj.file_size = (files.img[i].size/1024).toFixed(2);
            //     obj.origin_name = files.img[i].originalFilename;
            //     obj.create_time = new Date().getTime();
            //     data_files.push(obj)
            // }
        }
    });
})

app.get('/getUser', function (req, res) {

    console.log('req::::')
    console.log(req.query)

    res.send({data:'wxq'})


})

app.listen(3001)