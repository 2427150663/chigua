<template>
  <div id="index">
    <header>
      <div class="top">
        <span></span>
        汇总统计
      </div>
      <div class="set">
        <div class="left">
          统计周期：
          <div class="block riqi" style="position: relative;">
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions0"
              style="height:36px !important"
            ></el-date-picker>
            <span class="xx" style="position: absolute;top:6px;right:-70px" @click="value7=[]">x</span>
          </div>
          <div class="ttn">
            <div class="bun" @click="tongJi()">统计</div>
          </div>
        </div>
        <!-- <div class="right">
          <div class="btn" @click="html2word('index')">导出报告</div>
        </div>-->
      </div>
    </header>
    <div class="thaer">{{planStart}}至{{planEnd}}跟评监测情况</div>
    <div class="con">
      <el-row v-if="arr.length>0">
        <el-col :xs="23" :md="11" :lg="4" class="navCon">
          <div class="left"></div>
          <div class="right">
            <div class="tit" :class="arr[0].se">{{arr[0].tit}}</div>
            <div class="num">
              {{numType(arr[0].num)}}
              <span>{{arr[0].lei}}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="23" :md="11" :lg="4" class="navCon">
          <div class="left"></div>
          <div class="right">
            <div class="tit" :class="arr[1].se">{{arr[1].tit}}</div>
            <div class="num">
              {{numType(arr[1].num)}}
              <span>{{arr[1].lei}}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="23" :md="11" :lg="4" class="navCon">
          <div class="left"></div>
          <div class="right">
            <div class="tit" :class="arr[2].se">{{arr[2].tit}}</div>
            <div class="num">
              {{numType(arr[2].num)}}
              <span>{{arr[2].lei}}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="23" :md="11" :lg="4" class="navCon">
          <div class="left"></div>
          <div class="right">
            <div class="tit" :class="arr[3].se">{{arr[3].tit}}</div>
            <div class="num">
              {{numType(arr[3].num)}}
              <span>{{arr[3].lei}}</span>
            </div>
          </div>
        </el-col>
        <el-col :xs="23" :md="11" :lg="4" class="navCon">
          <div class="left"></div>
          <div class="right">
            <div class="tit" :class="arr[4].se">{{arr[4].tit}}</div>
            <div class="num">
              {{numType(arr[4].num)}}
              <span>{{arr[4].lei}}</span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="et">
      <el-row>
        <el-col :xs="24" :md="24" :lg="12" class="echtt">
          <div class="echat"></div>
        </el-col>
        <el-col :xs="24" :md="24" :lg="12" class="echtt">
          <div class="echat"></div>
        </el-col>
        <el-col :xs="24" :md="24" :lg="12" class="echtt">
          <div class="echat"></div>
          <div style="position: absolute;top:20px;right:80px">
            监测方案:
            <el-select
              v-model="value1"
              placeholder="请选择"
              @change="opt1(value1)"
              style="width:120px;margin-right:20px;margin-left:10px;"
            >
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :xs="24" :md="24" :lg="12" class="echtt">
          <div class="echat"></div>
          <div style="position: absolute;top:20px;right:80px">
            监测方案:
            <el-select
              v-model="value2"
              placeholder="请选择"
              @change="opt2(value2)"
              style="width:120px;margin-right:20px;margin-left:10px;"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="coon">
      <div class="taber">
        <div class="shang flex">
          <div class="left">
            <span>【{{optval3}}】</span>方案统计周期内跟帖清单
          </div>
          <div style="margin-left:80px;">
            监测方案:
            <el-select
              v-model="value3"
              placeholder="请选择"
              @change="opt3(value3)"
              style="width:120px;margin-right:20px;margin-left:10px;"
            >
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <el-button type="primary" style="height:30px !important" @click="dao1()">导出报告</el-button>
          <div class="right">
            平台数量
            <span v-if="cities.length>0">{{cities.length}}</span>个
          </div>
        </div>
        <table cellspacing="0" cellpadding="0">
          <tr class="t1">
            <td>序号</td>
            <td>发评时间</td>
            <td>昵称</td>
            <td>所属平台</td>
            <td>评论内容</td>
          </tr>
          <tr v-for="(val,index) in tableAArr">
            <td>{{(currentPage1-1)*curPageSize1+index+1}}</td>
            <td>{{val.displayTime}}</td>
            <td>{{val.nickName}}</td>
            <td>{{val.name}}</td>
            <td style="max-width:45vw;word-break: keep-all;word-wrap: break-word;">
              <span
                style="padding:10px 0px;display:block;"
                :title="val.content"
                v-if="val.content!=null"
              >{{val.content.length>400?val.content.substr(0,400)+'...':val.content}}</span>
              <span style="padding:10px 0px;display:block;" v-else></span>
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
            :total="tablGen"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="coon">
      <div class="taber">
        <div class="shang flex">
          <div class="left">
            <span>【{{optval4}}】</span>方案统计周期内发评人发布数量TOP10
          </div>
          <div style="margin-left:80px;">
            监测方案:
            <el-select
              v-model="value4"
              @change="opt4(value4)"
              placeholder="请选择"
              style="width:120px;margin-right:20px;margin-left:10px;"
            >
              <el-option
                v-for="item in options4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <a :href="topUrl" download="统计周期内发评人发布数量TOP10">
            <el-button type="primary" size="medium" style="height:30px !important">导出报告</el-button>
          </a>
          <div class="right">
            平台数量
            <span v-if="cities.length>0">{{cities.length}}</span>个
          </div>
        </div>
        <table cellspacing="0" cellpadding="0" class="tab2" ref="menuItem">
          <tr class="t1">
            <td>序号</td>
            <td>发评人</td>
            <td>发评总数</td>
            <td v-show="listTop.length==0" v-for="(val,index) in cities">{{val.name}}</td>
            <td v-show="listTop.length>0" v-for="val in listTop">{{val.websiteName}}</td>
          </tr>
          <tr v-for="(val,index) in topArr">
            <td class="hei">{{(currentPage2-1)*10+index+1}}</td>
            <td class="hei">{{val.criticNickName}}</td>
            <td>{{val.topicFollowCount}}</td>
            <td v-for="kt in val.list">{{kt.planFollowCount}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="cler"></div>
  </div>
</template>
<script>
import { constants } from "crypto";
export default {
  name: "Statistical",
  components: {},
  data() {
    return {
      listTop: [],
      topUrl: "",
      cities: [],
      optval1: "",
      optval2: "",
      optval3: "",
      optval4: "",
      options1: [],
      value1: "",
      options2: [],
      value2: "",
      options3: [],
      value3: "",
      options4: [],
      value4: "",
      currentPage1: 1,
      curPageSize1: 10,
      currentPage2: 1,
      //七天内
      pickerOptions0: {
        disabledDate(time) {
          let _now = Date.now(),
            seven = 31 * 24 * 60 * 60 * 1000,
            sevenDays = _now - seven;
          return time.getTime() > _now || time.getTime() < sevenDays; //大于当前的禁止，小于7天前的禁止
        }
      },
      //第一个表格
      zong: 40,
      tableAArr: [],
      //统计周期
      value7: [new Date(), new Date()],
      //统计周期时间
      startTime: "",
      endTime: "",
      //跟评监测情况
      planStart: "",
      planEnd: "",
      arr: [],
      //TOP10数组
      topArr: [],
      //第一次方案id
      planId: 0,
      //方案统计周期内跟帖清单长度
      tablGen: 0
    };
  },
  updated() {},
  methods: {
    numType(num) {
      let number = parseFloat(num);
      if (number >= 10000 && number < 9999599) {
        number = (number / 10000).toFixed(1) + "万";
      }
      if (number >= 9999599 && number < 99599999) {
        number = (number / 10000000).toFixed(1) + "千万";
      }
      if (number >= 99599999&& number < 9959999999) {
        number = (number / 100000000).toFixed(1) + "亿";
      }
      if (number >= 9959999999) {
        number = (number / 100000000000).toFixed(1) + "千亿";
      }
      return number;
    },
    //获取七天内日期
    funDate(aa) {
      var date1 = new Date(),
        time1 =
          date1.getFullYear() +
          "-" +
          (date1.getMonth() + 1) +
          "-" +
          date1.getDate(); //time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + aa);
      var time2 =
        date2.getFullYear() +
        "-" +
        (date2.getMonth() + 1) +
        "-" +
        date2.getDate();
      return time2;
    },
    funDate2(aa) {
      var date1 = new Date(),
        time1 =
          date1.getFullYear() +
          "-" +
          (date1.getMonth() + 1) +
          "-" +
          date1.getDate(); //time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + aa);
      var time2 =
        date2.getFullYear() +
        "年" +
        (date2.getMonth() + 1) +
        "月" +
        date2.getDate() +
        "日";
      return time2;
    },
    //指定区域导出到Word
    html2word(Area) {
      var oWD = new ActiveXObject("Word.Application");
      var oDC = oWD.Documents.Add("", 0, 1);
      var oRange = oDC.Range(0, 1);
      var sel = document.body.createTextRange();
      sel.moveToElementText(document.getElementById(Area));
      sel.select();
      sel.execCommand("Copy");
      oRange.Paste();
      oWD.Application.Visible = true;
    },
    handleSizeChange(val) {
      this.currentPage1 = 1;
      this.curPageSize1 = val;
      this.$router.push({
        query: { page: this.currentPage1, pageSize: this.curPageSize1 }
      });
      this.weekPlan(this.startTime, this.endTime);
    },
    handleCurrentChange(val) {
      this.currentPage1 = val;
      this.$router.push({
        query: { page: this.currentPage1, pageSize: this.curPageSize1 }
      });
      this.weekPlan(this.startTime, this.endTime);
    },
    //第一个选择框
    opt1(value1) {
      // window.sessionStorage.setItem("StatisticalPlan1", value1);
      this.options1.forEach(x => {
        if (x.value == value1) {
          this.optval1 = x.label;
        }
      });
      // window.sessionStorage.setItem("StaPlanName1", this.optval1);
      this.echat3(this.startTime, this.endTime);
    },
    //第二个选择框
    opt2(value2) {
      // window.sessionStorage.setItem("StatisticalPlan2", value2);
      this.options2.forEach(x => {
        if (x.value == value2) {
          this.optval2 = x.label;
        }
      });
      // window.sessionStorage.setItem("StaPlanName2", this.optval2);
      this.echat4(this.startTime, this.endTime);
    },
    //第三个选择框
    opt3(value3) {
      // window.sessionStorage.setItem("StatisticalPlan3", value3);
      this.options3.forEach(x => {
        if (x.value == value3) {
          this.optval3 = x.label;
        }
      });
      // window.sessionStorage.setItem("StaPlanName3", this.optval3);
      this.currentPage1 = 1;
      this.weekPlan(this.startTime, this.endTime);
    },
    //第四个选择框
    opt4(value4) {
      // console.log(value4);
      // window.sessionStorage.setItem("StatisticalPlan4", value4);
      this.options4.forEach(x => {
        if (x.value == value4) {
          this.optval4 = x.label;
        }
      });
      // window.sessionStorage.setItem("StaPlanName4", this.optval4);
      this.TOP10(this.startTime, this.endTime);
    },
    //顶部方案信息数量
    planNum(beginDate, endDate) {
      this.$axios
        .get(
          `${url}Api/Statistical/GetStatisticalByType?BeginTime=${beginDate}&EndTime=${endDate}&AgencyID=0`
        )
        .then(res => {
          if (res.data.isOperationSuccess) {
            var obj = res.data.result;
            this.arr = [
              {
                tit: "监测平台",
                num: obj.websiteCount,
                lei: "个",
                se: "blue"
              },
              {
                tit: "监测目标",
                num: obj.topicCount,
                lei: "篇",
                se: "blue"
              },
              {
                tit: "监测数量",
                num: obj.topicFollowCount,
                lei: "条",
                se: "yellow"
              },
              {
                tit: "监测方案",
                num: obj.monitorPlanCount,
                lei: "组",
                se: "green"
              },
              {
                tit: "方案信息",
                num: obj.monitorPlanFollowCount,
                lei: "条",
                se: "qing"
              }
            ];
          }
        });
    },
    //周期统计
    tongJi() {
      let _this = this;
      var time, beginDate, endDate, month, date, planStart, planEnd;
      if (this.value7.length > 0) {
        time = this.value7;
        month =
          time[0].getMonth() < 10
            ? "0" + (time[0].getMonth() + 1)
            : time[0].getMonth() + 1;
        date =
          time[0].getDate() < 10 ? "0" + time[0].getDate() : time[0].getDate();
        beginDate = time[0].getFullYear() + "-" + month + "-" + date;
        planStart = time[0].getFullYear() + "年" + month + "月" + date + "日";
        month =
          time[1].getMonth() < 10
            ? "0" + (time[1].getMonth() + 1)
            : time[1].getMonth() + 1;
        date =
          time[1].getDate() < 10 ? "0" + time[1].getDate() : time[1].getDate();
        endDate = time[1].getFullYear() + "-" + month + "-" + date;
        planEnd = time[1].getFullYear() + "年" + month + "月" + date + "日";
        this.startTime = beginDate;
        this.endTime = endDate;
        this.planStart = planStart;
        this.planEnd = planEnd;
        window.sessionStorage.setItem("statBeginDate", beginDate);
        window.sessionStorage.setItem("statEndDate", endDate);
        window.sessionStorage.setItem("statPlanStart", planStart);
        window.sessionStorage.setItem("statPlanEnd", planEnd);
        async function test() {
          _this.planNum(beginDate, endDate);
          _this.echat1(beginDate, endDate);
          _this.echat2(beginDate, endDate);
          _this.echat3(beginDate, endDate);
          _this.echat4(beginDate, endDate);
          _this.weekPlan(beginDate, endDate);
          _this.TOP10(beginDate, endDate);
        }
        test();
      } else {
        beginDate = "";
        endDate = "";
        this.$message({
          type: "info",
          message: "统计周期不能为空",
          duration: 500
        });
      }
    },
    //导出1【王永康】方案统计周期内跟帖清单
    dao1() {
      const rLoading = this.openLoading();
      window.location.href = `${url}Api/Statistical/ExPortFollowByPlan?PlanId=${this.value3}&BeginTime=${this.startTime}&EndTime=${this.endTime}`;
      this.$axios
        .get(
          `${url}Api/Statistical/ExPortFollowByPlan?PlanId=${this.value3}&BeginTime=${this.startTime}&EndTime=${this.endTime}`
        )
        .then(response => {
          console.log(response.status);
          if (response.status == 200) {
            rLoading.close();
          }
        })
        .catch(function(error) {
          this.$message.error("下载失败！");
        });
    },
    //导出top10
    tableToExcel() {
      let _this = this;
      let str = `<table cellspacing="0" cellpadding="0" class="tab2" ref="menuItem">
          <tr class="t1">
            <td>序号</td>
            <td>发评人</td>
            <td>发评总数</td>`;
      this.cities.forEach(x => {
        str += `<td>${x.name}</td>`;
      });
      str += `</tr>`;
      // console.log(this.topArr);
      this.topArr.forEach((x, i) => {
        str += `<tr>
              <td class="hei">${(this.currentPage2 - 1) * 10 + i + 1}</td>
              <td class="hei" x:str>${x.criticNickName}</td>
              <td x:str>${x.topicFollowCount}</td>`;
        x.list.forEach(k => {
          str += `<td>${k.planFollowCount}</td>`;
        });
        str += `</tr>`;
      });
      str += `</table>`;
      //Worksheet名
      let worksheet = "统计周期内发评人发布数量TOP10";
      let uri = "data:application/vnd.ms-excel;base64,";
      //下载的表格模板数据
      let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office" 
      xmlns:x="urn:schemas-microsoft-com:office:excel" 
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>
        <x:Name>"Sheet1"</x:Name>
        <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>
        </x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
        </head><body><table>${str}</table></body></html>`;
      //下载模板
      // window.location.href = uri + _this.base64(_this.template);
      this.topUrl = uri + _this.base64(template);
    },
    base64(s) {
      return window.btoa(unescape(encodeURIComponent(s)));
    },
    //第一个统计图  统计周期内每日跟评走势及方案信息数量图
    echat1(beginDate, endDate) {
      let echat = document.querySelectorAll(".echat");
      let myChart1 = echarts.init(echat[0]);
      this.$axios
        .get(
          `${url}Api/Statistical/GetStatisticalByWeekData?BeginTime=${beginDate}&EndTime=${endDate}`
        )
        .then(res => {
          let dat = res.data;
          if (dat.isOperationSuccess) {
            let arr = dat.result.list;
            //日期
            let dateArr = [];
            //方案信息
            let planArr = [];
            //跟评走势
            let followArr = [];
            arr.forEach(x => {
              dateArr.unshift(x.displayTime);
              planArr.unshift(x.topicFollowByPlanCount);
              followArr.unshift(x.topicFollowCount);
            });
            myChart1.setOption({
              tooltip: {
                trigger: "axis"
              },
              title: {
                text: "统计周期内每日跟评走势及方案信息数量图"
              },
              //提示信息
              legend: {
                data: ["方案信息", "每日跟评走势"],
                y: "90%"
              },
              grid: {
                left: "2%",
                right: "2%",
                containLabel: true
              },
              //鼠标悬停效果
              tooltip: {
                trigger: "axis"
              },
              //下载功能
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              //x轴
              xAxis: [
                {
                  type: "category",
                  //是否从0开始
                  // boundaryGap: false,
                  data: dateArr,
                  axisPointer: {
                    type: "shadow"
                  },
                  axisLabel: {
                    interval: 0,
                    rotate: 40
                  }
                }
              ],
              //y轴信息
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value}"
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
              //数据信息
              series: [
                {
                  name: "方案信息",
                  type: "bar",
                  smooth: true,
                  barWidth: "12%",
                  yAxisIndex: 0,
                  data: planArr,
                  itemStyle: {
                    normal: {
                      color: "rgba(147,190,82,1)",
                      barBorderRadius: [10, 10, 0, 0]
                    } //柱状颜色
                  }
                },
                {
                  name: "每日跟评走势",
                  type: "line",
                  smooth: true,
                  yAxisIndex: 1,
                  itemStyle: {
                    normal: {
                      color: "rgba(255,182,77,1)"
                    } //柱状颜色
                  },
                  data: followArr
                }
              ]
            });
            window.onresize = function() {
              myChart1.resize();
            };
          }
        });
    },
    //第二个统计图 统计周期内各监测平台跟评数量及方案信息数量图
    echat2(beginDate, endDate) {
      let echat = document.querySelectorAll(".echat");
      let myChart2 = echarts.init(echat[1]);
      this.$axios
        .get(
          `${url}Api/Statistical/GetStatisticalByWebStite?BeginTime=${beginDate}&EndTime=${endDate}`
        )
        .then(res => {
          let dat = res.data;
          if (dat.isOperationSuccess) {
            let arr = dat.result.list;
            //名称
            let nameArr = [];
            //方案信息
            let planArr = [];
            //每日跟评数量
            let followArr = [];
            // arr.forEach((x, i) => {
            //   if (x.name == "天天快报") {
            //     arr.splice(i, 1);
            //   }
            // });
            arr.forEach(x => {
              if (x.websiteId == 9) {
                x.name = "微博";
              }
              nameArr.unshift(x.name.substr(0, 2));
              planArr.unshift(x.followBuPlanCount);
              followArr.unshift(x.followCount);
            });
            myChart2.setOption({
              title: {
                text: "统计周期内各监测平台跟评数量及方案信息数量图"
              },
              legend: {
                data: ["每日跟评数量", "方案信息"],
                y: "90%"
              },
              grid: {
                left: "2%",
                right: "2%",
                containLabel: true
              },
              tooltip: {
                trigger: "axis"
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: [
                {
                  type: "category",
                  data: nameArr,
                  axisPointer: {
                    type: "shadow"
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value}"
                  }
                }
              ],
              series: [
                {
                  name: "方案信息",
                  type: "bar",
                  stack: "总量",
                  barWidth: "20%",
                  itemStyle: {
                    normal: {
                      color: "rgba(252,97,128,1)"
                    } //柱状颜色
                  },
                  data: planArr
                },
                {
                  name: "每日跟评数量",
                  type: "bar",
                  barWidth: "20%",
                  stack: "总量",
                  itemStyle: {
                    normal: {
                      color: "rgba(255,182,77,1)",
                      barBorderRadius: [4, 4, 0, 0]
                    } //柱状颜色
                  },
                  data: followArr
                }
              ]
            });
            window.onresize = function() {
              myChart2.resize();
            };
          }
        });
    },
    //第三个统计图 王永康方案统计周期内每日跟评数据图
    echat3(beginDate, endDate) {
      let echat = document.querySelectorAll(".echat");
      let myChart3 = echarts.init(echat[2]);
      if (window.sessionStorage.getItem("StatisticalPlan1")) {
        this.value1 = window.sessionStorage.getItem("StatisticalPlan1") * 1;
      }
      this.$axios
        .get(
          `${url}Api/Statistical/GetPlanFollowInfoByPlan?planId=${this.value1}&BeginTime=${beginDate}&EndTime=${endDate}&AgencyID=0`
        )
        .then(res => {
          var dat = res.data;
          if (dat.isOperationSuccess) {
            let arr = dat.result.list;
            //日期
            let dateArr = [];
            //数量
            let numArr = [];
            arr.forEach(x => {
              dateArr.unshift(x.displayTime);
              numArr.unshift(x.topicFollowByPlanCount);
            });
            myChart3.setOption({
              title: {
                text: `${this.optval1}方案统计周期内每日跟评数据图`
              },
              grid: {
                left: "2%",
                right: "2%",
                containLabel: true
              },
              tooltip: {
                trigger: "axis"
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: [
                {
                  type: "category",
                  data: dateArr,
                  axisPointer: {
                    type: "shadow"
                  },
                  axisLabel: {
                    interval: 0,
                    rotate: 40
                  }
                }
              ],
              yAxis: [
                {
                  type: "value",
                  axisLabel: {
                    formatter: "{value}"
                  }
                }
              ],
              series: [
                {
                  name: "每日跟评数",
                  type: "bar",
                  barWidth: "20%",
                  itemStyle: {
                    normal: {
                      color: "rgba(167,147,245,1)",
                      barBorderRadius: [10, 10, 0, 0]
                    } //柱状颜色
                  },
                  data: numArr
                }
              ]
            });
            window.onresize = function() {
              myChart3.resize();
            };
          }
        });
    },
    getCor() {
      let r = Math.floor(Math.random() * 256);
      let g = Math.floor(Math.random() * 256);
      let b = Math.floor(Math.random() * 256);
      return `rgb(${r},${g},${b})`;
    },
    //第四个统计图 王永康方案统计周期内各平台跟评数量占比图
    echat4(beginDate, endDate) {
      let echat = document.querySelectorAll(".echat");
      let myChart4 = echarts.init(echat[3]);
      this.$axios
        .get(
          `${url}api/Statistical/GetPlatformFollowProportion?BeginTime=${beginDate}&EndTime=${endDate}&planId=${this.value2}`
        )
        .then(res => {
          var dat = res.data;
          let _this = this;
          let cor = [
            "rgb(172,136,300)",
            "rgb(149,184,280)",
            "rgb(38,162,260)",
            "rgb(172,87,240)",
            "rgb(202,46,220)",
            "rgb(140,156,200)",
            "rgb(247,16,180)",
            "rgb(171,190,160)",
            "rgb(218,46,140)",
            "rgb(56,143,120)",
            "rgb(228,23,100)",
            "rgb(226,235,80)",
            "rgb(192,135,60)",
            "rgb(48,8,40)",
            "rgb(112,154,20)",
            "rgb(57,73,580)",
            "rgb(252,203,560)",
            "rgb(152,78,540)",
            "rgb(69,112,520)",
            "rgb(27,13,500)",
            "rgb(147,215,480)",
            "rgb(142,65,460)",
            "rgb(217,103,440)",
            "rgb(46,218,420)",
            "rgb(102,215,400)",
            "rgb(53,236,380)",
            "rgb(146,42,360)",
            "rgb(146,38,340)",
            "rgb(75,94,320)",
            "rgb(245,255,0)"
          ];
          cor = [...new Set(cor)];
          if (dat.isOperationSuccess) {
            let arr = dat.result.list;
            let nameArr = [];
            arr.forEach((x, i) => {
              if (x.followCount > 0) {
                nameArr.unshift({
                  value: x.followCount,
                  name:
                    x.proportion +
                    " " +
                    x.name +
                    "(" +
                    x.followCount +
                    "条" +
                    ")"
                });
              }
            });
            cor = cor.slice(0, arr.length);
            myChart4.setOption({
              title: {
                text: `${this.optval2}方案统计周期内各平台跟评数量占比图`
              },
              tooltip: {
                trigger: "item",
                formatter: "{a} <br/>{b}"
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              color: cor,
              series: [
                {
                  type: "pie",
                  radius: [0, "50%"],
                  name: "平台跟评数",
                  itemStyle: {
                    normal: {
                      color: "rgba(147,190,82,1)",
                      barBorderRadius: [10, 10, 0, 0]
                    } //柱状颜色
                  },
                  //修改饼图背景颜色
                  itemStyle: {
                    //通常情况下：
                    normal: {
                      //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                      color: function(params) {
                        var colorList = cor; //每根柱子的颜色
                        return colorList[params.dataIndex];
                      }
                    },
                    //鼠标悬停时：
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: "rgba(0, 0, 0, 0.5)"
                    }
                  },
                  data: nameArr
                }
              ]
            });
            window.onresize = function() {
              myChart4.resize();
            };
          }
        });
    },
    //方案统计周期内跟帖清单
    weekPlan(beginDate, endDate) {
      this.tableAArr = [];
      this.$axios
        .get(
          `${url}Api/Statistical/GetFollowByPlan?planId=${this.value3}&pageIndex=${this.currentPage1}&pageSize=${this.curPageSize1}&BeginTime=${beginDate}&EndTime=${endDate}`
        )
        .then(res => {
          let dat = res.data;
          if (dat.isOperationSuccess) {
            let arr = [];
            arr = dat.result.list;
            this.tableAArr = arr;
            this.tablGen = dat.result.totalCount;
          }
        });
    },
    //底部Top10
    TOP10(beginDate, endDate) {
      this.$axios
        .get(
          `${url}api/Statistical/GetFollowCountTOP?BeginTime=${beginDate}&EndTime=${endDate}&planId=${this.value4}`
        )
        .then(res => {
          let dat = res.data;
          if (dat.isOperationSuccess) {
            let arr = [];
            arr = dat.result.list;
            this.topArr = arr;
            this.tableToExcel();
            if (this.topArr.length > 0) {
              this.listTop = this.topArr[0].list;
            }
          }
        });
    },
    //获取方案
    getPlan() {
      console.log(
        `${url}api/MonitorPlan/GetMonitorPlanListByCustomerId?AgencyID=0`
      );
      let _this = this;
      this.$axios
        .get(`${url}api/MonitorPlan/GetMonitorPlanListByCustomerId?AgencyID=0`)
        .then(
          res => {
            let dat = res.data;
            if (dat.isOperationSuccess) {
              let arr = dat.result.monitorPlanList;
              if (arr.length < 1) {
                this.tongJi();
                return false;
              }
              let _this = this;
              let arrName = [];
              arr.forEach(x => {
                arrName.push({
                  value: x.id,
                  label: x.name
                });
              });
              this.options1 = arrName;
              this.options2 = arrName;
              this.options3 = arrName;
              this.options4 = arrName;
              this.value1 = arrName[0].value;
              this.value2 = arrName[0].value;
              this.value3 = arrName[0].value;
              this.value4 = arrName[0].value;
              this.optval1 = arrName[0].label;
              this.optval2 = arrName[0].label;
              this.optval3 = arrName[0].label;
              this.optval4 = arrName[0].label;
              this.tongJi();
            }
          },
          function(err) {
            console.log(err);
          }
        );
    },
    //获取网站平台
    comLoad() {
      this.$axios.get(url + "Api/Website/GetRunWebsiteList").then(res => {
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
          this.cities = res.data.result.websiteModelList;
        }
      });
    }
  },
  computed: {},
  mounted() {
    this.getPlan();
  },
  created() {
    document.querySelector("body").style.overflowY = "auto";
    this.comLoad();
    this.value7 = [new Date(this.funDate(-6)), new Date()];
    this.startTime = this.funDate2(-6);
    this.endTime = this.funDate2(0);
    if (this.$route.query.page) {
      this.currentPage1 = this.$route.query.page * 1;
      this.curPageSize1 = this.$route.query.pageSize * 1;
    } else {
      this.$router.push({
        query: { page: this.currentPage1, pageSize: this.curPageSize1 }
      });
    }
  }
};
</script>

<style scoped="scoped" lang="less">
.ttn:hover {
  filter: brightness(1.2);
}
.xx {
  cursor: pointer;
  color: gainsboro;
}
.xx:hover {
  color: black;
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
.qing {
  color: #a793f5;
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
header {
  height: 130px;
  background: rgba(255, 255, 255, 1);
  .set {
    padding: 0 24px 24px 24px;
    .left {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(96, 98, 102, 1);
      align-items: center;
      float: left;
      .flex;
      .riqi {
        width: 250px;
        height: 36px;
      }
      .ttn {
        width: 100px;
        height: 36px;
        background: rgba(70, 128, 255, 1);
        border-radius: 4px;
        margin-left: 120px;
        cursor: pointer;
        .bun {
          font-size: 14px;
          font-family: PingFangTC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          padding-left: 46px;
          line-height: 36px;
          background: url(../assets/img/pie-chart.png) no-repeat 22px center;
          .box;
        }
      }
    }
    .right {
      float: right;
      .btn {
        width: 100px;
        height: 36px;
        line-height: 36px;
        padding-left: 32px;
        border-radius: 4px;
        border: 1px solid rgba(213, 215, 221, 1);
        font-size: 14px;
        font-family: PingFangTC-Regular;
        background: url(../assets/img/dao.png) no-repeat 10px center;
        font-weight: 400;
        color: rgba(70, 128, 255, 1);
        cursor: pointer;
        .box;
      }
    }
  }
}
.thaer {
  height: 58px;
  line-height: 58px;
  background: #dae5f8;
  font-size: 14px;
  font-family: PingFangTC-Regular;
  font-weight: 400;
  font-size: 14px;
  font-family: PingFangTC-Regular;
  font-weight: 400;
  color: rgba(70, 128, 255, 1);
  padding-left: 24px;
}
.con {
  padding: 24px;
  padding-top: 2%;
}
.cler {
  clear: both;
  height: 1px;
  background: rgba(243, 246, 247, 1);
}
div.navCon {
  height: 100px;
  background: #ffffff;
  box-shadow: -2px 2px 4px 2px #faf7f7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  margin: 0px 1.2% 24px 2%;
}
div.navCon:hover {
  cursor: pointer;
  box-shadow: -10px 10px 20px 10px rgba(30, 30, 30, 0.05);
}
div.navCon .left {
  margin: 0px 4%;
  width: 40%;
  height: 60px;
}
div.navCon .right .tit {
  font-size: 14px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
}
div.navCon .right .num {
  font-size: 36px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: #303132;
}
div.navCon .right .num span {
  font-size: 16px;
  color: gray;
}
div.navCon:nth-child(1) .left {
  background: url(../assets/img/wei5.png) no-repeat center center;
}
div.navCon:nth-child(2) .left {
  background: url(../assets/img/wei6.png) no-repeat center center;
}
div.navCon:nth-child(3) .left {
  background: url(../assets/img/wei7.png) no-repeat center center;
}
div.navCon:nth-child(4) .left {
  background: url(../assets/img/wei8.png) no-repeat center center;
}
div.navCon:nth-child(5) .left {
  background: url(../assets/img/分组7.png) no-repeat center center;
}
.et {
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 0px;
  .echtt {
    position: relative;
    .echat {
      height: 364px;
      border-radius: 4px;
      position: relative;
      margin-left: 24px;
      margin-right: 24px;
      margin-bottom: 48px;
      background: #ffffff;
      padding-top: 22px;
      padding-left: 20px;
      padding-right: 20px;
    }
    .tishi {
      font-size: 12px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(144, 154, 148, 1);
      position: absolute;
      bottom: 60px;
      left: 50%;
      transform: translateX(-50%);
      .flex;
      align-items: center;
      .yi {
        .flex;
        align-items: center;
        margin-right: 24px;
        .bg {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(255, 182, 77, 1);
          display: block;
          margin-right: 6px;
        }
      }
      .er {
        .flex;
        .flex;
        align-items: center;
        .bg {
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background: rgba(147, 190, 82, 1);
          display: block;
          margin-right: 6px;
        }
        .bg.red {
          background: rgba(252, 97, 128, 1);
          border-radius: 4px;
        }
      }
    }
  }
}
table {
  width: 100%;
  font-size: 14px;
  padding: 0 16px;
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
        color: rgba(70, 128, 255, 1);
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
.coon {
  padding: 0 24px;
  margin-bottom: 3%;
}
.taber {
  padding: 24px;
  padding-bottom: 100px;
  background: rgba(255, 255, 255, 1);
  box-shadow: -2px 2px 4px 2px rgba(250, 247, 247, 1);
  margin: 0 2%;
  .box;
  .shang {
    height: 68px;
    align-items: center;
    // line-height: 68px;
    font-size: 14px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(48, 49, 50, 1);
    position: relative;
    .left {
      span {
        font-weight: bold;
      }
    }
    .right {
      position: absolute;
      top: 28px;
      right: 24px;
      span {
        color: rgba(70, 128, 255, 1);
      }
    }
  }
  .tab2 {
    td {
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(70, 128, 255, 1);
    }
    .t1 {
      td {
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(48, 49, 50, 1);
      }
    }
    .hei {
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
  margin-right: 24px;
}
</style>