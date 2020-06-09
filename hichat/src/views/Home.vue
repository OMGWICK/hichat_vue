<template>
  <div class="home">
    <el-backtop></el-backtop>
    <header class="top-nav top_header">
      <div class="nav-content">
        <a href="/">
          <img src="@/assets/hilogo.png" alt title="嗨聊" />
        </a>

        <div class="nav-search">
          <input
            type="text"
            class="nav-search-input"
            placeholder="请输入要搜索的内容"
            v-model="searchContent"
            @keydown.enter="search"
          />
          <i class="el-icon-search" @click="search"></i>
        </div>

        <div class="nav_top_right">
          <div class="nav-list">
            <ul>
              <li>
                <router-link to="/home">
                  <i class="zi zi_home"></i>首页
                </router-link>
              </li>
              <li>
                <router-link to="/user">
                  <i class="zi zi_useralt"></i>个人中心
                </router-link>
              </li>
              <!-- 实验登陆 -->
              <!-- <li>
                <router-link to="/login">
                  <i class="zi zi_useralt"></i>登陆
                </router-link>
              </li> -->
            </ul>
          </div>

          <div class="nav-right">
            <i class="el-icon-message"></i>
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-setting" title="设置"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <i class="el-icon-edit-outline" @click="dialogVisible = true" title="点我试一试！"></i>
          </div>

          <el-dialog :visible.sync="dialogVisible" width="35%">
            <publishdy></publishdy>
          </el-dialog>
        </div>
      </div>
    </header>
    <router-view></router-view>
    <hlfooter></hlfooter>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import hlfooter from "@/components/HLFooter.vue";
import publishdy from "../components/Home/PublishDy";

export default {
  name: "Home",
  data: function() {
    return {
      searchContent: "",
      dialogVisible: false
    };
  },
  components: {
    hlfooter,
    publishdy
  },
  methods: {
    search() {
      //  console.log(this.$route)
      this.$router.push({
        name: "Search",
        params: { word: this.searchContent }
      });
    },
    logout() {
      this.$http.post("/user/logout").then(res => {
        if (res.data.resultCode == 1) {
          this.$message({
            message: "退出成功!",
            offset: 60,
            type: "success"
          });
          this.$router.push('/login');
        } else {
          this.$message.error("退出失败!");
        }
      }).catch(err=>console.log(err));
      ;
    }
  }
};
</script>

<style lang="less">
.nav_top_right {
  right: 10px;
  height: 50px;
  vertical-align: top;
  display: inline-block;
  position: absolute;
  .el-dialog__header {
    padding: 16px 0 0 8px;
  }
  .el-dialog__body {
    padding: 0;
  }
}
.top-nav {
  z-index: 999999;
  width: 100%;
  position: fixed;
  top: 0;
  box-shadow: 0 0 1px 0px rgba(0, 0, 0, 0.3), 0 0 6px 2px rgba(0, 0, 0, 0.15);
  height: 50px;
  border-top: 1px solid #eb7350;
  background: #fff;
}
.nav-content {
  width: 1480px;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.nav-content {
  img {
    width: 80px;
    padding: 5px;
  }
}
.nav-search {
  display: inline-block;
  vertical-align: top;
  margin-top: 12px;
  margin-left: 10px;
  position: relative;
  .nav-search-input {
    padding: 4px 30px 4px 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    outline: none;
    &:focus {
      border: 1px solid #eb7350;
    }
  }
}
@media screen and (min-width: 1495px) {
  .nav-search {
    width: 468px;
  }
  .nav-search-input {
    width: 425px;
  }
}
@media screen and (max-width: 1495px) {
  .nav-content {
    width: 1200px;
  }
  .nav-search {
    width: 318px;
  }
  .nav-search-input {
    width: 275px;
  }
}
@media screen and (max-width: 1206px) {
  .nav-content {
    width: 960px;
  }
  .nav-search {
    width: 258px;
  }
  .nav-search-input {
    width: 215px;
  }
}
@media screen and (max-width: 1006px) {
  .nav-content {
    width: 760px;
  }
  .nav-search {
    width: 158px;
  }
  .nav-search-input {
    width: 115px;
  }
}
.el-icon-search {
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 5px;
}
.nav-list {
  height: 50px;
  display: inline-block;
  padding: 0px;
  margin-top: 0px;
  margin-right: 10px;
  vertical-align: top;
  text-align: right;
  ul {
    display: flex;
    list-style: none;
    padding: 0px;
    margin: 0px;
    li {
      .router-link-active {
        color: #eb7350;
      }
      color: #787a7a;
      padding: 15px;
    }
  }
}
.zi_home,
.zi_useralt {
  padding-right: 5px;
}

.nav-right {
  // right: 10px;
  // height: 50px;
  display: inline-block;
  vertical-align: top;
  // position: absolute;
  &::before {
    content: "";
    padding-top: 2px;
    border: 1px solid #787a7a;
  }
  i {
    cursor: pointer;
    padding: 12px;
    font-size: 24px;
    &:hover {
      color: #eb7350;
    }
  }
}
</style>
