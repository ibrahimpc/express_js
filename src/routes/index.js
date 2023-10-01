const express = require('express');
const rootRouter = express.Router();

const users =require('./users_routes/user.route')

rootRouter.use('/',users)

module.exports=rootRouter
