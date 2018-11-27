var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
  name :{
  type:String,
  required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  verified:{
  type:Boolean
  },
  major:{
    type:String,
    required:true
  },
  bachCountry:{
    type:String
  },
  bachUni:{
    type:String
  },
  info:{
    type:String
  }
  
  
});

// Override the transform function of the schema to delete the password before it returns the object
if (!userSchema.options.toObject) {
  userSchema.options.toObject = {};
}
userSchema.options.toObject.transform = (document, transformedDocument) => {
  delete transformedDocument.password;
  return transformedDocument;
};

mongoose.model('User', userSchema);
