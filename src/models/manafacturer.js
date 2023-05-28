const mongoose=require("mongoose");

const manuSchema=new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true

    },
    address:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    confirmpassword:{
        type:String,
        require:true
    }
})

const Register=new mongoose.model("Register",manuSchema);

module.exports=Register;