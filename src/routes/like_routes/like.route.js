const express= require('express')

const router = express.Router()

const like_controller=require('./like.controller')

const jwtCheckMiddleWare= require('../../middleware/auth')

router.post('/likeDisLike',jwtCheckMiddleWare,like_controller.likeDisLike)
router.get('/postLikes',jwtCheckMiddleWare,like_controller.postLikes)

module.exports=router
