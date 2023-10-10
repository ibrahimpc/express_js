const express= require('express')

const router = express.Router()

const post_controller=require('./post.controller')

const uploadMiddleWare = require('../../middleware/fileUpload')
const jwtCheckMiddleWare= require('../../middleware/auth')

router.post('/createPost',jwtCheckMiddleWare,uploadMiddleWare,post_controller.createPost)
router.get('/getAllPost',jwtCheckMiddleWare,post_controller.getAllPosts)

module.exports=router
