var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

//请求列表数据
router.get('/list', function(req, res, next) {
    fs.readFile(path.join(__dirname,'../json/img.json'),function(err,date){
       if(err){
         console.log(err);
         return;
       }
       res.send(date);
    })
});

//图书详情的
router.get('/book', function(req, res, next) {
    fs.readFile(path.join(__dirname,'../json/book.json'),function(err,date){
       if(err){
         console.log(err);
         //需要具体逻辑支持
         return;
       }

       //模拟查询图书详情的功能
       console.log(Buffer.isEncoding(date));
       //console.log(JSON.parse(date.toString())[0]);
       var obj = {};
       obj.success = true;
       obj.bookContent = JSON.parse(date.toString())[0]
       res.send(obj);
    })
});



module.exports = router;
