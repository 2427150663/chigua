<template>
  <div id="index">
    <header>
      <nav>
        <el-row>
          <el-col :xs="23" :md="11" :lg="5" class="navCon">
            <div class="left"></div>
            <div class="right">
              <div class="tit blue">今日跟评来源网站</div>
              <div class="num">
                {{parseFloat(WebsiteCount).toLocaleString()}}
                <span>个</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="23" :md="11" :lg="5" class="navCon">
            <div class="left"></div>
            <div class="right">
              <div class="tit red">今日监测文章</div>
              <div class="num">
                <time v-if="TotalTopicCount>=10000">{{(TotalTopicCount/10000).toFixed(1)}}万</time>
                <time v-else>{{parseFloat(TotalTopicCount).toLocaleString()}}</time>
                <span>篇</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="23" :md="11" :lg="5" class="navCon">
            <div class="left"></div>
            <div class="right">
              <div class="tit green">当前运行监测方案</div>
              <div class="num">
                {{RunPlanCount}}/{{PlanCount}}
                <span>组</span>
              </div>
            </div>
          </el-col>
          <el-col :xs="23" :md="11" :lg="5" class="navCon">
            <div class="left"></div>
            <div class="right">
              <div class="tit yellow">今日监测跟评数</div>
              <div class="num">
                {{parseFloat(TotalFollowCount).toLocaleString()}}
                <span>条</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </nav>
      <div class="header"></div>
    </header>
    <div class="echart">
      <el-row class="echt">
        <el-col :xs="24" :md="24" :lg="24" class="echat"></el-col>
      </el-row>
      <div id="eLeft">今日监测跟评数</div>
      <div id="eRight">今日监测文章</div>
    </div>
    <section>
      <el-row class="ul">
        <el-col :xs="23" :md="11" :lg="5" class="li" v-for="val in brr" v-if="val.name!='天天快报'">
          <div class="name">{{val.name}}</div>
          <div class="left"></div>
          <div class="right">
            <div class="tit">
              今日监测文章
              <span>{{parseFloat(val.topicCount).toLocaleString()}}</span> 篇
            </div>
            <div class="num">
              今日监测跟评
              <span class="blue">{{parseFloat(val.followCount).toLocaleString()}}</span> 条
            </div>
          </div>
        </el-col>
        <!-- <el-col :xs="23" :md="11" :lg="5" class="li" v-for="val in brr" v-if="val.name=='天天快报'">
          <div class="name">{{val.name}}</div>
          <div class="left"></div>
          <div class="right">
            <div id="day">开发中</div>
            <div class="tit">
              今日监测文章
              <span>{{parseFloat(val.topicCount).toLocaleString()}}</span> 篇
            </div>
            <div class="num">
              今日监测跟评
              <span class="blue">{{parseFloat(val.followCount).toLocaleString()}}</span> 条
            </div>
          </div>
        </el-col>-->
      </el-row>
    </section>
    <footer>康奈网络@www.yuqing.cn</footer>
  </div>
</template>
<script>
export default {
  name: "Index",
  components: {},
  data() {
    return {
      brr: [],
      PlanCount: "",
      WebsiteCount: "",
      RunPlanCount: "",
      TotalTopicCount: "",
      TotalFollowCount: ""
    };
  },
  methods: {
    top() {
      this.$axios.get(url +"api/report/GetWebsiteAndPlan?customerid=1").then(res => {
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
              window.location.href = `http://login.yuqing.pro/Logout.ashx?ajax=0&redirect=${url}`
            }
          });
        }
        if (res.data.isOperationSuccess) {
          let dat = res.data.result;
          this.PlanCount = dat.planCount;
          this.WebsiteCount = dat.websiteCount;
          this.RunPlanCount = dat.runPlanCount;
          this.TotalTopicCount = dat.totalTopicCount;
          this.TotalFollowCount = dat.totalFollowCount;
        }
      });
    },
    zhong() {
      // 基于准备好的dom，初始化echarts实例
      let echat = document.querySelector(".echat");
      let myChart = echarts.init(echat);
      this.$axios.get(url+"api/report/GetStatisticData?customerId=1").then(res => {
        var dat = res.data;
        if (dat.isOperationSuccess) {
          //今日
          var arr = dat.result.info.topic;
          var brr = dat.result.info.follow;
          myChart.setOption({
            legend: {
              data: ["今日监测跟评数", "今日监测文章"]
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: {
              type: "category",
              // boundaryGap: false,
              data: [
                arr[6].displayTime,
                arr[5].displayTime,
                arr[4].displayTime,
                arr[3].displayTime,
                arr[2].displayTime,
                arr[1].displayTime,
                arr[0].displayTime
              ]
            },
            //鼠标悬停效果
            tooltip: {
              trigger: "axis"
            },
            yAxis: [
              {
                type: "value",
                //  splitLine: {show: false},
                // name: "今日监测跟评数",
                min: 0,
                axisLabel: {
                  formatter: "{value} "
                }
              },
              {
                type: "value",
                //隐藏背景线
                splitLine: { show: false },
                // name: "今日监测文章",
                min: 0,
                axisLabel: {
                  formatter: "{value} "
                }
              }
            ],
            series: [
              {
                name: "今日监测跟评数",
                type: "line",
                yAxisIndex: 0,
                data: [
                  brr[6].count,
                  brr[5].count,
                  brr[4].count,
                  brr[3].count,
                  brr[2].count,
                  brr[1].count,
                  brr[0].count
                ],
                itemStyle: {
                  normal: {
                    color: "blue",
                    barBorderRadius: [10, 10, 0, 0]
                  } //柱状颜色
                }
              },
              {
                name: "今日监测文章",
                type: "line",
                yAxisIndex: 1,
                data: [
                  arr[6].count,
                  arr[5].count,
                  arr[4].count,
                  arr[3].count,
                  arr[2].count,
                  arr[1].count,
                  arr[0].count
                ]
              }
            ]
          });
          window.onresize = function() {
            myChart.resize();
          };
        }
      });
    },
    bottom() {
      this.$axios
        .get(url +"api/report/GetWebsiteByTopicDataList")
        .then(res => {
          if (res.data.isOperationSuccess) {
            let dat = res.data.result;
            this.brr = dat.websiteReportList;
          }
        });
    }
  },
  computed: {},
  mounted() {
    this.zhong();
  },
  created() {
    this.top();
    this.bottom();
    document.querySelector("body").style.overflowY = "auto";
  },
  updated() {}
};
</script>
<style scoped="scoped">
.kt {
  justify-content: space-around;
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
.blue {
  color: #4680ff;
}
.red {
  color: #fc6180;
}
.green {
  color: #93be52;
}
.yellow {
  color: #ffb64d;
}
header nav {
  overflow: hidden;
  padding: 24px;
  padding-bottom: 0px;
}
header nav div.navCon {
  height: 100px;
  background: #ffffff;
  box-shadow: -2px 2px 4px 2px #faf7f7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 0px 2% 24px 2%;
}
header nav div.navCon:hover {
  cursor: pointer;
  box-shadow: -10px 10px 20px 10px rgba(30, 30, 30, 0.05);
}
header nav div.navCon .left {
  margin: 0px 4%;
  width: 40%;
  height: 60px;
}
header nav div.navCon .right .tit {
  font-size: 14px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
}
header nav div.navCon .right .num {
  font-size: 36px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #303132;
}
header nav div.navCon .right .num span {
  font-size: 16px;
  color: gray;
}
header nav div.navCon:nth-child(1) .left {
  background: url(../assets/img/wei5.png) no-repeat center center;
}
header nav div.navCon:nth-child(2) .left {
  background: url(../assets/img/wei6.png) no-repeat center center;
}
header nav div.navCon:nth-child(3) .left {
  background: url(../assets/img/wei7.png) no-repeat center center;
}
header nav div.navCon:nth-child(4) .left {
  background: url(../assets/img/wei8.png) no-repeat center center;
}
.echart {
  width: 100%;
  height: 404px;
  padding: 0 24px;
  box-sizing: border-box;
  position: relative;
}
#eLeft {
  position: absolute;
  top: 40px;
  left: 100px;
  color: blue;
  font-size: 14px;
}
#eRight {
  position: absolute;
  top: 40px;
  right: 120px;
  color: red;
  font-size: 14px;
}
.echt {
  padding: 0 2%;
}
.echart .echat {
  height: 364px;
  padding: 22px 0px;
  background: white;
  box-sizing: border-box;
}
section {
  overflow: hidden;
  padding: 24px;
}
section .ul .li {
  height: 120px;
  background: #ffffff;
  box-shadow: -2px 2px 4px 2px #faf7f7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  letter-spacing: 1px;
  position: relative;
  margin: 24px 2%;
  position: relative;
}
#day {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 14px;
  color: red;
}
.ul .right .tit {
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(96, 98, 102, 1);
  text-align: right;
}
.ul .right .tit span {
  font-size: 24px;
  color: black;
}
.ul .right .num {
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(96, 98, 102, 1);
  text-align: right;
}
.ul .right .num span {
  font-size: 18px;
}
.ul .right {
  width: 60%;
  height: 58px;
}
.ul .left {
  width: 30%；;
}
.ul .li .name {
  width: 120px;
  height: 30px;
  background: rgba(162, 165, 171, 1);
  border-radius: 4px;
  position: absolute;
  top: -15px;
  left: 20px;
  font-size: 16px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  line-height: 30px;
}
footer {
  font-size: 12px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(145, 147, 152, 1);
  text-align: center;
  padding: 30px 0 19px 0px;
}
</style>