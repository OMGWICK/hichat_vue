<template>
  <div class="hiscomment">
    <div>
      <div class="userName1"><span>{{hiscomments.writer.name}}</span> : {{hiscomments.commentContent}}</div>
      <!-- <div class="text1">
        {{hiscomments.commentContent}}
      </div> -->
    </div>
    <div class="hisbottom">
        <div class="delhis"><div class="time">{{hiscomments.commentTime}}</div><span @click="removeHisComment" v-if="userid==hiscomments.writer._id">删除</span></div>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex';
let mapStateObj = mapState(['userid'])

export default {
  name: "Hiscomment",
  props:['cardId','hiscomments','getdata'],
  computed:{
    ...mapStateObj,
  },
  methods:{
    removeHisComment(){
      let _this=this;
      let id=_this.hiscomments._id;

      this.$http.delete("/comment",{data:{id}}).then(res=>{
        this.getdata();
      }).catch(err=>{
        console.log(err);
      })
    },
  }
};
</script>
<style lang="less">
.hiscomment {
  width: 95%;
  // border-top: 2px solid red;
  
  padding: 15px 15px 10px 20px;
}
.userName1 {
  span{
  color: #e6a23c;
  }
  // width: 10%;
  display: inline-block;
  vertical-align: top;
}
.text1 {
  vertical-align: top;

  display: inline-block;
  // width: 80%;
  margin-left: 10px;
//   border: 1px solid red;
  word-wrap: break-word;
  word-break: break-all;
}
.hisbottom{
    margin-top: 10px;
}
.time{
    color: #808080;
    font-size: 13px;
    // float: left;
  display: inline-block;
}
.delhis{
  // display: inline-block;
    color: #e6a23c;
    // margin-left: 92%;
    
    position: relative;
    span{
      position: absolute;
      right: 24px;
      cursor: pointer;
    }
}
</style>