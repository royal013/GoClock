const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    order_id:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    from:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    transpoter:{
        type:String,
        require:true
    },
    quantity:{
        type:String,
        require:true
    }
})

const Oder=new mongoose.model("Oder",orderSchema);

module.exports=Oder;