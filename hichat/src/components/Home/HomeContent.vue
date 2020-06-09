<template>
  <div
    class="HL_home"
    :style="{backgroundImage: 'url('+bgimg+')',backgroundColor:bgcolor, backgroundRepeat:repeat,}"
  >
    <div :class="{HL_bg_repeat}" :style="{backgroundImage: 'url('+bgRepeat+')'}">
      <div class="changeSkin" @click="changeSkin"></div>
      <div class="HL_main" :style="{backgroundColor: rgba,}">
        <div class="HL_left_fixed">
          <div class="HL_left" :class="{addfix:isTrue,addhover:addhover}">
            <router-link to="/home">首页</router-link>
            <router-link to="/collection">我的收藏</router-link>
            <router-link to="/ilike">我喜欢的</router-link>
            <router-link to="/dymine">我发布的</router-link>
          </div>
        </div>
        <div class="HL_right_main">
          <router-view v-if="isRouterAlive"></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
let mapStateObj = mapState(["personBgImg"]);
let mapMutationsObj = mapMutations(["setPersonBgImg"]);
export default {
  provide() {
    return {
      routerReload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true,
      HL_bg_repeat:true,
      isTrue: false,
      bgimg: require("../../assets/img/body_repeat.png"),
      bgcolor: "#cbc8be ",
      repeat: "repeat",
      rgba: "rgba(38,33,10,0.15)",
      bgRepeat: require("../../assets/img/body_bg.jpg"),
      addhover: false
    };
  },
  computed: {
    ...mapStateObj
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => (this.isRouterAlive = true));
    },
    onSoroll(e) {
      // let origOffsetY = HL_left_fixed.offsetTop;
      // console.log(origOffsetY-top_header)
      let documentY = document.documentElement.scrollTop;
      // console.log(documentY)
      documentY >= 248 ? (this.isTrue = true) : (this.isTrue = false);
    },

    debounce(cb, waitTime) {
      let timeout;
      return function() {
        clearTimeout(timeout);
        timeout = setTimeout(cb, 10);
      };
    },
    changeSkin() {
      if (this.bgRepeat == require("../../assets/img/body_bg.jpg")) {
        this.bgimg ='';
        this.setPersonBgImg(require("../../assets/img/personal1.jpg"));
        this.bgRepeat=require("../../assets/img/body_bg1.jpg");
        this.bgcolor = "#235a6f";
        this.repeat = "no-repeat";
        this.rgba = "rgba(92,185,220,0.15)";
        this.addhover = true;
        // console.log(document.querySelectorAll('.HL_left a'))
      } else {
        this.bgRepeat=require("../../assets/img/body_bg.jpg")
        this.bgimg = require("../../assets/img/body_repeat.png");
        this.setPersonBgImg(require("../../assets/img/personal.jpg"));
        this.bgcolor = "#b4daf0";
        this.repeat = "repeat";
        this.rgba = "rgba(38,33,10,0.15)";
        this.addhover = false;
      }
    },
    
    ...mapMutationsObj
  },
  mounted: function() {
    //滚动事件
    window.addEventListener("scroll", this.debounce(this.onSoroll, 200), false);
  },
  destroyed: function() {
    window.removeEventListener("scroll", this.debounce(this.onSoroll, 200));
  }
};
</script>

<style lang="less" scoped>
ul {
  margin: 0;
  padding: 0;
}
.HL_home {
  // background-color: #b4daf0;
  // background-image: url(../../assets/img/body_bg.jpg);
  // background-repeat:repeat-x;
  background-position: center 0;
  .HL_bg_repeat {
    padding-top: 284px;
    // position: fixed;
    background-position: center 0;
    background-repeat: no-repeat;
    // background-position: center 0;
  }
  .changeSkin {
    background-image: url("../../assets/icon/styleicon.png");
    height: 30px;
    width: 30px;
    position: fixed;
    top: 50px;
    right: 0;
    color: 24px;
    z-index: 9999;
    cursor: pointer;
    transition: all linear 0.3s;
    &:hover {
      transform: scale(1.3, 1.3);
    }
  }
}
.HL_main {
  padding-top: 16px;
  min-height: 700px;
  width: 1100px;
  // background-color: rgba(70,149,194,0.3);
  margin: 0 auto;
}
@media screen and (max-width: 1206px) {
  .HL_main {
    width: 1000px;
  }
}
@media screen and (max-width: 1006px) {
  .HL_main {
    width: 760px;
  }
}
//左侧固定
.HL_left_fixed {
  width: 150px;
  display: inline-block;
  position: relative;
}
.HL_left {
  a {
    display: inline-block;
    width: 100%;
    color: #353535;
    box-sizing: border-box;
    padding-left: 16px;
    font-weight: 600;
    font-size: 14px;
    line-height: 34px;
  }
  .router-link-active {
    background-color: rgba(38,33,10,0.15);
    // rgba(8, 4, 1, 0.25)
  }
  a:hover {
    background-color: rgba(38,33,10,0.15);
  }
  width: 150px;
  display: inline-block;
}
.addhover {
  a{
    color: #73d5f9;
  }
  .router-link-active {
    background-color: rgba(92,185,220,0.15);
    // rgba(8, 4, 1, 0.25)
  }
  a:hover {
    background-color: rgba(92,185,220,0.15);
  }
}

.HL_right_main {
  vertical-align: top;
  display: inline-block;
  width: 950px;
}
@media screen and (max-width: 1206px) {
  .HL_right_main {
    width: 850px;
  }
}
@media screen and (max-width: 1006px) {
  .HL_right_main {
    width: 600px;
  }
}
.addfix {
  position: fixed;
  top: 50px;
}
</style>