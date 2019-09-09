<template>
  <div id="index">
    <header>
      <div class="top">
        <span></span>
        基本信息
      </div>
      <div class="btm">
        <ul>
          <li>
            机构名称：
            <span>{{title}}</span>
          </li>
          <li>
            到期时间：
            <span>2030年1月1日</span>
          </li>
          <li>
            客服专员：
            <span>郑江昆 18691891767</span>
          </li>
        </ul>
      </div>
    </header>
    <div id="bg" v-show="xian"></div>
    <div class="tanBox" v-show="xian">
      <div class="top">新增平台</div>
      <ul>
        <li>
          <span>网址类型：</span>
          <el-select v-model="value" placeholder="请选择" class="wid">
            <el-option
              class="wid"
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            ></el-option>
          </el-select>
          <span class="red" style="margin-left:6px">*</span>
        </li>
        <li>
          <span>网站名称：</span>
          <el-input
            placeholder="示例：腾讯新闻"
            v-model="input1"
            clearable
            class="wid"
            type="url"
            maxlength="20"
          ></el-input>
          <span class="red" style="margin-left:6px">*</span>
        </li>
        <li>
          <span>网站网址：</span>
          <el-input
            placeholder="示例：http://www.tencent.com"
            v-model="input2"
            clearable
            class="wid"
            type="url"
          ></el-input>
          <span class="red" style="margin-left:6px">*</span>
        </li>
        <li>
          <span>跟评网址：</span>
          <el-input
            placeholder="示例：http://www.bttieba.com/545"
            v-model="input3"
            clearable
            class="wid"
            type="url"
          ></el-input>
        </li>
      </ul>
      <div class="anniu" style="padding-left:168px;padding-top:32px">
        <el-button type="primary" style="margin-right:24px;width:100px" @click="yes()">确定</el-button>
        <el-button plain style="width:100px" @click="no()">取消</el-button>
      </div>
    </div>
    <section>
      <div class="top">
        <span></span>
        监测平台情况
      </div>
      <div class="zhong">
        <div class="btn" @click="bgX()">
          <span>+</span>新增平台
        </div>
        <table cellspacing="0" cellpadding="0">
          <tr class="t1">
            <td>序号</td>
            <td>平台类型</td>
            <td>平台名称</td>
            <td>平台网址</td>
            <td>状态</td>
          </tr>
          <tr v-for="(val,index) in crr">
            <td>{{(currentPage1-1)*curPageSize1+index+1}}</td>
            <td v-if="val.typeId==1">新闻网站</td>
            <td v-else-if="val.typeId==2">自媒体</td>
            <td v-else>论坛贴吧</td>
            <td>{{val.name}}</td>
            <td>{{val.websiteUrl}}</td>
            <td v-if="val.status==0">
              <span style="color:#c2ea5d;margin-right:4px">·</span>开发中
            </td>
            <td v-else-if="val.status==1">
              <span style="color:#4680ff;margin-right:4px">·</span>正常
            </td>
          </tr>
        </table>
        <div class="block page">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="curPageSize1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="zong*1"
          ></el-pagination>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      crr: [],
      zong: "",
      xian: false,
      input1: "",
      input2: "",
      input3: "",
      currentPage1: 1,
      curPageSize1: 10,
      options: [
        {
          value: "1",
          label: "新闻网站"
        },
        {
          value: "2",
          label: "自媒体"
        },
        {
          value: "3",
          label: "论坛贴吧"
        }
      ],
      value: "",
      page: 10,
      title: ""
    };
  },
  methods: {
    handleSizeChange(val) {
      this.curPageSize1 = val;
      this.$router.push({
        query: { page: this.currentPage1, pageSize: this.curPageSize1 }
      });
      this.planCom();
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.$router.push({
        query: { page: this.currentPage1, pageSize: this.curPageSize1 }
      });
      this.planCom();
    },
    yes() {
      let _this = this;
      let type;
      let planType = {
        新闻网站: 1,
        自媒体: 2,
        论坛贴吧: 3
      };
      if (this.value != "") {
        type = planType[this.value];
      }
      var reg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      var obj = {
        TypeId: type,
        Name: _this.input1.trim(),
        WebsiteUrl: _this.input2.trim(),
        FollowWebSiteUrl: _this.input3.trim()
      };
      console.log(reg.test(obj.WebsiteUrl));
      if (
        obj.TypeId != "" &&
        obj.Name != "" &&
        obj.WebsiteUrl != "" &&
        reg.test(obj.WebsiteUrl)
      ) {
        if (obj.FollowWebSiteUrl != "" && !reg.test(obj.FollowWebSiteUrl)) {
          this.$message({
            type: "info",
            message: "请输入必填内容或正确网址"
          });
          return false;
        }
        this.$axios
          .post(`${url}api/Website/AddPlatform`, obj)
          .then(
            res => {
              if (res.data.isOperationSuccess) {
                this.xian = false;
                this.$message({
                  type: "success",
                  message: "添加成功"
                });
                this.flag = false;
                this.value = "";
                this.input1 = "";
                this.input2 = "";
                this.input3 = "";
                this.planCom();
              }
            },
            err => {
              console.log(err);
            }
          )
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message({
          type: "info",
          message: "请输入必填内容或正确网址"
        });
      }
    },
    no() {
      this.xian = false;
      this.value = "";
      this.input1 = "";
      this.input2 = "";
      this.input3 = "";
    },
    bgX() {
      this.xian = true;
    },
    planCom() {
      this.$axios
        .get(`${url}api/Website/GetWebsiteList`)
        .then(res => {
          if (res.data.code == 1000) {
            window.open(
              `http://www.yuqing.pro/Login.aspx?returnto=${url}`,
              "_self"
            );
          }
          if (res.data.code == 1001) {
            this.$alert("该账号没有权限", "小提示", {
              confirmButtonText: "确定",
              callback: action => {
                window.location.href = `http://login.yuqing.pro/Logout.ashx?ajax=0&redirect=${url}`;
              }
            });
          }
          if (res.data.isOperationSuccess) {
            let arr = res.data.result;
            let planCrr = arr.websiteModelList;
            this.zong = planCrr.length;
            this.fenArr(planCrr);
          }
        });
    },
    fenArr(planCrr) {
      let _this = this;
      let len = planCrr.length;
      let num = _this.curPageSize1;
      let brr = [];
      let brrLen = len % num == 0 ? len / num : Math.floor(len / num + 1);
      for (let i = 0; i < brrLen; i++) {
        let crr = [];
        crr = planCrr.slice(i * num, i * num + num);
        brr.push(crr);
      }
      _this.crr = brr[_this.currentPage1 - 1];
      // console.log(brr)
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.title = sessionStorage.getItem("jigouName");
    document.querySelector("body").style.overflowY = "auto";
    this.planCom();
    if (this.$route.query.page) {
      this.currentPage1 = this.$route.query.page * 1;
      this.curPageSize1 = this.$route.query.pageSize * 1;
    } else {
      this.$router.push({
        query: { page: this.currentPage1, pageSize: this.curPageSize1 }
      });
    }
  },
  updated() {}
};
</script>

<style scoped="scoped" lang="less">
#bg {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background: black;
  /*定义透明度   0 - 1 */
  opacity: 0.5;
  z-index: 10;
}

.tanBox {
  width: 480px;
  height: 397px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.16);
  position: absolute;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  ul {
    li {
      padding-left: 72px;
      height: 60px;
      line-height: 60px;
      .red {
        color: red;
      }
    }
  }
  .top {
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(48, 49, 50, 1);
  }
  .wid {
    width: 250px;
    height: 36px;
  }
}
.flex {
  display: flex;
}

.box {
  box-sizing: border-box;
}

.cen {
  text-align: center;
}
.quan {
  width: 140px;
  height: 140px;
  .cen;
}
.top {
  height: 70px;
  background: rgba(255, 255, 255, 1);
  line-height: 70px;
  .flex;
  align-items: center;
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(48, 49, 51, 1);
  padding-left: 24px;
}
.top span {
  width: 3px;
  height: 16px;
  background: rgba(117, 178, 255, 1);
  display: block;
  margin-right: 3px;
}
.btm {
  ul {
    .flex;
    justify-content: space-between;
    padding-left: 24px;
    li {
      width: 28%;
    }
  }
}
header {
  height: 114px;
  background: rgba(255, 255, 255, 1);
}
section {
  margin-top: 24px;
  background: rgba(255, 255, 255, 1);
  .btn {
    width: 100px;
    height: 36px;
    border-radius: 4px;
    border: 1px solid rgba(213, 215, 221, 1);
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(70, 128, 255, 1);
    .flex;
    align-items: center;
    cursor: pointer;
    text-align: center;
    span {
      padding-left: 10px;
      padding-right: 3px;
    }
  }
  .zhong {
    padding: 0px 40px;
    padding-bottom: 240px;
  }
  table {
    width: 100%;
    margin-top: 16px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(96, 98, 102, 1);
    tr {
      height: 56px;
      td {
        padding-left: 40px;
        border-bottom: 1px solid rgba(213, 215, 221, 1);
        span {
          margin-right: 3px;
          color: red;
          font-weight: bold;
        }
      }
    }
    tr:hover {
      background: #e2f1ff;
    }
    .t1 {
      background: rgba(246, 246, 246, 1);
      td {
        border: 0px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(48, 49, 50, 1);
      }
    }
  }
  .page {
    float: right;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>