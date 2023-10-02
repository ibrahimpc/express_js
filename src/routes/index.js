const express = require('express');
const rootRouter = express.Router();

const users =require('./users_routes/user.route')
const posts = require('./post_routes/post.route')

rootRouter.use('/',users)
rootRouter.use('/',posts)

module.exports=rootRouter
