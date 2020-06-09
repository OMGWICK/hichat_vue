const mongoose=require('mongoose');

let Schema=mongoose.Schema;

let DynamicSchema=new Schema({
    content:String,
    addtime:String,
    writer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    imgUrl:[],
    likeNumber:{
        type:Number,
        default:0,
    },
})

module.exports=mongoose.model('Dynamic',DynamicSchema)