<template>
  <div>
    <div class="HL_publish">
      <div class="HL_publish_m">
        <div class="HL_publish_zj">
            <div class="HL_collect">我的动态</div>
        </div>
        <div class="HL_card_zj" v-for="(item,index) in cardList" :key="'a'+index">
          <publish-card :card-data="item"></publish-card>
        </div>
      </div>
      <div class="HL_publish_r">
        <notice>
      <template slot="title">
        动态小帮手
      </template>
      <template slot="content">
          <p>Q: 在这里你可以看到什么？<br/>A: 发布太多内容是不是找不到？在这里你可以找到你所有的发布内容！</p>
        <p>Q: 编辑你的动态：<br/>A: 写错了不要紧，点击动态右上角下箭头，编辑你的动态！。</p>
<p>Q: 删除你的动态：<br/>A: 若需要删除某条动态，点击动态右上角下箭头，在需要删除的某条动态点击删除，建议谨慎删除，此操作不可逆！</p>
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
      let res = await this.$http.get("/dynamics/mine").catch(err => console.log(err));
        this.cardList = res.data.reverse();
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