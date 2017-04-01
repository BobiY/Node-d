const express = require('express');
const router = express.Router();

//这个数组储存注册过的用户名和密码
const users = [{name:"11",pass:'123456'}];


//用户注册
router.get('/register', function(req, res, next) {
    var name = req.query.name;
    var pass = req.query.pass;
    console.log('注册的用户名：',name)
    console.log('注册密码：',pass);

    //验证用户名密码不能为空
    if( !name && !pass){  
        res.send({success:false,msg:"用户名或者密码不能为空"});   
    }else{
        var user = users.filter( val =>{  
            return val.name === name
        });

        //用户名不能被重复使用
        if(user.length !==0 ){
            res.send({success:false,msg:"此用户名已存在"});   
        }else{
            var userObj = {
                name,pass
            }
            users.push(userObj);
            res.send({success:true,msg:"注册成功"});
        }
    }
    
});

//用户登录
router.get('/login',function(req, res, next){
    //获取用户的登录信息
    var userName = req.query.name;
    var userPass = req.query.pass;
    console.log('登录的用户名：',userName)
    console.log('登录密码：',userPass);
    var user = users.filter( val => userName === val.name && userPass === val.pass );

    //判断用户名和密码是否正确
    if( !userName && !userPass ){
       res.send({success:false,msg:"用户名或者密码不能为空"});   
    } else if( user.length !==0 ){
        res.send({success:true,msg:"登录成功"});
    }else{
         var userIndex = 0;
        //若登录不成功，检查是什么错误导致的
        var voidUser = users.filter( (val,index) => {
            if(userName === val.name){
                userIndex = index;
                return true; 
            }
        } )
        if(voidUser.length ===0 ){
            res.send({success:false,msg:"用户名不存在，请核查后重新输入"});
        } else if(users[userIndex].pass !== userPass  ){
            res.send({success:false,msg:"密码错误，请核查后重新输入"});            
        }
        
    }
})

module.exports = router;