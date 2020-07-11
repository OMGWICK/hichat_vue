<template>
  <div>
    <div class="HL_publish">
      <div class="HL_publish_m">
        <div class="HL_publish_zj">
          <publishdy></publishdy>
        </div>

          <div>
        <div class="HL_card_zj" style="" v-for="(item,index) in cardList" :key="'a'+index">
          <publish-card :card-data="item"></publish-card>
        </div>
        <p class="load_more" v-if="loading" @click="load">
          点击此处，加载更多...
        </p>
        </div>
        
      </div>
      <div class="HL_publish_r">
        <publish-right></publish-right>
      </div>
    </div>
  </div>
</template>

<script>
import publishdy from "./PublishDy.vue";
import publishCard from "./PublishCard.vue";
import publishRight from "./PublishRight.vue";

export default {
  data: function() {
    return {
      cardList: [],
      count: 1,
      // loading: true,
      totalPages: "",//返回内容的总页数
    };
  },
  computed:{
    loading(){
      return this.count<this.totalPages;
    },
  },
  methods: {
    load(){
      console.log('123')
      setTimeout(() => {
        this.count += 1; //页数+1
        this.getPageData(); //页数+1，查询下一页数据
      }, 500);
    },
    getPageData:async function(){
        let params={
        pageNumber:this.count,
        pageSize:10,
      };
      let res = await this.$http.get("/dynamics/page",{params}).catch(err=>console.log(err));
      let resData=res.data.docs;
      this.cardList =this.cardList.concat(resData);
      this.totalPages = Math.ceil(res.data.total/10);
    },
    searchData:async function(searchWord){
      let res =await this.$http.get("dynamics",{params:{searchWord}}).catch(err=>console.log(err));
      this.cardList=res.data;
      // console.log(res);
    },
    getData: async function() {
      if (Object.keys(this.$route.params).length == 0) {
        this.getPageData()
        return;
      }
      let searchWord = this.$route.params.word;
      this.searchData(searchWord)
    },
  },
  components: {
    publishdy,
    publishCard,
    publishRight
  },
  beforeMount() {
    this.getData();
  },
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
  .load_more{
    width: 100%;
    color: #333333;
    text-align: center;
    background-color: #ffffff;
    padding: 5px 0;
    cursor: pointer;
    margin-bottom: 16px;
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
</style>