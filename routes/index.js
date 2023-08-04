//get para la raiz (/)
//get para (/get_author.html)
const route = require('express').Router()

const path = require('path')

route.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/index.html'))
})
route.get('/newDish',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/add_dishes.html'))
})

module.exports = route;
