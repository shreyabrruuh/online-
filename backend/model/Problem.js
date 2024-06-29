import mongoose from "mongoose";


const problemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
      type:String,
  },
    level:{
        type:String,
        required:true
    },
    inputFormat:{
        type:String,
        required:true
    },
    outputFormat:{
        type:String,
        required: true
    },
   
   createdAt: {
    type: Date,
    default: Date.now,
  },
   updatedAt: {
    type: Date,
    default: Date.now,
  }

});

problemSchema.pre('save', function(next) {
    this.updatetime = Date.now();
    next();
  });
  
  problemSchema.pre('findOneAndUpdate', function(next) {
    this._update.updatetime = Date.now();
    next();
  });
  
  const Problem = mongoose.model('Problem', problemSchema);
  
  export default Problem;