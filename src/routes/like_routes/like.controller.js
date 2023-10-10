const likeModel=require('../../models/like')
const postModel=require('../../models/post')
const likeDisLike=async (req,res)=>{
    const{postId,userId}=req.body
    // console.log(postId,userId,existingLike,'existingLike')
    try{
        const existingLike=await likeModel.findOne({postId,userId})
        if(!existingLike){
           await likeModel.create(req.body)
           await postModel.findByIdAndUpdate(
               postId,
               {$inc:{likeCount:1}},
            {new:true}

           )
           return res.status(200).json({message:'Like Added Succesfully'})
        }else{
           await likeModel.findByIdAndDelete(existingLike?._id)
            await postModel.findByIdAndUpdate(
                postId,
                {$inc:{likeCount:-1}},
            )
            return res.status(200).json({message:'Like Removed Succesfully'})
        }


    }catch(error){
        res.status(403).json({status:false,error})
    }
}

const postLikes=async (req,res)=>{
    console.log('get all post likes',req?.body)
    const {postId} =req.query
    console.log(postId,'1111')
    try{
        const result =await likeModel.find({postId}).populate({path:"userId",select:"userName fullName"})
        res.send({
            data:result,
            status:true
        })
    }catch(error){
        res.status(403).json({status:false,error})
    }
}
module.exports={likeDisLike,postLikes}
