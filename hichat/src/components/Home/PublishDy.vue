<template>
  <div class="publish_send">
    <div class="title_area">
      <div class="title_t">
        <span class="title_s">分享你的精彩故事吧!</span>
        <span class="title_r" v-show="count">已输入{{count}}字</span>
      </div>
      <div>
        <div
          class="HL_textarea"
          type="textarea"
          contenteditable
          autosize
          @input="handleInput"
          @paste.prevent="onlyText"
          v-html="dyContent"
        ></div>
      </div>

      <div class="buttom_area">
        <div class="buttom_s">

          <span><el-upload
  class="upload-demo"
  action="string"
  :limit="9"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-error='error'
  :file-list="fileList"
  :http-request="upload"
  list-type="picture">
  <el-button size="small" type="primary" icon="el-icon-picture">上传图片</el-button>
</el-upload></span>

          <span class="button_face" @click="showEmojiPanel">
            <img src="../../assets/img/facelogo.png" /><span>表情</span>
          </span>

          <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel"></emoji-panel>
        </div>
        <div class="button_s">
          <el-button type="warning" :plain="true" @click="publsih">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmojiPanel from "./Emoji/EmojiPanel.vue";
export default {
  inject: ["routerReload"],
  data() {
    return {
      textarea1: "",
      count: "",
      dyContent: "",
      isShowEmojiPanel: false,
      fileList:[],
    };
  },
  methods: {
    reload() {
      this.routerReload();
    }, //刷新

    onlyText(e){
      // console.log('123')
      let text = e.clipboardData.getData("text/plain");
      document.execCommand("insertText",false,text);
    },

    handleInput: function(e) {
      this.count = e.target.innerText.length;
      // this.dyContent = e.target.innerHTML;
    },

    publsih: function() {
      let text = document.querySelector(".HL_textarea").innerHTML;
      let dyContent = this.dyContent;
      dyContent = text;
      dyContent = dyContent.replace(/:.*?:/g, this.emoji);
      // console.log(dyContent);
      if (!dyContent) {
        this.open2();
        return;
      }
      let addTime = this.$moment().format("YYYY年MM月DD日 HH:mm:ss");
      // console.log(this.fileList);
      let imgUrl=this.fileList;
      let dynamics = { content: dyContent, addTime,imgUrl};
      this.$http.post("/dynamics", dynamics).then(res => {
        let result = res.data.msg;
        if (result) {
          this.isShowEmojiPanel = false;
          text = "";
          this.open1();
          this.reload();
        }
      }).catch(err=>{
        console.log(err);
      });
    },

    open1() {
      this.$message({
        showClose: true,
        message: "发布成功",
        type: "success",
        center: true,
        offset: 60
      });
    },
    open2() {
      this.$message({
        showClose: true,
        message: "输入内容不能为空",
        type: "error",
        center: true,
        offset: 60
      });
    },
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    emoji(word) {
      // console.log(word);
      const type = word.slice(1, word.length - 1);
      return `<span class="emoji-item-common emoji-${type} emoji-size-small"></span>`;
    },
    appendEmoji(text) {
      let HL_textarea = document.querySelector(".HL_textarea").innerHTML;
      // console.log(HL_textarea);
      this.dyContent = `${HL_textarea}:${text}:`;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      error(file){
        console.log(file);
      },
      upload(f){
        let formData=new FormData()
        formData.append('file',f.file)
        this.$http({
          method:'post',
          url:'/upload',
          data:formData
        }).then(res=>{
          // console.log(res);
          this.fileList.push({name:f.file.name,url:res.data.url});
        })
      }
  },
  components: {
    EmojiPanel
  }
};
</script>

<style lang="less">
@import "../../assets/css/publish_emoji.css";
.publish_send {
  border-radius: 2px;
  background-color: #ffffff;
  padding: 16px;
  .title_area {
    width: 100%;
    .title_t {
      display: flex;
      justify-content: space-between;
      .title_s {
        font-size: 16px;
        color: #fa894e;
        font-family: STXinwei;
        letter-spacing: 2px;
      }
      .title_r {
        font-size: 16px;
        color: #808080;
        font-family: STXinwei;
        letter-spacing: 2px;
      }
    }

    .HL_textarea {
      word-wrap: break-word;
      white-space: normal;
      font-size: 14px;
      width: 100%;
      border: 1px solid #cccccc;
      outline-color: #fa894e;
      margin-top: 5px;
      resize: none;
      padding: 0;
      min-height: 92px;
      padding: 2px;
      box-sizing: border-box;
    }
    .buttom_area {
      position: relative;
      width: 100%;
      margin-top: 14px;
      font-size: 12px;

      .buttom_s {
        display: inline-block;
        .button_face {
          cursor: pointer;
          img {
            vertical-align: top;;
            padding-right: 6px;
            width: 14px;
          }
          &:hover {
            color: #fa894e;
          }
          span{
            vertical-align: top;
          }
        }
        span {
          margin-right: 15px;
        }
        .emoji-size-large {
          zoom: 0.5;  //缩小
          margin: 4px;
        }
        .upload-demo{
          display: inline-block;
          vertical-align:top;
        }
        .el-button{
          padding: 0;
          font-size: 12px;
          border: none;
          background-color: #FFFFFF;
          color: #525552;
          width: 80px;
          .el-icon-picture{
            color: #1AA5FF;
            font-size: 14px;
          }
          &:hover{
            color: #fa894e;
          }
        }
      }

      .button_s {
        margin:0;
        display: inline-block;
        vertical-align: middle;
        .el-button {
          bottom: -7px;
          right: 0px;
          padding: 6px;
          width: 70px;
          height: 30px;
          position: absolute;
        }
      }
    }
  }
}
   .emoji-item-common {
          background: url("../../assets/img/emojisprite.png");
          display: inline-block;
          // &:hover {
          //   cursor: pointer;
          // }
        }
        .emoji-size-small {
          // 表情大小
          zoom: 0.3;
        }
</style>