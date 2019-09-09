<template>
  <div class="hello">
    <header>
      <el-row>
        <div class="header">
          <div class="left">
            <img src="../assets/img/loog.png" alt class="loog" />
          </div>
          <el-col class="zhong">
            <span></span>
            <span>——</span>
            <span style="letter-spacing: 10px;" :xs="0">{{title}}</span>
          </el-col>
          <div class="right">
            <ul class="flex">
              <li></li>
              <li title="返回大厅" @click="open()" style="cursor: pointer;"></li>
              <li title="退出登录" @click="logOut()" style="cursor: pointer;"></li>
            </ul>
          </div>
        </div>
      </el-row>
      <nav>
        <ul class="flex">
          <router-link to="/index" tag="li">
            <a href="javascript:;">首页</a>
          </router-link>
          <router-link to="/monitoring" tag="li">
            <a href="javascript:;">实时监测</a>
          </router-link>
          <router-link to="/plan" tag="li">
            <a href="javascript:;">监测方案</a>
          </router-link>
          <router-link to="/statistical" tag="li">
            <a href="javascript:;">统计分析</a>
          </router-link>
          <router-link to="/set" tag="li">
            <a href="javascript:;">系统设置</a>
          </router-link>
          <router-link to="/ddd" tag="li">
            <a href="javascript:;">数据大屏</a>
          </router-link>
        </ul>
      </nav>
    </header>
    <div id="con" style=" background: #f3f6f7;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      title: ""
    };
  },
  methods: {
    // 返回大厅
    open() {
      window.location.href = "http://www.yuqing.pro";
    },
    logOut() {
      window.location.href = `http://login.yuqing.pro/Logout.ashx?ajax=0&redirect=${url}`;
    }
  },
  created() {
    this.$axios.get(url + "API/Website/GetAgencyName").then(res => {
      if (res.data.code == 1000) {
        window.open(
          `http://www.yuqing.pro/Login.aspx?returnto=${url}`,
          "_self"
        );
      }
      if (res.data.isOperationSuccess) {
        this.title = res.data.result;
        sessionStorage.setItem("jigouName", this.title);
      }
    });
  },
  // 挂载完成时
  mounted() {},
  updated() {}
};
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.box {
  box-sizing: border-box;
}
.cen {
  text-align: center;
}
header {
  .header {
    width: 100%;
    height: 54px;
    overflow: hidden;
    background: rgba(38, 38, 38, 1);
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 1);
    padding: 0 24px;
    .box;
    .flex;
    align-items: center;
    .left {
      width: 153px;
      .loog {
        width: 153px;
        height: 36px;
      }
    }
    .zhong {
      width: calc(100% - 153px - 140px);
      left: 200px;
      padding: 24px;
      overflow: hidden;
      margin-right: 24px;
      .flex;
      justify-content: flex-start;
      span:nth-child(1) {
        width: 280px;
        height: 28px;
        display: block;
        background: url(../assets/img/chi.png) no-repeat center center;
      }
      span:nth-child(2) {
        font-size: 18px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        margin: 0px 16px;
      }
      span:nth-child(3) {
        height: 26px;
        font-size: 18px;
        font-family: PingFang-SC-Regular;
        font-weight: 400;
        overflow: hidden;
        color: rgba(255, 255, 255, 1);
      }
    }
    .right {
      width: 140px;
      ul {
        li {
          width: 22px;
          height: 22px;
          margin-right: 24px;
        }
        li:nth-child(1) {
          background: url(../assets/img/user.png) no-repeat center center;
        }
        li:nth-child(2) {
          background: url(../assets/img/wei2.png) no-repeat center center;
        }
        li:nth-child(3) {
          background: url(../assets/img/wei3.png) no-repeat center center;
        }
      }
    }
  }
  nav {
    background: rgba(35, 46, 63, 1);
    z-index: 100000;
    ul {
      height: 60px;
      align-items: center;
      padding-left: 24px;
      li {
        margin: 0% 2%;
        margin-left: 0px;
        border-radius: 4px;
      }
      li.bg {
        background: rgba(50, 65, 90, 1);
      }
      li:hover {
        background: rgba(50, 65, 90, 1);
      }
      a {
        height: 50px;
        border-radius: 4px;
        line-height: 50px;
        text-align: right;
        padding-right: 26px;
        padding-left: 64px;
        font-size: 18px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        display: block;
        overflow: hidden;
        .box;
      }
      li:nth-child(1) a {
        background: url(../assets/img/Bitmap复制@2x.png) no-repeat 26px center;
        background-size: 30px 30px;
      }
      li:nth-child(2) a {
        background: url(../assets/img/位图@2x.png) no-repeat 26px center;
        background-size: 30px 30px;
      }
      li:nth-child(3) a {
        background: url(../assets/img/编组3@2x.png) no-repeat 26px center;
        background-size: 30px 30px;
      }
      li:nth-child(4) a {
        background: url(../assets/img/编组5@2x.png) no-repeat 26px center;
        background-size: 30px 30px;
      }
      li:nth-child(5) a {
        background: url(../assets/img/Bitmap复制7@2x.png) no-repeat 26px center;
        background-size: 30px 30px;
      }
      li:nth-child(6) a {
        background: url(../assets/img/Bitmap复制2@2x.png) no-repeat 26px center;
        background-size: 30px 30px;
      }
    }
  }
}
#con {
  width: 100%;
}
</style>
