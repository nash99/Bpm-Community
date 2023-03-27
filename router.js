const express = require('express');
const passport = require('passport');
const router = express.Router();

const conexion = require('./database/db')

router.get('/',(req,res)=>{
    res.render('index')    
});

router.get('/edit',(req,res)=>{
    res.render('edit');
})

router.get('/about',(req,res)=>{
    res.render('about');
})


router.get('/community',(req,res,next)=>{
    if(req.isAuthenticated()) return next();
    
    res.redirect('/login');
} ,(req,res)=>{
    res.render('community')
    
});

router.get('/login',(req,res)=>{
    res.render('login');
})

router.post('/login',passport.authenticate('local',{
    successRedirect:'/',
    failureRedirect: '/login'
}));

router.get('/signup',(req,res)=>{
    res.render('signup');
})
router.post('/signup',(req,res)=>{
    let name = req.body.name;
    let lastname = req.body.lastname;
    let email = req.body.email;
    let password = req.body.password;
    console.log(name,lastname,email,password)

    conexion.query(`INSERT INTO datos (nombre)VALUES('${name}')`,(error,results) =>{
        if(error){
            throw error;
        }else{
            conexion.query('Select * from datos',(error,results) =>{
                if(error){
                    throw error;
                }else{
                    console.log(results)
                }
            })
        }
    })
    res.render('signup');
})

module.exports = router;