const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CommentSchema = new Schema({
        dynamic_id:{
            type:Schema.Types.ObjectId,
            ref:'Dynamic'
        },
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        commentContent: String,
        commentTime: String,
})
module.exports=mongoose.model('Comment',CommentSchema)