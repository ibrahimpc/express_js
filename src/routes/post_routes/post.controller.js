const postModel=require('../../models/post')
const base_url='http://localhost:3002/'
const createPost=async (req,res)=>{
    try{
    const files= req.files
        const media = files.map((val,i)=>{
            return {
                type:val.mimetype.includes("video") ? "video" : "image",
                url:base_url + val.filename
            }
        })
        req.body.media=media
        const result = await postModel.create(req.body)
        res.send({
            data:result,
            status:true
        })
        console.log(req.body,'media')
    }catch(error){
        res.status(403).json({status:false,error})
    }
}

const getAllPosts=async (req,res)=>{
    console.log('get all post')
    try{
    const result =await postModel.find({})
        res.send({
            data:result,
            status:true
        })
    }catch(error){
        res.status(403).json({status:false,error})
    }
}
module.exports={createPost,getAllPosts}
