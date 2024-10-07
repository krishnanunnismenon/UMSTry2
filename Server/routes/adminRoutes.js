const express = require('express');
const admin_routes = express()
admin_routes.use(express.json());

const adminController = require('../Controllers/adminController');
const {upload} = require('../middleware/adminMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware');

admin_routes.post('/login',adminController.adminLogin)
admin_routes.get('/getUserList',adminController.getUserList)
admin_routes.get("/getAdminDetails",adminController.getAdminDetails)
admin_routes.delete("/deleteUser/:id",adminController.deleteUser)
admin_routes.put("/edit-user/:id",adminController.editUser)

module.exports = admin_routes;