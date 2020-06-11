<template>
  <div class="publish_card">
    <el-card class="box-card">
      <div class="card_face">
        <el-avatar :size="40" :src="circleUrl" @error="errorHandler">
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </el-avatar>
      </div>
      <div class="card_content">
        <el-dropdown trigger="click" v-if="userid==cardData.writer._id?true:false">
          <span class="el-dropdown-link">
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="editContent">编辑</el-dropdown-item>
            <el-dropdown-item @click.native="removeContent">删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <el-dialog :visible.sync="dialogVisible" width="35%" :before-close="handleClose">
          <div class="publish_send">
            <div class="title_area">
              <div class="title_t">
                <span class="title_s">分享你的精彩故事吧!</span>
              </div>
              <div>
                <div
                  class="edit_textarea"
                  type="textarea"
                  contenteditable
                  autosize
                  v-html="saveContent"
                ></div>
              </div>
              <div class="buttom_area">
                <div class="buttom_s">
                  <span class="button_face" @click="showEmojiPanel">
                    <img src="../../assets/img/facelogo.png" />表情
                  </span>

                  <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel"></emoji-panel>
                </div>
                <div class="button_s">
                  <el-button type="warning" :plain="true" @click="finishEdit">编辑完成</el-button>
                </div>
              </div>
            </div>
          </div>
        </el-dialog>

        <span class="card_username">{{userName}}</span>
        <div class="card_time">{{time}}</div>
        <div class="card_main_text">
          <span class="card_main_txt" v-html="cardContent"></span>
          <span class="card_main_more" @click="toggleMore">{{lookmore}}</span>
        </div>

        <div class="card_main_img">
          <div class="demo-image__preview">
            <el-image
              style="width: 100px; height: 100px"
              :z-index="1000000"
              :src="item.url"
              :preview-src-list="srcList"
              v-for="(item,index) in imgUrl"
              :key="index+'a'"
            ></el-image>
          </div>
        </div>

      </div>
      <div class="clear"></div>
    </el-card>
    <div class="card_buttom">
      <span style="border:none;font-weight:300;cursor: pointer;" @click="collection">
        <i class="el-icon-collection-tag"></i>
        {{(collectState==0)?'收藏':'已收藏'}}
      </span>
      <span style="cursor: pointer;" @click="showComment=!showComment">
        <i class="el-icon-chat-dot-square"></i>评论
      </span>
      <span style="cursor: pointer;" @click="toggleLike" :style="{color:iflike}">
        <i class="zi zi_digg"></i>{{like==0?'赞':like}}
      </span>
    </div>
    <div class="card_comment" v-if="showComment">
      <comment></comment>
    </div>
  </div>
</template>

<script>
import publishDy from "./PublishDy";
import EmojiPanel from "./Emoji/EmojiPanel";
import {mapState} from 'vuex';
import comment from "./Comment";

let mapStateObj = mapState(['userid'])

export default {
  inject: ["routerReload"],
  data() {
    return {
      showComment:false,
      dialogVisible: false,
      newEdit: {},
      time: this.cardData.addtime,
      userName: this.cardData.writer.name,
      cardContent: this.cardData.content,
      lookmore: "",
      saveContent: "",
      circleUrl:
        "",
      isShowEmojiPanel: false,
      imgUrl: this.cardData.imgUrl,
      like:this.cardData.likeNumber,
      iflike:'',
      collectState:0,
    };
  },
  props: ["cardData"],
  computed: {
    srcList: function() {
      let srcLists = [];
      for (let i of this.imgUrl) {
        srcLists.push(i.url);
      }
      return srcLists;
    },
    ...mapStateObj,
  },
  methods: {
    reload() {
      this.routerReload();
    },
    editContent() {
      this.saveContent = this.saveContent.replace(
        /<span(.*?)<\/span>/g,
        this.noemoji
      );
      this.dialogVisible = true;
      this.newEdit = { content: this.saveContent, id: this.cardData._id };
      // console.log(this.newEdit)
    },
    finishEdit() {
      let edit_text = document.querySelector(".edit_textarea").innerHTML;
      edit_text = edit_text.replace(/:.*?:/g, this.emoji);
      console.log(edit_text);
      if (!edit_text) {
        return;
      }
      let addTime = this.$moment().format("YYYY年MM月DD日 HH:mm:ss");
      this.newEdit.addTime = addTime;
      this.newEdit.content = edit_text;
      console.log(this.newEdit);
      this.$http
        .put("/dynamics", this.newEdit)
        .then(res => {
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    removeContent() {
      let _this = this;
      let id = _this.cardData._id;
      this.$http
        .delete("/dynamics", { data: { id } })
        .then(res => {
          // console.log(res.data)
          this.reload();
        })
        .catch(err => {
          console.log(err);
        });
    },
    errorHandler() {
      return true;
    },
    showMore() {
      // console.log('123');
      let that = this;
      that.saveContent = that.cardContent;
      let length = that.cardContent.length;
      if (length > 156) {
        that.lookmore = "...查看更多";
        that.cardContent = that.cardContent.slice(0, 156);
        // that.showM=true;
      }
    },
    toggleMore() {
      let _this = this;
      if (_this.lookmore == "...查看更多") {
        _this.lookmore = "收起全文 ^";
        _this.cardContent = _this.saveContent;
      } else {
        _this.showMore();
      }
    },
    showEmojiPanel() {
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },
    noemoji(word) {
      const type = word.slice(37, word.length - 26);
      return `:${type}:`;
    },
    emoji(word) {
      const type = word.slice(1, word.length - 1);
      return `<span class="emoji-item-common emoji-${type} emoji-size-small"></span>`;
    },
    appendEmoji(text) {
      let edit_textarea = document.querySelector(".edit_textarea").innerHTML;
      this.saveContent = `${edit_textarea}:${text}:`;
      // console.log(this.saveContent);
    },
    getCollectionStatus:async function(){
      let dynamic_id=this.cardData._id;
      let res=await this.$http.post("/collection/status",{dynamic_id}).catch(err=>console.log(err))
        // console.log(res);
        if(res.data.status==1){
          this.collectState=1;
        }
    },
    collection: async function() {
      let dynamic_id = this.cardData._id;
      if (this.collectState == 0) {
        try {
          let res = await this.$http.post("/collection", { dynamic_id });
          // console.log(res);
          if(res.data){
            this.collectState = 1;
            }   
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          let res = await this.$http.delete("/collection", {data:{dynamic_id}});
          // console.log(res);
          if (res.data) {
            this.collectState = 0;
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    getLikeStatus:async function(){
      let dynamic_id=this.cardData._id;
      let res=await this.$http.post("/api/like/status",{dynamic_id}).catch(err=>console.log(err))
        // console.log(res);
        if(res.data.status==1){
          this.iflike='#fa894e';
        }
    },
    toggleLike:async function(){
      let dynamic_id = this.cardData._id;
      if (!this.iflike) {
          let res = await this.$http.post("/api/like", { dynamic_id }).catch(err=>{console.log(err)});
          // console.log(res);
          let result = res.data.resultCode;
          if (result == 1) {
            this.iflike='#fa894e';
            this.like++;
          }
      } else {
          let res = await this.$http.delete("/api/like", {data:{dynamic_id}}).catch(err=>console.log(err));
          // console.log(res);
          let result = res.data.resultCode;
          if (result == 1) {
            this.iflike='';
            this.like--;
          }
        }
    },
    getInfo() {
      this.circleUrl=this.cardData.writer.userUrl;
    },
  },

  components: {
    publishDy,
    EmojiPanel,
    comment,
  },
  beforeMount:function(){
    this.getCollectionStatus();
    this.getLikeStatus();
    this.getInfo();
  },
  mounted: function() {
    this.showMore();
    // console.log(this.userid);
  }
};
</script>

<style lang="less">
.publish_card {
  background-color: #ffffff;
  //   box-sizing: border-box;
  //   width: 100%;
  // padding-bottom: 8px;
  .el-dialog__header {
    padding: 16px 0 0 8px;
  }
  .el-dialog__body {
    padding: 0;
  }
  .edit_textarea {
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
  .card_face {
    float: left;
    padding: 0px;
    width: 10%;
  }
  .card_content {
    position: relative;
    float: left;
    width: 90%;
    .el-dropdown {
      position: absolute;
      right: 0;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #333333;
    }

    .card_username {
      color: #333333;
      font-weight: bold;
    }

    .card_time {
      padding: 5px 0;
      font-size: 12px;
    }

    .card_main_text {
      font-size: 14px;
      line-height: 24px;
    }

    .card_main_img {
      max-width: 400px;
      .el-image{
        margin-right: 3px;
      }
    }

    .card_main_more {
      display: inline-block;
      color: #fa7d3c;
      cursor: pointer;
    }
  }
  .card_buttom {
    background-color: #fff;
    width: 100%;
    span {
      width: 33%;
      text-align: center;
      margin-top: 8px;
      margin-bottom: 8px;
      display: inline-block;
      // padding: 0 12.5%;
      border-left: 1px solid #d9d9d9;
      &:hover {
        color: #fa7d3c;
      }
      i {
        padding-right: 4px;
      }
    }
  }
  .clear {
    clear: both;
  }
}
</style>