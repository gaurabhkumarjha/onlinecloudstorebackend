const mongoose= require("mongoose");

const userSchema= new mongoose.Schema({


    legalname:{
        type: String,
        unique: true,
        required: true
    },

    mobilenumber:{
        type: Number,
        unique:true,
        minlength:10,
        maxlength:10
    },

    userid:{
        type: String,
    },

    password:{
        type: String,
    },
    opt:{
        type: String,
    },
    remarks:{
        type: String,
    }
});

const Registration= mongoose.model('Registration', userSchema);
 module.exports=  Registration; 