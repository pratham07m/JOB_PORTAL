import userModel from "../models/userModel.js";

export const registerController = async(req , res , next) => {
   
        const { name ,  email , password} = req.body
        //validate
        if(!name){
            next("name is required")
            
        }
        if(!email){
            // return res.status(400).send({success:false,message:'please provide email'})
            next("email is required")
        }
        if(!password){
            // return res.status(400).send({success:false,message:'please provide password'})
            next("password is required")
        }
        const exisitingUser = await userModel.findOne({email});
        if(exisitingUser){
            next("email already register please login");
        }

        const user = await userModel.create({name,email,password})
        //token
        const token = user.createJWT();
        res.status(210).send({
            success:true,
            message:"user Created successfully",
            user:{
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                location:user.location,
            },
            token,
        })
    
        // console.log(error);
        // res.status(400).send({
        //     message:'Error In Register Controller',
        //     success:false,
        //     error
        // })
    
};

export const loginController = async(req , res , next) => {
    const {email , password} = req.body
    //validation
    if(!email || !password){
        next('please provide All Fields')
    }
    //find user by email
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next('Invalid Username or password')
    }

    //compare password
    const isMatch = await user.comparePassword(password)

    if(!isMatch){
       next("Invalid Username or password") ;
    };
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
        success:true,
        message:'login successfully',
        user,
        token,
    });
};