const express = require('express');
const user_routes = express();
user_routes.use(express.json());

const userController = require('../Controllers/userController')
const {upload} = require("../middleware/userMiddleware")
const userMiddleware = require("../middleware/userMiddleware");

user_routes.post('/',upload.single('image'),userMiddleware.existUser,userController.registerUser);
user_routes.post('/login',userController.loginUser)
user_routes.get('/getUserDetails',userController.getDetails)
user_routes.put('/updateProfile',upload.single('image'),userMiddleware.existUser,userController.updateProfile)

module.exports = user_routes;