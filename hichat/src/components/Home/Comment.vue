<template>
  <div>
    <div class="div">
      <div class="comment">
        <div>
          <div class="userName">
            <strong>admin:</strong>
          </div>
        </div>
        <div class="text">
          <div>
            <input class="input" type="text" />
          </div>
          <div class="button_s">
            <button class="com-button">评论</button>
          </div>
        </div>
      </div>
    </div>
    <div class="his">
      <hiscomment></hiscomment>
    </div>
  </div>
</template>
<script>
import Hiscomment from "./Hiscomment";
export default {
  name: "comment",
  props:['cardTime'],
  data() {
    return {
      isShowEmojiPanel: false,
      dyContent: "",     
    };
  },methods:{
      
      
  },
  components: {
    Hiscomment
  }
};
</script>
<style lang="less">
.div {
  //   height: 100px;
  width: 100%;
  /* border-top: 0.5px solid #d9d9d9; */
  padding: 20px 20px 10px 20px;
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
  height: 80px;
  //   border: 1px solid red;
}
.input {
  height: 30px;
  width: 87%;
  padding-left: 10px;
  margin-left: 5px;
  border-radius: 2%;
  /* border: none; */
  border: 0.5px solid #d9d9d9;
  box-shadow: 0px 0px 2px 0.5px #d9d9d9 inset;
}
.emoji {
  // border: 2px solid red;
  margin-left: 10%;
  margin-top: 14px;
  float: left;
}

.button_s {
  margin-left: 87%;
  margin-top: 15px;
}
@media screen and (min-width: 1206px) {
  .button_s {
    margin-left: 88.5%;
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
.his{
    border-top: 2px solid #d9d9d9;
}
</style>