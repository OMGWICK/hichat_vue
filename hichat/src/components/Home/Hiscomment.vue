<template>
  <div class="hiscomment">
    <div>
      <div class="userName1">admin:</div>
      <div class="text1">
        ygqhiuhsjikhbyuwhkjsdfghjkfgtyhuilkmufsdfghjmnbvcrtfyguhjmnbvcxrtyuikcdrtyjnbthbtyhbgh
      </div>
    </div>
    <div class="hisbottom">
        <div class="time">2020-06-10 09:45:35</div>
        <div class="delhis"><span>删除</span></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Hiscomment"
};
</script>
<style lang="less">
.hiscomment {
  width: 95%;
  // border-top: 2px solid red;
  
  padding: 15px 15px 5px 15px;
}
.userName1 {
  color: #e6a23c;
  width: 10%;
  float: left;
}
.text1 {
  width: 91%;
  margin-left: 10%;
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
    float: left;
}
.delhis{
    color: #e6a23c;
    margin-left: 92%;
    cursor: pointer;
}
</style>