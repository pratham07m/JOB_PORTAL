import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        requied:[true , 'companay name is require'],
    },
    position:{
        type:String,
        required:[true , 'job position is required'],
        maxlength:100
    },
    status:{
        type:String,
        enum:["panding" , "reject" , "interview"],
        default:"panding"
    },
    workType:{
        type:String,
        enum:["full-time" , "part-time" , "internship" , "contaract"],
        default:"full-time"
    },
    workLocation: {
        type: String,
        default: "vadodra",
        required: [true, "Work location is required"],
      },
      createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
},{timestamps:true});

export default mongoose.model("job" , jobSchema);