var mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true //Will be trimmed in the frontend as well while sending the request.
    },
    name: {
        type: String,
         required: true 
    },

    photo: {
        type: String,
        default: 'lam3i'
    },
    major:{
        type:String,
        required:true,
        enum:["computerscience","dmet","businessinformatics","appliedarts","management","electronics","law","pharmacy","communication","networks","mechatronics","production","material"]

    },
    bachCountry:{
        type:String
    },
    bachUni:{
        type:String
    },
    bachYear:{
        type:String
    },
    info:{
        type:String
    }



    //------ Teacher ------ //

   
});


// Override the transform function of the schema to delete the password before it returns the object

if (!UserSchema.options.toObject) {
    UserSchema.options.toObject = {};
}

UserSchema.options.toObject.transform = function (document, transformedDocument) {
    delete transformedDocument.password;
    return transformedDocument;
};


const User = mongoose.model('User', UserSchema);
