import mongoose from "mongoose";
import validator from "validator"; //use to validate email , name ......
import bcrypt from "bcryptjs";
import JWT from 'jsonwebtoken';
//schema

const userSchema = new mongoose.Schema({
      name:{
        type:String,
        required:[true , 'Name Is Require']
      },
      lastName:{
        type:String,
      },
      email:{
        type:String,
        required:[true , 'Email is Require'],
        unique:true,
        validate:validator.isEmail
      },
      password:{
        type:String,
        required:[true , 'password is require'],
        minlength:[6 , "password length should be greater then 6 character"],
        select:true,
      },
      location:{
        type:String,
        default:'vadodra'
      },
},{timeseries:true});

//middelwares
userSchema.pre("save" , async function(){
  if(!this.isModifide)return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password , salt);
});

//compare password
userSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword , this.password);
    return isMatch;
};

//json webToken

userSchema.methods.createJWT = function(){
    return JWT.sign({userId:this._id},process.env.JWT_SECRET,{expiresIn:'1d'});
    //expire token in 1 day
}
export default mongoose.model('User' , userSchema);