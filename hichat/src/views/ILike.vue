<template>
  <div>
    <div class="HL_publish">
      <div class="HL_publish_m">
        <div class="HL_publish_zj">
            <div class="HL_collect">我赞过的</div>
        </div>
        <div class="HL_card_zj" v-for="(item,index) in cardList" :key="'a'+index">
          <publish-card :card-data="item"></publish-card>
        </div>
      </div>
      <div class="HL_publish_r">

        <notice>
      <template slot="title">
        点赞小知识
      </template>
      <template slot="content">
          <p>Q: 为什么要点赞嗨聊动态？<br/>A: 看到感兴趣的东西，你的点赞就是对内容最大的肯定！给别人点赞是一种欣赏也是一种鼓励！</p>
        <p>Q: 如何点赞和取消点赞？<br/>A: 看见动态右下角的大拇指了吗？尝试着点一点！</p>
<p>Q: 我的点赞:<br/>A: 在这里你可以看见你所有点赞过的内容！</p>
      </template>
    </notice>
    
    <notice>
      <template slot="title">
         嗨聊意见反馈
      </template>
      <template slot="content">
        <span style="color:#e6a23c;">请留下您在使用过程中遇到的问题或提出宝贵建议,您也可以添加QQ: 1396520472 进行交流</span>
      </template>
    </notice>
    <notice>
      <template slot="title">
        公告通知栏
      </template>
      <template slot="content">
        <span style="color:#e6a23c;">欢迎使用嗨聊并提出宝贵建议。<br/>请各位嗨友自觉维护嗨聊形象,严禁发布有损嗨聊形象的言论,共同营造一个和谐,温馨的嗨聊平台。</span>
      </template>
    </notice>
      </div>
    </div>
  </div>
</template>

<script>
import publishCard from "../components/Home/PublishCard";
import notice from "../components/common/notice";

export default {
  data: function() {
    return {
      cardList: []
    };
  },
  methods: {
    getData: async function() {
      let res = await this.$http.get("api/like").catch(err => console.log(err));
        // console.log(res);
        this.cardList = res.data.map((item)=>{
            return item.dynamic_id
        })
    }
  },
  components: {
    publishCard,
    notice,
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
// .HL_publish {
//   background: red;
// }
.HL_publish_m {
  vertical-align: top;
  display: inline-block;
  width: 684px;
  margin-right: 16px;
  .HL_collect{
      background-color: #FFFFFF;
      padding: 10px;
      font-weight: bold;
      font-size: 14px;
  }
  .HL_publish_zj {
    width: 100%;
    margin-bottom: 16px;
  }
  .HL_card_zj {
    width: 100%;
    margin-bottom: 16px;
  }
}
@media screen and (max-width: 1206px) {
  .HL_publish_m {
    width: 584px;
  }
}
.HL_publish_r {
  height: 20px;
  display: inline-block;
  vertical-align: top;
  width: 230px;
  margin-right: 10px;
}
@media screen and (max-width:1006px) {
  .HL_publish_r{
    display: none;
  }
}
</style>