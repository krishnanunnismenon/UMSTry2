const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/react-USM")

require('dotenv').config();
const express = require('express');
const app = express()
const path = require('path')
const cors = require('cors')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

const userRoutes = require('./routes/userRoutes')
app.use('/',userRoutes)

const adminRoutes = require('./routes/adminRoutes');
app.use('/admin',adminRoutes)

app.listen(4545,()=>{
    console.log('server running at port 4545');
    
})
