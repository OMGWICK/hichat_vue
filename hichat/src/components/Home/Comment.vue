<template>
  <div>
    <div class="div">
      <div class="comment">
        <!-- <div>
          <div class="userName">
            <strong>{{name}} :</strong>
          </div>
        </div> -->
        <div class="text">
          <!-- <div> -->
            <input class="input" type="text" />
          <!-- </div> -->
          <div class="button_s">
            <button class="com-button" @click="publishComment">评论</button>
          </div>
        </div>
      </div>
    </div>
    <div class="his"   v-for="(item,index) in commentList" :key="index">
       <hiscomment :hiscomments="item" :getdata="getComment"></hiscomment>
    </div>
  </div>
</template>
<script>
import Hiscomment from "./Hiscomment";
export default {
  name: "comment",
  props: ["dynamicId"],
  
  data() {
    return {
      name:'',
      isShowEmojiPanel: false,
      dyContent: "",
      commentList:[]
    };
  },
  methods: {
    publishComment(){
      let commentContent=document.querySelector(".input").value;
      let dynamic_id=this.dynamicId;
      if(!commentContent){
        alert("error:评论内容不能为空！")
      }
      let commentTime=this.$moment().format("YYYY年MM月DD日 HH:mm:ss");
      let comment={dynamic_id,commentContent,commentTime};
      this.$http.post("/comment",comment).then(res=>{
        this.getComment();
        
      }).catch(err=>{
        console.log(err);
      })
      
  },
  getComment(){
    this.$http.get("/comment",{params:{id:this.dynamicId}}).then(res=>{
      this.commentList=res.data;
    // console.log(res);
    }).catch(err=>{
      console.log(err);
    });
  },
  getinfo(){
      this.$http
        .get("/user/info")
        .then(res => {
          this.name = res.data.name;
        })
        .catch(err => console.log(err));
    }
  },
  beforeMount(){
    this.getComment();
    this.getinfo();
  },
  components: {
    Hiscomment
  }
}
</script>
<style lang="less">
.div {
  //   height: 100px;
  width: 100%;
  /* border-top: 0.5px solid #d9d9d9; */
  padding: 35px 20px 30px 20px;
  //   border-bottom: 1px solid #d9d9d9;
}
.comment {
  /* border: 1px solid red; */
  width: 94%;
}
.userName {
  margin-top: 0px;
  width: 10%;
  float: left;
}
.text {
  height: 42px;
  //   border: 1px solid red;
}
.input {
  height: 30px;
  width: 80%;
  padding-left: 10px;
  margin-left: 5px;
  border-radius: 2%;
  /* border: none; */
  border: 0.5px solid #d9d9d9;
  // box-shadow: 0px 0px 2px 0.5px #d9d9d9 inset;
}
// .emoji {
//   // border: 2px solid red;
//   margin-left: 10%;
//   margin-top: 14px;
//   float: left;
// }

.button_s {
  display: inline-block;
  margin-left: 20px;
  // margin-left: 87%;
  // margin-top: 15px;
}
@media screen and (min-width: 1206px) {
  .button_s {
    margin-left: 40px;
  }
}
.com-button {
  width: 70px;
  height: 30px;
  font-size: 14px;
  background-color: #fdf6ec;
  border: 1px solid #f5dab1;
  border-radius: 4px;
  color: #e6a23c;
  cursor: pointer;
}
.com-button:hover {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.his {
  border-top: 1px solid #d9d9d9;
}
</style>