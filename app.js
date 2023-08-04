const express = require('express')
const path = require('path')


const app = express()

app.set('PORT',process.env.PORT || 4000)

app.use('/', require('./routes/index'))
app.use(express.static('public'))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.set('views',path.join(__dirname,'views'))
//app.set('view engine','')




app.listen(app.get('PORT'), ()=>console.log(`Server listen to port ${app.get('PORT')}`))

