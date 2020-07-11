<template>
  <div id="mainmode">
    <div id="null"></div>
    <div id="user">
      <div id="user-photo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :http-request="upload"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img id="user-img" v-if="imageUrl" :src="imageUrl" class="avatar" title="点击更改头像"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"  title="点击更改头像"></i>
        </el-upload>
      </div>
      <div id="user-name">
        <h1 class="user-name">{{name}}</h1>
        <span id="user-sex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            viewBox="0 0 1024 1024"
            width="20"
            height="20"
            t="1591059409153"
            p-id="785"
            version="1.1"
            data-spm-anchor-id="a313x.7781069.0.i4"
          >
            <path
              class="selected"
              fill="#1296db"
              d="M 810 202.91 H 581.61 v 18.19 h 195 L 593.45 404.27 a 238 238 0 0 0 -149.28 -52.6 c -131.93 0 -239.24 107.33 -239.24 239.26 s 107.31 239.26 239.24 239.26 s 239.25 -107.34 239.25 -239.26 c 0 -68.93 -29.47 -131 -76.27 -174.65 l 185.36 -185.37 v 200.38 h 18.19 V 202.91 Z m -144.75 388 C 665.24 712.84 566.08 812 444.17 812 s -221.06 -99.16 -221.06 -221.07 s 99.16 -221.08 221.06 -221.08 S 665.24 469 665.24 590.93 Z"
              p-id="786"
              data-spm-anchor-id="a313x.7781069.0.i5"
            />
          </svg>
        </span>
      </div>
      <div id="user-introduce">{{introduce}}</div>
    </div>
    <div id="null"></div>
    <div id="lastmode">
      <div></div>
            <form id="payment">
                      <h1>详细信息</h1>
              <fieldset>
                <ol>
                  <li>
                    <label for="name">用户名称：</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="请输入用户名"
                      required
                      autofocus
                      v-model="formName"
                    />
                  </li>
                  <li>
                    <label for="truename">真实姓名：</label>
                    <input
                      type="text"
                      id="truename"
                      name="truename"
                      placeholder="可不填"
                      v-model="formRealName"
                    />
                  </li>
                  <li>
                    <label for="email">邮件地址：</label>
                    <input
                      v-model="formEmail"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="请输入邮箱"
                      required
                    />
                  </li>
                  <li>
                    <label for="phone">联系电话：</label>
                    <input
                      v-model="formCall"
                      type="tel"
                      placeholder="12345678910"
                      id="phone"
                      name="phone"
                    />
                  </li>
                  <li>
                    <label for="phone">生日</label>
                    <input type="date" v-model="formDay" />
                  </li>
                  <li>
                    <label for="url">博客地址</label>
                    <input v-model="formUrl" type="url" name="url" id="rul" required />
                  </li>
                  <li>
                    <label for="sex">性别</label>
                    <select name="sex" id="select" v-model="formSex">
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </li>
                  <li>
                    <label for="sex">性取向</label>
                    <select name="sex" id="select" v-model="formSexx">
                      <option value="男">男</option>
                      <option value="女">女</option>
                    </select>
                  </li>
                  <li>
                    <label for="introduce">个人介绍</label>
                    <textarea
                      v-model="formIntroduce"
                      name="introduce"
                      rows="10"
                      cols="30"
                      width="168px"
                      height="18px"
                    ></textarea>
                  </li>

                  <li>
                    <label for="address">详细地址：</label>
                    <textarea v-model="formAddress" name="address" id="address" rows="1" disabled></textarea>
                  </li>
                  <li>
                    <label for="postcode">邮政编码:</label>
                    <input
                      v-model="formPostCode"
                      type="text"
                      id="postcode"
                      name="postcode"
                      required
                    />
                  </li>

                  <li>
                    <label for="country">国 家:</label>
                    <select v-model="formCountry" name="country" id="select">
                      <option value="中国">中国</option>
                      <option value="美国">美国</option>
                      <option value="日本">日本</option>
                      <option value="英国">英国</option>
                      <option value="俄罗斯">俄罗斯</option>
                      <option value="其他">其他</option>
                    </select>
                  </li>
                </ol>
              </fieldset>

              <fieldset>
                <el-button type="info" id="btnQ" @click="btnq" style="margin-right:80px;">编辑</el-button>
                <el-button type="info" id="btnJ" @click="btnj" :disabled="j">保存</el-button>
              </fieldset>
            </form>
          </div>
        </div>
</template>

<script>
export default {
  data: function() {
    return {
      imageUrl: "",
      j: true,
      name: "",
      introduce: "",
      formName: "",
      formRealName: "",
      formEmail: "",
      formCall: "",
      formDay: "",
      formUrl: "",
      formSex: "",
      formSexx: "",
      formIntroduce: "",
      formAddress: "",
      formPostCode: "",
      formCountry: ""
    };
  },
  methods: {
    btnj() {
      var formData = {};
      formData.formName = this.formName;
      formData.formRealName = this.formRealName;
      formData.formEmail = this.formEmail;
      formData.formCall = this.formCall;
      formData.formDay = this.formDay;
      formData.formUrl = this.formUrl;
      formData.formSex = this.formSex;
      formData.formSexx = this.formSexx;
      formData.formIntroduce = this.formIntroduce;
      formData.formAddress = this.formAddress;
      formData.formPostCode = this.formPostCode;
      formData.formCountry = this.formCountry;
      this.$http
        .post("user/info", formData)
        .then(res => {
          // console.log(res);
        })
        .catch(err => console.log(err));
        this.name=formData.formName;
        this.introduce = formData.formIntroduce;
      var inps = document.querySelectorAll("#lastmode input");
      for (var i = 0; i < inps.length; i++) {
        inps[i].disabled = true;
      }
      var selects = document.getElementsByTagName("select");
      for (var j = 0; j < selects.length; j++) {
        selects[j].disabled = true;
      }

      var textareas = document.getElementsByTagName("textarea");
      for (var k = 0; k < textareas.length; k++) {
        textareas[k].disabled = true;
      }
    },
    btnq() {
      this.j = false;
      var inps = document.querySelectorAll("#lastmode input");
      for (var i = 0; i < inps.length; i++) {
        inps[i].disabled = false;
      }
      var selects = document.getElementsByTagName("select");
      for (var j = 0; j < selects.length; j++) {
        selects[j].disabled = false;
      }

      var textareas = document.getElementsByTagName("textarea");
      for (var k = 0; k < textareas.length; k++) {
        textareas[k].disabled = false;
      }
    },
    getInfo() {
      this.$http
        .get("/user/info")
        .then(res => {
        //   console.log(res);
          this.formName = res.data.name;
          this.formRealName = res.data.realname;
          this.formEmail = res.data.email;
          this.formCall = res.data.call;
          this.formDay = res.data.day;
          this.formUrl = res.data.url;
          this.formSex = res.data.sex;
          this.formSexx = res.data.sexx;
          this.formIntroduce = res.data.introduce;
          this.formAddress = res.data.address;
          this.formPostCode = res.data.postcode;
          this.formCountry = res.data.country;
          this.name = res.data.name;
          this.introduce = res.data.introduce;
          this.imageUrl = res.data.userUrl;
        })
        .catch(err => console.log(err));
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message({
              message: "上传头像图片只能是 JPG 格式!",
              offset: 60,
              type: "error"
            });
      }
      if (!isLt2M) {
        this.$message({
              message: "上传头像图片大小不能超过 2MB!",
              offset: 60,
              type: "error",
            });;
      }
      return isJPG && isLt2M;
    },
    upload(f) {
    console.log('123')
      let formData = new FormData();
      formData.append("file", f.file);
      this.$http({
        method: "post",
        url: "/upload",
        data: formData
      }).then(res => {
        // console.log(res);
        this.imageUrl = res.data.url;
        this.$http
          .post("user/userurl", { userUrl: this.imageUrl })
          .then(res => {
            this.$message({
              message: "修改头像成功!",
              offset: 60,
              type: "success"
            });
          })
          .catch(err => console.log(err));
      });
    }
  },
  mounted() {
    this.getInfo();
    var inps = document.querySelectorAll("#lastmode input");
    for (var i = 0; i < inps.length; i++) {
      inps[i].disabled = true;
    }
    var selects = document.getElementsByTagName("select");
    for (var j = 0; j < selects.length; j++) {
      selects[j].disabled = true;
    }

    var textareas = document.getElementsByTagName("textarea");
    for (var k = 0; k < textareas.length; k++) {
      textareas[k].disabled = true;
    }
  }
};
</script>

<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px!important;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
#mainmode {
  margin-top: 50px;
  background-image: url("../assets/css/bgr.jpg");
  // background-size: cover;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  * {
    margin: 0px;
    padding: 0px;
  }
  fieldset button:hover {
    cursor: pointer;
  }
  #user {
    width: 920px;
    height: 200px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0);
    text-align: center;
    .el-upload{
        border: none;
    }
  }
  #user-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  #user-name {
    height: 25px;
  }
  .user-name {
    line-height: 25px;
    font-size: 22px;
    font-weight: 600;
    display: inline;
    text-align: center;
    color: white;
  }
  #user-introduce {
    width: 920px;
    height: 20px;
    margin-top: 4px;
    text-align: center;
    color: #fff;
    line-height: 18px;
    text-shadow: 0 0 4px rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }
  #lastmode {
    width: 920px;
    height: 1100px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0);
  }
  #null {
    width: 920px;
    height: 50px;
    opacity: 0;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  #modeleft {
    height: 560px;
    width: 300px;
    float: left;
  }
  // #lastmode {
  // width: 920px;
  // height: 800px;

  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // margin: auto;
  // background: rgba(0, 0, 0, 0);

  // }
  td {
    height: 50px;
    width: 100px;
    color: black;
    text-align: center;
    border-right: gray 0.5px solid;
    text-align: center;
  }
  #modeb {
    height: 140px;
    width: 300px;
    background-color: white;
    margin-bottom: 20px;
  }
  span {
    font-size: 12px;
  }
  #text {
    width: 270px;
    height: 37px;
    color: black;
    font-size: 14px;
    text-align: left;
    margin: auto;
    font-weight: 900;
    line-height: 37px;
  }
  #two-dimension {
    width: 280px;
    height: 92px;
    margin: auto;
    background-color: whitesmoke;
  }
  #two-dimensionphoto {
    height: 92px;
    width: 92px;
    float: left;
  }
  #two-dimensiontext {
    width: 185px;
    height: 20px;
    background-color: whitesmoke;
    float: left;
    margin: auto;
    text-align: center;
    line-height: 28px;
    font-size: 12px;
    color: #808080;
  }
  #crdephotobox {
    height: 230px;
    width: 280px;
    margin: auto;
  }
  #crdephoto {
    width: 100%;
    height: 100%;
  }
  #credibility {
    width: 260px;
    height: 37px;
    background-color: white;
    margin: auto;
    border-bottom: 1px solid gray;
  }
  #credbilitytext {
    color: #333333;
    line-height: 37px;
    font-size: 14px;
    text-align: left;
  }
  #modec {
    height: 300px;
    width: 300px;
    background-color: white;
  }
  #usermessage {
    width: 600px;
    height: 600px;
    background-color: white;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  #moderight {
    float: left;
    width: 600px;
    height: 800px;
    background-color: white;
    margin-left: 20px;
  }
  html,
  body,
  h1,
  form,
  fieldset,
  legend,
  ol,
  li {
    padding: 0;
    margin: 0;
  }
  ol {
    list-style: none;
  }
form#payment {
  background: white;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  padding: 20px 20px 30px 20px;
  background: rgba(255, 255, 255, 1);
  width: 800px;
  height: 910px;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
 }
form h1 {
  font-size: 25px;
  padding: 0px 0px 10px 40px;
  display: block;
  border-bottom: 1px solid #E4E4E4;
  margin: -10px -15px 0px -10px;
  color: #888;
  text-align: left;
}
  
  form#payment fieldset {
    text-align: center;
    border: none;
    margin-bottom: 20px;
  }

  form#payment ol li {
    background: rgba(255, 255, 255, 0.3);
    border: #b9b9b3;
    // border-style: solid;
    // border-width: 1px;

    line-height: 30px;

    padding: 14px 8px;
   border-bottom: 1px solid #E4E4E4;
  }
  form#payment ol ol li {
    background: none;
    border: none;
    float: left;
  }
  form#payment label {
    float: left;
    font-size: 12px;
    width: 120px;
  }
  form#payment select {
    width: 224px;
    height: 32px;
    text-align-last: center;
  }
  form#payment input {
    width: 220px;
    height: 28px;
    text-align-last: center;
  }
  #checkbox {
    width: 40px !important;
    height: 15px !important;
  }
  form#payment textarea {
    width: 550px;
    height: 56px;
  }

  form#payment fieldset fieldset label:hover {
    cursor: pointer;
  }

  form#payment textarea {
    background: #fff;
    outline: none;
    padding: 4px;
  }
  button {
    width: 140px;
    line-height: 30px;
    text-align: center;
    color: black;
    margin: 0 20px 20px 0;
  }
  button:hover {
    background-color: cadetblue;
  }
}
</style>
