const mongoose=require('mongoose');

let Schema = mongoose.Schema;

let LikeSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    dynamic_id:{
        type:Schema.Types.ObjectId,
        ref:'Dynamic'
    },
    time:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model('Like',LikeSchema)