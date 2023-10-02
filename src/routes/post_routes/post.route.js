const express= require('express')

const router = express.Router()

const post_controller=require('./post.controller')

const uploadMiddleWare = require('../../middleware/fileUpload')

router.post('/createPost',uploadMiddleWare,post_controller.createPost)
router.get('/getAllPost',post_controller.getAllPosts)

module.exports=router
