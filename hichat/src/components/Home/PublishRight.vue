<template>
  <div class="publish_right">
    <div class="publish_person">
      <div class="bgImg" :style="{backgroundImage: 'url('+personBgImg+')'}"></div>
      <div class="person_bt">
        <div class="person_bt_name">{{name}}</div>
        <div class="person_bt_m">
          <ul>
            <li>
              <router-link to="/collection">
                <strong>{{collectNumber?collectNumber:0}}</strong>
                <div>收藏</div>
              </router-link>
            </li>
            <li>
              <router-link to="/dymine">
                <strong>{{myDyNumber?myDyNumber:0}}</strong>
                <div>动态</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="person_face">
        <el-avatar :size="60" :src="circleUrl" @error="errorHandler" @click.native="toUser">
          <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        </el-avatar>
      </div>
    </div>
    <div class="publish_r_hot">
      <div class="hot_title">
        <h4>热门动态</h4>
      </div>
      <div class="publish_r_txt">
        <ul>
          <li v-for="(list,index) in hotList" :key="index+'b'">
            <span class="hot_left" v-html="delHtmlTag(list.content)"></span>
            <span class="hot_right" >{{list.likeNumber}}</span>
          </li>
          
        </ul>
      </div>
      <div class="publish_r_more">仅显示前十热门动态</div>
    </div>
    <notice>
      <template slot="title">
        公告通知栏
      </template>
      <template slot="content">
        <span style="color:#e6a23c;">欢迎使用嗨聊并提出宝贵建议。<br/>请各位嗨友自觉维护嗨聊形象,严禁发布有损嗨聊形象的言论,共同营造一个和谐,温馨的嗨聊平台。</span>
      </template>
    </notice>
  </div>
</template>

<script>
import notice from '../common/notice'
import {mapState} from 'vuex'
let mapStateObj=mapState(['personBgImg']);
export default {
  data() {
    return {
      circleUrl:
        "",
      hotList:[],
      collectNumber:'',
      myDyNumber:'',
      name:'',
    };
  },
  props:["cardData"],
  computed:{
    ...mapStateObj,
  },
  methods: {
    errorHandler() {
      return true;
    },
    toUser(){
      this.$router.push("/user");
    },
    getHotData:async function(){
      let _this=this;
      let res =await _this.$http.get('/dynamics/hotlist').catch(err=>console.log(err))
      _this.hotList = res.data;
    },
    delHtmlTag(str){
    if(str){
    return str.replace(/<[^>]+>/g,"");
    }
  },
  getCollection: async function() {
      let res = await this.$http.get("/collection").catch(err => console.log(err));
      this.collectNumber = res.data.length;
    },
    getMyDyNumber: async function() {
      let res = await this.$http.get("/dynamics/mine").catch(err => console.log(err));
      this.myDyNumber = res.data.length;
    },
    getinfo(){
      this.$http
        .get("/user/info")
        .then(res => {
          this.circleUrl=res.data.userUrl;
          this.name = res.data.name;
        })
        .catch(err => console.log(err));
    }
  },
  components:{
    notice,
  },
  beforeMount(){
    this.getHotData()
    this.getCollection()
    this.getMyDyNumber()
    this.getinfo();
  }
};
</script>

<style lang="less" scoped>
@media screen and (max-width:1006px) {
  .publish_right{
    display: none;
  }
}
.publish_person {
  position: relative;
  height: 156px;
  width: 100%;
  border-radius: 2px;
  background-color: #ffffff;
  margin-bottom: 10px;
  .bgImg {
    width: 100%;
    height: 64px;
    // background-image: url("../../assets/img/personal.jpg");
  }
  .person_bt {
    text-align: center;
    padding-top: 16px;
    ul {
      display: flex;
      padding: 0 10px;
      li {
        padding: 0 40px;
        font-size: 12px;
        a:hover {
          color: #e6a23c;
        }
        strong {
          font-size: 18px;
        }
        div {
          color: #444;
        }
      }
      li:first-child {
        border-right: 1px solid #d9d9d9;
      }
    }
    .person_bt_name {
      font-weight: bold;
    }
    .person_bt_m {
      padding-top: 6px;
    }
  }
  .person_face {
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: 20px;
    left: 50%;
    margin-left: -30px;
  }
}
.publish_r_hot {
  background-color: #ffffff;
  margin-bottom: 10px;
  .hot_title {
    border-bottom: 1px solid #d9d9d9;
    padding-left: 14px;
    line-height: 46px;
    font-size: 14px;
    font-weight: 800;
    font-family: serif;
    color: #333333;
    h4 {
      margin: 0;
    }
  }
  .publish_r_txt {
    padding: 14px;
    li {
      padding: 6px 0;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      .hot_left{
        font-size: 14px;
        width: 80%;
        overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
      }
    }
  }
  .publish_r_more {
    border-top: 1px solid #d9d9d9;
    text-align: center;
    line-height: 46px;
    font-size: 12px;
    font-weight: 800;
    font-family: serif;
  }
}
.pl_notice {
  background: #ffffff;

  .pl_f_notice {
    padding-left: 14px;
    border-bottom: 1px solid #d9d9d9;
    text-align: left;
    line-height: 46px;
    font-size: 14px;
    font-weight: 800;
    font-family: Arial, Helvetica, sans-serif;
  }
  p {
    margin: 0px;
    padding: 14px;
    font-size: 12px;
    color: #e6a23c;
    letter-spacing: 2px;
    line-height: 16px;
  }
}
</style>