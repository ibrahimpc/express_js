const userModel = require('../../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser=async(req,res)=>{
   try{
       const { email ,userName,password}=req?.body;
       const checkUserExists = await userModel.findOne({$or:[{email},{userName}]})

       if(!checkUserExists){
           const salt = await bcrypt.genSalt()
           const hashPassword= await bcrypt.hash(password,salt)
           let result = await userModel.create({...req.body,password:hashPassword})
           res.send({
               data:result,
               message:'User Created Successfully ....!!',
               status:true
           })
       }else {
           res.status(403).json({status:false,error:'User Already Exists'})
       }

   }catch (e){
       res.status(403).json({status:false,error:e?.message})

   }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body
    // res.send({mes:'hello ibrahim from login user',req:req.body})
    try{
        const result = await userModel.findOne({email});
        if(!!result){
            let isPasswordValid = await bcrypt.compare(password,result?.password)
            if(!!isPasswordValid){
                const token = jwt.sign({ user_id :result._id,email}, process.env.TOKEN_KEY);
                res.send({
                    data: {...result,token},
                    status:true
                })
            }else{
                res.status(403).json({status:false,error:"Password / email not correct"})
            }

      }else{
             res.status(403).json({status:false,error:"Password / email not correct"})
            }
    }catch(e){
        res.status(403).json({status:false,error:e?.message})
    }
}

module.exports={createUser,loginUser}
