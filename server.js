const express = require('express')
const app = express()

app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.static(__dirname + '/public'));
// const connectDB = require('./config/database')
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
// require('dotenv').config({path: './config/.env'})

//connectDB()  //initialize connecting the server to the database via config/database file
app.use('/services', express.static('services'))


app.get('/', (req, res) => {
    res.render('index.ejs');
 });



app.listen(3000, ()=>{
    console.log('Server is running, you better catch it!')
})  