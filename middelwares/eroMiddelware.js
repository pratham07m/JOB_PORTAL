//error middleware || next function

const errorMiddelware = (err,req,res,next) =>{
    console.log(err);
    const defaultErrors = {
        statusCode : 500,
        message:err,
    }
   
    //missing fild errer
    if(err.name === 'ValidationError'){
        defaultErrors.statusCode = 400
        defaultErrors.message = Object.values(err.errors).map(item => item.message).join(',')
    }
    //duplicate error
    if(err.code && err.code === 11000){
        defaultErrors.statusCode = 400;
        defaultErrors.message = `${Object.keys(err.keyValue)} field has to be unique`;
        }

    res.status(defaultErrors.statusCode).json({message:defaultErrors.message});
};
export default errorMiddelware;