<template>
  <div id="index" class="flex">
    <div id="bgg" v-show="rbox"></div>
    <div id="rmBox" v-show="rbox">
      <div class="top">方案删除</div>
      <div class="bor"></div>
      <div class="xin flex">
        <span class="woing">!</span>
        此操作将会永久删除该方案，是否继续？
      </div>
      <div class="anniu flex" style="padding-left:68px;padding-top:12px;margin-left:160px;">
        <el-button type="primary" style="margin-right:24px;width:100px" @click="closeyes()">确定</el-button>
        <el-button plain style="width:100px" @click="closeno()">取消</el-button>
      </div>
    </div>
    <div class="inLeft" v-show="hieen1">
      <div class="top">
        <span></span>监测方案
      </div>
      <div
        class="fangan"
        v-for="(val,index) in arr"
        :class="{fangan2:!val.state,bg:val.bg}"
        @click.stop="getID(val.id,val.an,index)"
      >
        <div class="bttn">
          <div class="fanANo" v-if="val.state">
            <div class="progress" :class="{'jieShu':val.jinDu==100}">
              <div class="prog"></div>
            </div>
            <div class="jinDu">{{val.jinDu}}%</div>
          </div>
          <div class="bTOP" @mouseover="boxover(index)" @mouseout="boxout(index)" @click.stop>
            <div class="an">{{val.an}}</div>
            <div class="btnBOX">
              <div class="btn" @click.stop="yun(index)">
                <div>运行中</div>
              </div>
              <div class="btn" @click.stop="stop(index)">
                <div>已暂停</div>
              </div>
              <div class="btn" @click="wite(index,val.id)">
                <div>编辑</div>
              </div>
              <div class="btn" @click="rem(index,val.id)">
                <div>删除</div>
              </div>
            </div>
          </div>
          <div class="bZhong">
            <div>{{val.name}}</div>
          </div>
          <div class="bBtm">
            <div class="tmleft">
              信息数量：
              <span>{{numType(val.num)}}</span>
            </div>
            <div class="tmright">
              开始时间：
              <span>{{val.time}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="tianjia" @click="bgX()" style="margin-bottom:40px">
        <div class="rba">
          <div class="jiaBtn" style="color: #4680ff">添加新方案</div>
        </div>
      </div>
      <div class="allbox"></div>
    </div>
    <div id="bg" v-show="xian"></div>
    <div class="tanBox" v-show="xian">
      <div class="top">{{bianji}}</div>
      <div class="btm">
        <div class="yi flex">
          <div class="leftyi">
            <div>方案名称</div>
            <el-input v-model="intbox1" placeholder="请输入标题" style="width:250px;"></el-input>
          </div>
          <div class="rightyi">
            <div>时间</div>
            <el-date-picker
              v-model="valdate"
              type="date"
              placeholder="选择日期"
              default-value
              :picker-options="pickerOptions2"
            ></el-date-picker>
          </div>
        </div>
        <div class="er" v-for="(val,index) in guanjian" v-if="guanjian.length>0">
          <div class="lei">
            ({{val.zhu}})
            <span v-if="val.fu">+({{val.fu}})</span>
          </div>
          <div class="clo" @click="guanjian.splice(index,1)">x</div>
        </div>
        <div class="br"></div>
        <div class="lie">
          <div class="lieShang">主关键字</div>
          <div class="leiXia">
            <el-input v-model="intbox2" placeholder></el-input>
          </div>
        </div>
        <div class="lie">
          <div class="lieShang">副关键字</div>
          <div class="leiXia flex">
            <el-input v-model="intbox3" placeholder style="margin-right:16px"></el-input>
            <el-button type="primary" style="width:100px" @click="addBOX()">添加</el-button>
          </div>
        </div>
        <div class="lie">
          <div class="lieShang">排除关键字</div>
          <el-input v-model="intbox4" placeholder></el-input>
        </div>
      </div>
      <div class="anniu" style="padding-left:160px;padding-top:12px;margin-left:160px;">
        <el-button type="primary" style="margin-right:24px;width:100px" @click="yes()">确定</el-button>
        <el-button plain style="width:100px" @click="no()">取消</el-button>
      </div>
    </div>
    <section style="min-width:955px;">
      <div class="btnRight" @click="hieen2=!hieen2" :class="{zhuan2:!hieen2}">
        <div class="btnzuo"></div>
      </div>
      <div class="onLeft" id="scroll1" @scroll="onScroll1()">
        <div id="lei">
          <div class="top">
            <span></span>新闻列表
          </div>
          <div class="iptShu flex">
            <div class="onlie">
              <div class="onTop">跟评内容</div>
              <div class="onipt">
                <el-input v-model="input" placeholder="请输入标题" clearable></el-input>
              </div>
            </div>
            <div class="onlie">
              <div class="onTop">日期</div>
              <div class="onipt">
                <div class="block riqi" style="position: relative;">
                  <el-date-picker
                    v-model="value7"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                  <span
                    class="xx"
                    style="position: absolute;top:3px;right:30px"
                    @click="value7=[]"
                  >x</span>
                </div>
              </div>
            </div>
            <div class="onlie">
              <div class="onTop">排序</div>
              <div class="onipt">
                <el-select v-model="value" placeholder="请选择" style="width:120px;margin-right:20px">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="onlie">
              <div class="onTop">类型</div>
              <div class="onipt">
                <el-select v-model="vallei" placeholder="请选择" style="width:120px;margin-right:20px">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="pingTai flex">
            <span style="display:black;width:40px;min-width:40px;line-height:30px">平台:</span>
            <el-checkbox
              style="line-height:30px"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              class="boox"
            >全选</el-checkbox>
            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
              <el-checkbox
                v-for="city in cities"
                :label="city.id"
                :key="city.id"
                class="boox"
                style="line-height:30px;"
              >{{city.name}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="xianshi">
            <div class="xianBtn" @click="xianSou()">{{fadeToolg}}搜索条件</div>
          </div>
          <div class="pai flex">
            <div class="sou" style="margin-right:50px">
              <div class="iptsou" @click="souIpt()">搜索</div>
            </div>
            <div class="sou">
              <div class="iptsou dao" @click="dao1()">导出</div>
            </div>
          </div>
          <div class="onTit">
            <!-- <el-checkbox
              style="line-height:30px;padding-left:12px"
              :indeterminate="isIndeterminate2"
              v-model="checkAll2"
              @change="handleCheckAllChange2"
              class="boox"
            >全选</el-checkbox>-->
            <div class="right" style="padding-right:20px">
              信息数量
              <span style="color:blue">{{zongTiao}}</span>条
            </div>
          </div>
          <div class="leiCon" v-show="shuaxin2">
            <!-- <el-checkbox-group v-model="checkedCities2" @change="handleCheckedCitiesChange2"> -->
            <ul v-if="cities2.length>=1">
              <li v-for="(val,index) in cities2" style="padding-top:10px;">
                <div class="toop">
                  <div class="zuotop">
                    <span class="lan" style="color:black;color:blue">{{val.nickName}}</span>
                  </div>
                  <div class="routop shang">
                    <span class="zan"></span>
                    <!-- :class="{'start':val.xing}"
                    @click="clickZan(index)"-->
                    <span class="num">{{val.praiseCount}}</span>
                    <span
                      class="shou"
                      :class="{cang: val.shou}"
                      @click="shoucang1(index)"
                      style="cursor: pointer;"
                    ></span>
                    <span
                      class="tui"
                      :class="{'rit':val.tui}"
                      @click="details(val.id,index,val.Planid)"
                      style="cursor: pointer;"
                    ></span>
                  </div>
                </div>
                <div class="hui flex">
                  <span>{{val.publishTimeStr}}</span>
                  <span>
                    <a target="_blank" :href="val.sourceUrl" class="aa">{{val.websiteName}}</a>
                  </span>
                  <div style="width:70%;word-wrap:break-all;">{{val.topicTitle}}</div>
                </div>
                <div class="zhong flex">
                  <div class="left">
                    <!-- <el-checkbox
                        :label="val"
                        :key="val.id"
                        class="boox"
                        style="padding-right:4px"
                    >{{kt}}</el-checkbox>-->
                  </div>
                  <div class="right" style="word-wrap:break-all">
                    <span class="zhCon an" style="word-wrap:break-all">{{val.content}}</span>
                  </div>
                </div>
              </li>
            </ul>
            <!-- </el-checkbox-group> -->
            <div class="olad" v-show="load2" @click="loand2()">
              {{zai}}
              <span class="xiah"></span>
            </div>
            <div class="jiazai" v-show="!load2">
              <img src="../assets/img/onld.gif" alt width="30px" height="30px" />
              <div>加载中</div>
            </div>
          </div>
          <div class="jiazai" v-show="!shuaxin2">
            <img src="../assets/img/onld.gif" alt width="30px" height="30px" />
            <div>加载中</div>
          </div>
        </div>
      </div>
    </section>
    <div class="inLeft" v-show="hieen2">
      <div class="top">
        <span></span>评论详情
      </div>
      <div class="sou" style="width:124px;height:36px;margin-top: 24px;">
        <div class="copy" @click="copyUrl2()">复制到粘贴板</div>
      </div>
      <div class="flex" style="margin-top:24px">
        <div class="sou">
          <div class="dao" @click="dao2()" style="border:1px solid #d5d7dd">导出公函</div>
        </div>
        <div class="sou" style="width:100px; margin-left: 24px;">
          <div class="kong" @click="arrNull()">清空</div>
        </div>
      </div>
      <div class="quanAll">
        <el-checkbox
          :indeterminate="isIndeterminate1"
          v-model="checkAll1"
          @change="handleCheckAllChange1"
          class="boox"
        >全选</el-checkbox>
      </div>
      <el-checkbox-group v-model="checkedxiangQ" @change="handleCheckedCitiesChange1">
        <div class="tie" v-for="(city,index) in xiangQ" v-if="xiangQ.length>=1">
          <div class="tt">
            <div class="tieLeft">
              <el-checkbox :label="city" :key="city.id" class="boox">{{index+1}}.</el-checkbox>
            </div>
            <div class="tieRight" style="word-break:break-all;width:265px">{{city.title}}</div>
          </div>
          <div class="tt">
            <div class="left">新闻地址：</div>
            <div class="right">
              <a class="aa" target="_blank" :href="city.com">{{city.com}}</a>
            </div>
          </div>
          <div class="tt">
            <div class="left">评论内容：</div>
            <div class="right">
              <span>{{city.con}}</span>
            </div>
          </div>
          <div class="tt">
            <div class="left">评论昵称：</div>
            <div class="right">
              <span>{{city.name}}</span>
            </div>
          </div>
          <div class="tt">
            <div class="left">评论时间：</div>
            <div class="right">
              <span>{{city.publishTimeStr}}</span>
            </div>
          </div>
        </div>
      </el-checkbox-group>
      <textarea cols="20" rows="10" id="biao1">用户定义的代码区域</textarea>
      <div id="di" style="height:60px"></div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
import { fail } from "assert";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      //日期只能选7日之内
      pickerOptions0: {
        disabledDate(time) {
          let _now = Date.now(),
            seven = 7 * 24 * 60 * 60 * 1000,
            sevenDays = _now - seven;
          return time.getTime() > _now || time.getTime() < sevenDays; //大于当前的禁止，小于7天前的禁止
        }
      },
      //日期只能选择今日或之前
      pickerOptions2: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6; //如果没有后面的-8.64e6就是不可以选择今天的
        }
      },
      zongTiao: 0,
      addGuan: true,
      zai: "查看更多跟评",
      scolad: 0,
      id: "",
      //导出公函ids
      ids: [],
      //关键字
      guanjian: [],
      //主关键字
      zhu: "",
      //副关键字
      fu: "",
      //条数
      PageSize: 10,
      //页数
      PageIndex: 1,
      //类型
      vallei: "全部",
      plID: "",
      intstr: "",
      hua: 0,
      //删除提示框
      rbox: false,
      rmIndex: 0,
      //方案是新增还是编辑
      bianji: "",
      bianIn: 0,
      kt: "",
      //定时器
      timr: "",
      //方案名称
      main: "", //主关键词
      vice: [], //副关键词
      intbox1: "", //方案名称
      intbox2: "",
      intbox3: "",
      intbox4: "",
      //box时间
      valdate: "",
      xian: false,
      arr: [],
      fadeToolg: "显示",
      //详情全选
      checkAll1: false,
      checkedxiangQ: [],
      xiangQ: [],
      isIndeterminate1: false,
      //平台
      checkAll: true,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,
      //网友全选
      checkAll2: false,
      checkedCities2: [],
      cities2: [],
      isIndeterminate2: false,

      radio: "1",
      hieen1: true,
      hieen2: true,
      load: true,
      shuaxin: true,
      load2: true,
      shuaxin2: true,
      wenzhang: [],
      wenzhang2: [],
      checked1: true,
      checked2: true,
      tabPosition: "top",
      input: "",
      input2: "",
      options: [
        {
          value: 3,
          label: "时间降序"
        },
        {
          value: 1,
          label: "点赞数量"
        }
      ],
      value: 3,
      options2: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "已收藏"
        }
      ],
      value2: 1,
      value6: "",
      value7: [],
      xian: false,
      tt: "ks",
      planFlag: 0,
      bgId: "",
      pageFlag: true
    };
  },
  methods: {
    numType(num) {
      let number = parseFloat(num);
      if (number >= 10000 && number < 9999599) {
        number = (number / 10000).toFixed(1) + "万";
      }
      if (number >= 9999599 && number < 99599999) {
        number = (number / 10000000).toFixed(1) + "千万";
      }
      if (number >= 99599999 && number < 9959999999) {
        number = (number / 100000000).toFixed(1) + "亿";
      }
      if (number >= 9959999999) {
        number = (number / 100000000000).toFixed(1) + "千亿";
      }
      return number;
    },
    //收藏1
    shoucang1(index) {
      this.cities2[index].shou = !this.cities2[index].shou;
      var id = this.cities2[index].id;
      this.$axios
        .post(url + "Api/topicfollow/TopicStore", {
          TopicFollowId: id,
          //收藏
          // IsStore:this.wenzhang2[index].isStore
          CustomerId: 1
        })
        .then(
          res => {
            if (res.data.isOperationSuccess) {
              if (this.cities2[index].shou) {
                this.$message({
                  type: "success",
                  message: "收藏成功",
                  duration: 800
                });
              } else {
                this.$message({
                  type: "info",
                  message: "取消收藏",
                  duration: 800
                });
              }
            }
          },
          err => {
            // console.log(err);
          }
        )
        .catch(error => {
          //console.log(error);
        });
    },
    //复制到粘贴板
    copyUrl2() {
      var str = "";
      var cities = this.checkedxiangQ;
      console.log(this.checkedxiangQ);
      if (cities.length < 1) {
        this.$message({
          type: "info",
          message: "请选择复制的内容",
          duration: 800
        });
        return false;
      }
      var brr = [];
      cities.forEach((x, i) => {
        brr.push(
          i +
            1 +
            "." +
            x.title +
            "\n" +
            "新闻地址：" +
            x.com +
            "\n" +
            "评论内容：" +
            x.con +
            "\n" +
            "评论昵称：" +
            x.name +
            "\n" +
            "评论时间：" +
            x.publishTimeStr
        );
      });
      str = brr.join("\n\n");
      var Url2 = document.getElementById("biao1");
      Url2.innerHTML = str;
      Url2.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        type: "success",
        message: "已复制好可粘贴",
        duration: 800
      });
    },
    //搜索
    souIpt() {
      this.PageIndex = 1;
      if (this.checkedCities.length == 0) {
        this.$message({
          type: "info",
          message: "请选择网站平台",
          duration: 800
        });
        return false;
      }
      if (this.plID == "") {
        this.$message({
          type: "info",
          message: "请选择方案",
          duration: 800
        });
        return false;
      }
      this.cities2.length = 0;
      this.iptLoad();
    },
    //导出
    dao1() {
      if (this.checkedCities.length == 0) {
        this.$message({
          type: "info",
          message: "请选择网站平台",
          duration: 800
        });
        return false;
      }
      if (this.plID == "") {
        this.$message({
          type: "info",
          message: "请选择方案",
          duration: 800
        });
        return false;
      }
      var _this = this;
      var dat, time, beginDate, endDate, month, date;
      if (this.value7.length > 0) {
        time = this.value7;
        month =
          time[0].getMonth() < 10
            ? "0" + (time[0].getMonth() + 1)
            : time[0].getMonth() + 1;
        date =
          time[0].getDate() < 10 ? "0" + time[0].getDate() : time[0].getDate();
        beginDate = time[0].getFullYear() + "-" + month + "-" + date;
        month =
          time[1].getMonth() < 10
            ? "0" + (time[1].getMonth() + 1)
            : time[1].getMonth() + 1;
        date =
          time[1].getDate() < 10 ? "0" + time[1].getDate() : time[1].getDate();
        endDate = time[1].getFullYear() + "-" + month + "-" + date;
      } else {
        beginDate = "";
        endDate = "";
      }
      if (this.checkedCities.length > 0) {
        _this.value = _this.value == "时间降序" ? 3 : _this.value;
        _this.vallei = _this.vallei == "全部" ? 1 : _this.vallei;
        dat = {
          //条数
          PageSize: _this.PageSize,
          //页码
          PageIndex: _this.PageIndex,
          //网站id
          WebsiteIds: _this.checkedCities,
          //标题
          Title: _this.input,
          //开始时间
          BeginTime: beginDate,
          //结束时间
          EndTime: endDate,
          //排序
          TopicOrderBy: _this.value,
          //类型
          SearchType: _this.vallei,
          //方案id
          PlanId: _this.plID
        };
        var str = "";
        _this.checkedCities.forEach(x => {
          str += "WebsiteIds=" + x + "&";
        });
        const rLoading = this.openLoading();
        window.location.href = `${url}Api/TopicFollow/ExportTopicFollowForPlan?${str}Title=${_this.input}&TopicOrderBy=${_this.value}&SearchType=${_this.vallei}&PlanId=${_this.plID}&BeginTime=${beginDate}&EndTime=${endDate}`;
        this.$axios
          .get(
            `${url}Api/TopicFollow/ExportTopicFollowForPlan?${str}Title=${_this.input}&TopicOrderBy=${_this.value}&SearchType=${_this.vallei}&PlanId=${_this.plID}&BeginTime=${beginDate}&EndTime=${endDate}`
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
      } else {
        this.$message({
          type: "info",
          message: "请选择网站平台",
          duration: 800
        });
      }
    },
    //获取方案id
    getID(pid, ste, index) {
      this.plID = pid;
      for (let i = 0; i < this.arr.length; i++) {
        if (i == index) {
          continue;
        }
        this.arr[i].bg = false;
      }
      this.arr[index].bg = !this.arr[index].bg;
      if (this.arr[index].bg) {
        window.sessionStorage.setItem("flagPlan", 1);
        this.cities2.length = 0;
        //  this.xiangQ.length=0;
        this.plID = this.arr[index].id;
        this.checkAll = true;
        this.handleCheckAllChange(this.checkAll);
      } else {
        this.plID = "";
        window.sessionStorage.setItem("flagPlan", 0);
        this.cities2.length = 0;
        //  this.xiangQ.length=0;
        this.zongTiao = 0;
        return false;
      }
      this.souIpt();
    },
    //新闻列表加载
    iptLoad() {
      var _this = this;
      this.load2 = false;
      var dat, time, beginDate, endDate, month, date;
      if (this.value7.length > 0) {
        time = this.value7;
        month =
          time[0].getMonth() < 10
            ? "0" + (time[0].getMonth() + 1)
            : time[0].getMonth() + 1;
        date =
          time[0].getDate() < 10 ? "0" + time[0].getDate() : time[0].getDate();
        beginDate = time[0].getFullYear() + "-" + month + "-" + date;
        month =
          time[1].getMonth() < 10
            ? "0" + (time[1].getMonth() + 1)
            : time[1].getMonth() + 1;
        date =
          time[1].getDate() < 10 ? "0" + time[1].getDate() : time[1].getDate();
        endDate = time[1].getFullYear() + "-" + month + "-" + date;
      } else {
        beginDate = "";
        endDate = "";
      }
      if (this.checkedCities.length > 0) {
        _this.value = _this.value == "时间降序" ? 3 : _this.value;
        _this.vallei = _this.vallei == "全部" ? 1 : _this.vallei;
        dat = {
          CustomerId: 1,
          //条数
          PageSize: this.PageSize,
          //页码
          PageIndex: this.PageIndex,
          //网站id
          WebsiteIds: this.checkedCities,
          //标题
          Title: this.input.trim(),
          //开始时间
          BeginTime: beginDate,
          //结束时间
          EndTime: endDate,
          //排序
          TopicOrderBy: _this.value,
          //类型
          SearchType: _this.vallei,
          //方案id
          Planid: this.plID
        };
        //isStore
        this.$axios
          .post(url + "Api/TopicFollow/GetTopicFollowForPlanList", dat)
          .then(
            res => {
              if (res.data.isOperationSuccess) {
                window.sessionStorage.setItem(
                  "planSouTpt",
                  JSON.stringify(dat)
                );
                var arr = res.data.result.topicFollowList;
                this.zongTiao = res.data.result.recordCount;
                if (arr.length == 0) {
                  this.hua = "98k";
                  this.load2 = true;
                  this.zai = "没有更多内容";
                  return false;
                }
                arr.forEach((x, i) => {
                  x.checked = false;
                  x.shou = x.isStore;
                  x.flag = i;
                  x.zan = false;
                  x.tui = false;
                  x.Planid = dat.Planid;
                });
                arr.forEach((x, i) => {
                  _this.xiangQ.forEach((k, t) => {
                    if (x.id == k.inx) {
                      x.tui = true;
                    }
                  });
                });
                arr.forEach(x => {
                  this.cities2.push(x);
                });
                // if (this.pageFlag) {
                //   this.details(this.cities2[0].id, 0);
                //   this.pageFlag = false;
                // }
                this.hua = 0;
                this.zai = "查看更多跟评";
                this.PageIndex++;
                this.load2 = true;
              }
            },
            err => {
              // console.log(err);
            }
          )
          .catch(error => {
            // console.log(error);
          });
      } else {
        this.$message({
          type: "info",
          message: "请选择网站平台",
          duration: 800
        });
        this.load2 = true;
      }
    },
    //获取网站平台
    comLoad() {
      this.$axios.get(url + "Api/Website/GetRunWebsiteList").then(res => {
        if (res.data.isOperationSuccess) {
          this.cities = res.data.result.websiteModelList;
          // this.cities.forEach((x, i) => {
          //   if (x.name == "天天快报") {
          //     this.cities.splice(i, 1);
          //   }
          // });
          this.checkAll = true;
          this.handleCheckAllChange(this.checkAll);
          if (this.arr.length > 0) {
            this.getID(this.arr[0].id, this.arr[0].an, 0);
          }
        }
      });
    },
    //获取方案
    planLoad() {
      this.$axios
        .get(
          url + "api/MonitorPlan/GetMonitorPlanListByCustomerId?customerId=1"
        )
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
            var crr = res.data.result.monitorPlanList;
            crr.forEach((x, i) => {
              if (x.status == 1) {
                x.an = "运行中";
                x.state = true;
              } else {
                x.an = "已暂停";
                x.state = false;
              }
              x.time = x.beginTime.substr(0, 10);
              x.num = x.dataCount;
              if (x.id == this.bgId) {
                x.bg = true;
              } else {
                x.bg = false;
              }
              x.jinDu = x.planRunStatusPercentage.split(".")[0];
            });
            this.arr = crr;
            this.arr.forEach(x => {
              if (x.id == this.plID) {
                x.bg = true;
              }
            });
            if (this.pageFlag) {
              //获取网站平台
              this.comLoad();
            }
          }
        });
    },
    //详情
    details(sikid, index, Planid) {
      // console.log(sikid + "..." + index);
      var _this = this;
      var len = this.cities2.length;
      this.cities2[index].tui = !this.cities2[index].tui;
      if (this.cities2[index].tui) {
        this.$axios
          .get(url + "api/TopicFollow/GetTopicFollowDetail?followId=" + sikid)
          .then(
            res => {
              if (res.data.isOperationSuccess) {
                var obj = res.data.result;
                obj.title = obj.topicTitle;
                obj.com = obj.sourceUrl;
                obj.name = obj.nickName;
                obj.con = obj.content;
                obj.inx = sikid;
                obj.Planid = Planid;
                _this.xiangQ.push(obj);
                this.checkAll1 = false;
              }
            },
            err => {
              // console.log(err);
            }
          )
          .catch(error => {
            //console.log(error);
          });
      } else {
        var kt;
        _this.xiangQ.forEach((x, i) => {
          if (sikid == x.inx) {
            kt = i;
          }
        });
        _this.xiangQ.splice(kt, 1);
        return false;
      }
    },
    dao2() {
      this.ids = [];
      this.checkedxiangQ.forEach(x => {
        this.ids.push(x.id);
      });
      var _this = this;
      var str = "";
      _this.ids.forEach(x => {
        str += "followIds=" + x + "&";
      });
      if (this.checkedxiangQ.length < 1) {
        this.$message({
          type: "info",
          message: "请选择需要导出的内容",
          duration: 800
        });
        return false;
      }
      str = str.substr(0, str.length - 1);
      const rLoading = this.openLoading();
      window.location.href = `${url}Api/TopicFollow/ExportTopicFollowForOfficialLetter?${str}`;
      this.$axios
        .get(`${url}Api/TopicFollow/ExportTopicFollowForOfficialLetter?${str}`)
        .then(response => {
          if (response.status == 200) {
            rLoading.close();
          }
        })
        .catch(function(error) {
          this.$message.error("下载失败！");
        });
    },
    //清空详情
    arrNull() {
      this.xiangQ = [];
      this.cities2.forEach(x => {
        x.tui = false;
      });
      this.checkAll1 = false;
      this.checkedxiangQ = [];
    },
    //全部网站显示隐藏
    xianSou() {
      let ping = document.querySelector(".pingTai");
      let xianshi = document.querySelector(".xianshi");
      ping.classList.toggle("hid");
      xianshi.classList.toggle("add");
      if (ping.getAttribute("class") == "pingTai flex hid") {
        this.fadeToolg = "收起";
      } else {
        this.fadeToolg = "显示";
      }
    },
    //平台全选
    handleCheckAllChange(val) {
      var arr = [];
      this.cities.forEach(x => {
        arr.push(x.id);
      });
      this.checkedCities = val ? arr : [];
      this.isIndeterminate = false;
    },
    //网站平台选择
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    //评论详情全选
    handleCheckAllChange1(val) {
      var arr = [];
      this.xiangQ.forEach(x => {
        arr.push(x);
      });
      this.checkedxiangQ = val ? arr : [];
      this.isIndeterminate1 = false;
    },
    //评论详情单选
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.xiangQ.length;
      this.isIndeterminate1 =
        checkedCount > 0 && checkedCount < this.xiangQ.length;
      console.log(this.checkedxiangQ);
    },
    //新闻列表全选
    handleCheckAllChange2(val) {
      var arr = [];
      this.cities2.forEach(x => {
        arr.push(x.id);
      });
      this.checkedCities2 = val ? arr : [];

      this.isIndeterminate2 = false;
    },
    //新闻列表单选
    handleCheckedCitiesChange2(value) {
      let checkedCount2 = value.length;
      this.checkAll2 = checkedCount2 === this.cities2.length;
      this.isIndeterminate2 =
        checkedCount2 > 0 && checkedCount2 < this.cities2.length;
    },
    //追加副关键字
    addBOX() {
      //原关键字长度
      var kt = this.guanjian.length;
      if (this.intbox2.trim() != "") {
        var str = this.intbox2;
        var dou = [];
        var fen = [];
        var shu = [];
        var kong = [];
        dou = str.split(",");
        dou.forEach(x => {
          x.split(";").forEach(k => {
            fen.push(k);
          });
        });
        fen.forEach(x => {
          x.split("|").forEach(k => {
            shu.push(k);
          });
        });
        shu.forEach(x => {
          x.split(" ").forEach(k => {
            kong.push(k);
          });
        });
        var arr = [];
        kong.forEach(x => {
          if (x != "") {
            arr.push(x);
          }
        });
        var crr = [];
        var zhuLen = arr.length;
        this.intbox2 = "";
        if (this.intbox3.trim() != "") {
          var str = this.intbox3;
          var dou = [];
          var fen = [];
          var shu = [];
          var kong = [];
          dou = str.split(",");
          dou.forEach(x => {
            x.split(";").forEach(k => {
              fen.push(k);
            });
          });
          fen.forEach(x => {
            x.split("|").forEach(k => {
              shu.push(k);
            });
          });
          shu.forEach(x => {
            x.split(" ").forEach(k => {
              kong.push(k);
            });
          });
          var brr = [];
          kong.forEach(x => {
            if (x != "") {
              brr.push(x);
            }
          });
          for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < brr.length; j++) {
              crr.push({
                zhu: arr[i],
                fu: brr[j]
              });
            }
          }
          this.intbox3 = "";
          crr.forEach(x => {
            this.guanjian.push(x);
          });
        } else {
          arr.forEach(x => {
            this.guanjian.push({ zhu: x });
          });
        }
      } else {
        this.$message({
          type: "info",
          message: "请输入关键字",
          duration: 800
        });
      }
    },
    //未知
    upedBOX() {
      if (this.intbox3.trim() != "" && this.intbox2.trim() != "") {
        this.guanjian = [];
        this.guanjian.push({
          zhu: this.intbox2,
          fu: this.intbox3
        });
        this.intbox3 = "";
        this.intbox2 = "";
        var arr = [];
        var brr = [];
        this.guanjian.forEach(x => {
          arr.push(x.zhu);
          brr.push(x.fu);
        });
        this.zhu = arr.join(";");
        this.fu = brr.join(";");
        this.addGuan = true;
      } else {
        this.$message({
          type: "info",
          message: "请输入内容",
          duration: 800
        });
      }
    },
    //添加或编辑方案
    yes() {
      let _this = this;
      if (
        _this.intbox1.trim() != "" &&
        _this.valdate &&
        _this.guanjian.length >= 1
      ) {
        var seperator1 = "-";
        var year = _this.valdate.getFullYear();
        var month = _this.valdate.getMonth() + 1;
        var strDate = _this.valdate.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var obj = {
          name: _this.intbox1,
          time: currentdate,
          state: true,
          num: "232",
          an: "运行中"
        };
        this.zhu = "";
        this.fu = "";
        var arr = [];
        var brr = [];
        this.guanjian.forEach(x => {
          arr.push(x.zhu);
          if (x.fu) {
            brr.push(x.fu);
          }
        });
        this.zhu = arr.join(";");
        this.fu = brr.join(";");
        if (this.bianji == "编辑方案") {
          this.$axios
            .post(url + "Api/MonitorPlan/MonitorPlanUpdate", {
              id: this.id,
              name: this.intbox1,
              beginTime: currentdate,
              primaryKeyWord: this.zhu,
              SubKeyWord: this.fu,
              ExcludeKeyWord: this.intbox4
            })
            .then(
              res => {
                if (res.data.isOperationSuccess) {
                  this.rbox = false;
                  this.$message({
                    type: "success",
                    message: "编辑成功",
                    duration: 800
                  });
                  //获取用户平台
                  this.planLoad();
                }
              },
              err => {
                // console.log(err);
              }
            )
            .catch(error => {
              // console.log(error);
            });
        } else {
          this.$axios
            .post(url + "Api/MonitorPlan/MonitorPlanAdd", {
              customerId: 1,
              name: this.intbox1,
              beginTime: currentdate,
              primaryKeyWord: this.zhu,
              SubKeyWord: this.fu,
              ExcludeKeyWord: this.intbox4
            })
            .then(
              res => {
                // console.log(res.data)
                if (res.data.isOperationSuccess) {
                  this.rbox = false;
                  this.planLoad();
                  this.$message({
                    type: "success",
                    message: "添加成功",
                    duration: 800
                  });
                }
              },
              err => {
                //console.log(err);
              }
            )
            .catch(error => {
              //console.log(error);
            });
        }
        this.xian = false;
      } else {
        this.$message({
          type: "info",
          message: "请输入内容或选择日期",
          duration: 800
        });
      }
    },
    //取消编辑方案或新增方案
    no() {
      this.xian = false;
      this.$message({
        type: "info",
        message: "已取消",
        duration: 800
      });
    },
    //弹出方案
    bgPlan() {
      this.xian = true;
      this.intbox3 = "";
      this.guanjian = [];
      this.intbox4 = "";
      this.intbox1 = "";
      this.valdate = "";
      this.intbox2 = "";
    },
    //弹出新增方案
    bgX() {
      this.bianji = "新增方案";
      this.addGuan = true;
      this.bgPlan();
    },
    //运行悬停
    boxover(index) {
      let box = document.querySelectorAll(".fangan .bttn .bTOP .btnBOX");
      box[index].style.display = "block";
    },
    //运行离开
    boxout(index) {
      let box = document.querySelectorAll(".fangan .bttn .bTOP .btnBOX");
      box[index].style.display = "none";
    },
    //运行中
    yun(index) {
      this.arr[index].an = "运行中";
      this.arr[index].state = true;
      let box = document.querySelectorAll(".fangan .bttn .bTOP .btnBOX");
      for (let i = 0; i < box.length; i++) {
        box[i].style.display = "none";
      }
      this.planStare(
        this.arr[index].id,
        this.arr[index].state,
        this.arr[index].bg
      );
    },
    //暂停
    stop(index) {
      this.arr[index].an = "已暂停";
      this.arr[index].state = false;
      let box = document.querySelectorAll(".fangan .bttn .bTOP .btnBOX");
      for (let i = 0; i < box.length; i++) {
        box[i].style.display = "none";
      }
      this.planStare(
        this.arr[index].id,
        this.arr[index].state,
        this.arr[index].bg
      );
    },
    //修改状态
    planStare(index, cool, bg) {
      var flag;
      if (cool) {
        flag = 1;
      } else {
        flag = 2;
      }
      this.$axios
        .post(url + "Api/MonitorPlan/MonitorPlanUpdateStatus", {
          id: index,
          customerId: 1,
          Status: flag
        })
        .then(
          res => {
            if (res.data.isOperationSuccess) {
              this.rbox = false;
              this.$message({
                type: "success",
                message: "修改状态成功",
                duration: 800
              });
              // console.log(bg)
              if (bg) {
                this.bgId = index;
              } else {
                this.bgId = "";
              }
              this.planLoad();
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => {
          console.log(error);
        });
    },
    //编辑
    wite(index, id) {
      this.bianji = "编辑方案";
      this.addGuan = false;
      this.id = id;
      this.$axios
        .get(url + "api/MonitorPlan/GetMonitorPlanById?id=" + id)
        .then(
          res => {
            // valdate
            if (res.data.isOperationSuccess) {
              var dat = res.data.result.monitorPlan;
              this.intbox1 = dat.name;
              this.intbox2 = "";
              this.intbox3 = "";
              this.intbox4 = dat.excludeKeyWord;
              this.valdate = new Date(dat.beginTime);
              this.guanjian = [];
              if (dat.primaryKeyWord != "") {
                var zhuArr = dat.primaryKeyWord.split(";");
                for (let i = 0; i < zhuArr.length; i++) {
                  if (zhuArr[i] == "") {
                    continue;
                  }
                  this.guanjian.push({ zhu: zhuArr[i] });
                }
                if (dat.subKeyWord != null) {
                  var fuArr = dat.subKeyWord.split(";");
                  for (let i = 0; i < fuArr.length; i++) {
                    if (fuArr[i] == "") {
                      continue;
                    }
                    this.guanjian[i].fu = fuArr[i];
                  }
                }
              } else {
                this.guanjian = [];
              }
              this.xian = true;
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => {
          console.log(error);
        });
    },
    //删除
    rem(index, id) {
      this.rbox = true;
      this.rmIndex = id;
    },
    //确定删除
    closeyes() {
      var index = this.rmIndex;
      this.$axios
        .post(url + "Api/MonitorPlan/MonitorPlanDelete", {
          id: index
        })
        .then(
          res => {
            if (res.data.isOperationSuccess) {
              this.rbox = false;
              this.planLoad();
              this.$message({
                type: "success",
                message: "删除成功",
                duration: 800
              });
            }
          },
          err => {
            console.log(err);
          }
        )
        .catch(error => {
          console.log(error);
        });
    },
    //取消删除
    closeno() {
      this.rbox = false;
      this.$message({
        type: "info",
        message: "已取消",
        duration: 800
      });
    },
    //查看更多跟评
    loand2() {
      var _this = this;
      this.hua++;
      if (this.hua == 1) {
        this.load2 = false;
        var _this = this;
        setTimeout(() => {
          _this.load2 = true;
          if (_this.load2) {
            _this.iptLoad();
          }
        }, 200);
      }
    },
    //滚动加载callback
    onScroll1() {
      var _this = this;
      _this.cabll(_this.scrll(), 100);
    },
    //鼠标向下滚动到底部
    scrll() {
      var _this = this;
      _this.p = document.querySelector("#scroll1").scrollTop;
      var scrollTop = document.querySelector("#scroll1").scrollTop,
        scrollHeight = document.querySelector("#lei").clientHeight,
        clientHeight = document.querySelector("#scroll1").clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.hua++;
        if (this.hua == 1) {
          this.load2 = false;
          var _this = this;
          setTimeout(() => {
            _this.load2 = true;
            if (_this.load2) {
              _this.iptLoad();
            }
          }, 200);
        }
      } else if (scrollTop <= 0) {
        return false;
      }
    },
    //新闻列表回调函数
    cabll(callback, ms, flag) {
      var _this = this;
      if (flag) {
        callback();
      }
      return function() {
        clearTimeout(timr);
        _this.timr = setTimeout(function() {
          callback();
        }, ms);
      };
    }
  },
  computed: {},
  mounted() {},
  created() {
    //获取用户方案
    this.planLoad();
    document.querySelector("body").style.overflow = "hidden";
  },
  updated() {}
};
</script>

<style scoped="scoped" lang="less">
.xx {
  cursor: pointer;
  color: gainsboro;
}

.xx:hover {
  color: black;
}
#index .inLeft .fangan .bttn .bZhong div {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#biao1 {
  width: 1px;
  height: 1px;
  opacity: 0;
}
.sou:hover {
  background: rgba(226, 241, 255, 1);
  cursor: pointer;
}
#rmBox {
  width: 480px;
  height: 194px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.16);
  position: fixed;
  // display: none;
  top: 19.1%;
  left: 37%;
  z-index: 9999;
  .top {
    width: 480px;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid rgba(213, 215, 221, 1);
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    padding-left: 24px;
    .box;
    color: rgba(48, 52, 49, 1);
  }
  .xin {
    height: 70px;
    align-items: center;
    font-size: 14px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(96, 98, 97, 1);
  }
  .woing {
    width: 24px;
    height: 24px;
    margin-left: 24px;
    margin-right: 10px;
    background: rgba(252, 96, 128, 1);
    border-radius: 50%;
    display: block;
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    color: white;
  }
}
.btnBOX {
  display: none;
  width: 120px;
  position: absolute;
  top: 40px;
  z-index: 888;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 4px rgba(30, 30, 30, 0.05);
  border-radius: 2px;
  .btn {
    width: 120px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(96, 98, 97, 1);
  }
  .btn:hover {
    background: rgba(99, 226, 158, 0.19);
    cursor: pointer;
  }
  .btn > div {
    padding-left: 40px;
  }
  .btn:nth-child(1) div {
    background: url(../assets/img/clock.png) no-repeat 16px center;
  }
  .btn:nth-child(2) div {
    background: url(../assets/img/minus-circle.png) no-repeat 16px center;
  }
  .btn:nth-child(3) div {
    background: url(../assets/img/edit.png) no-repeat 16px center;
  }
  .btn:nth-child(4) div {
    background: url(../assets/img/trash-2.png) no-repeat 16px center;
  }
}

.br {
  width: 530px;
  height: 1px;
  background: rgba(213, 215, 221, 1);
  margin-top: 24px;
}
#lei {
  padding: 0 24px;
}
#bg {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 400%;
  height: 100%;
  background: black;
  /*定义透明度   0 - 1 */
  opacity: 0.5;
  z-index: 2000;
}
#bgg {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 400%;
  height: 100%;
  background: black;
  /*定义透明度   0 - 1 */
  opacity: 0.5;
  z-index: 2000;
}
.tanBox::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: white;
}
.tanBox:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
}
.tanBox {
  width: 588px;
  height: 594px;
  padding-bottom: 30px;
  overflow-y: scroll;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.16);
  position: fixed;
  top: 180px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2001;
  .btm {
    padding: 0 24px;
    .er {
      margin-top: 16px;
      width: 530px;
      overflow: hidden;
      .box;
      font-size: 14px;
      line-height: 36px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(96, 98, 97, 1);
      .flex;
      align-items: center;
      position: relative;
      .lei {
        width: 530px;
        height: 36px;
        border-radius: 2px;
        border: 1px solid rgba(213, 215, 221, 1);
        padding-left: 10px;
      }
      .clo {
        width: 20px;
        height: 20px;
        border: 1px solid rgba(213, 215, 221, 1);
        border-radius: 50%;
        line-height: 20px;
        position: absolute;
        right: 8px;
        .cen;
        cursor: pointer;
      }
    }

    .yi {
      justify-content: space-between;
      .leftyi {
        div {
          margin-bottom: 8px;
        }
      }
      .rightyi {
        div {
          margin-bottom: 8px;
        }
      }
    }
    .lie {
      margin: 24px 0px;
      .lieShang {
        margin-bottom: 8px;
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
    padding-left: 24px;
  }
  .wid {
    width: 250px;
    height: 36px;
  }
}

.dao {
  cursor: pointer;
  width: 100px;
  height: 36px;
  line-height: 36px;
  padding-left: 31px;
  border-radius: 4px;
  // border: 1px solid rgba(213, 215, 221, 1);
  font-size: 14px;
  font-family: PingFangTC-Regular;
  font-weight: 400;
  .box;
  color: rgba(70, 128, 255, 1);
  background: url(../assets/img/CombinedShape.png) no-repeat 11px center;
}
.xianshi {
  border-top: 1px solid rgba(213, 215, 221, 1);
  margin-top: 14px;
  .xianBtn {
    width: 110px;
    cursor: pointer;
    height: 26px;
    border-radius: 0px 0px 4px 4px;
    border: 1px solid rgba(230, 231, 235, 1);
    border-top: 0px;
    margin: auto;
    font-size: 12px;
    font-family: PingFangTC-Regular;
    font-weight: 400;
    color: rgba(145, 147, 152, 1);
    line-height: 26px;
    padding-left: 8px;
    .box;
    background: url(../assets/img/botm.png) no-repeat 88px center;
  }
}
.xianshi.add {
  .xianBtn {
    background: url(../assets/img/top.png) no-repeat 88px center;
  }
}
.pingTai {
  .box;
  height: 30px;
  overflow: hidden;
  transition: all 1s;
}
.pingTai.hid {
  height: auto;
}
.onLeft {
  .iptShu {
    margin-bottom: 26px;
    justify-content: space-between;
    .onTop {
      margin-bottom: 8px;
    }
  }
  .pai {
    justify-content: center;
  }
}
.olad:hover {
  cursor: pointer;
}
.shua:hover {
  cursor: pointer;
}
.jiazai {
  img {
    margin: auto;
    margin-left: 50%;
    transform: translate(-50%);
  }
  div {
    .cen;
  }
}
.olad {
  width: 110px;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  .flex;
  align-items: center;
  text-align: center;
  margin: auto;
  margin-bottom: 90px;
}
.xiah {
  width: 14px;
  height: 10px;
  display: block;
  background: url(../assets/img/bottm.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 8px;
}
.boox {
  padding: 0 8px;
  margin: 0;
}
.lei {
  font-size: 14px;
  font-family: PingFang-SC-Medium;
  font-weight: 800;
  color: rgba(96, 98, 102, 1);
}
.lan {
  font-size: 14px;
  font-family: PingFangTC-Regular;
  font-weight: 400;
  color: rgba(70, 128, 255, 1);
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
@keyframes ks {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
#index {
  .inLeft {
    height: 88vh;
    min-width: 344px;
    max-width: 344px;
    background: rgba(255, 255, 255, 1);
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 66;
    padding: 29px 24px;
    padding-right: 0px;
    border-right: 2px solid rgba(213, 215, 221, 1);
    .fangan {
      width: 316px;
      height: 116px;
      position: relative;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
      border-radius: 4px;
      margin-top: 16px;
      padding: 16px;
      border: 2px solid white;
      .box;
      .bttn {
        .flex;
        flex-wrap: wrap;
        .progress {
          width: 40px;
          height: 40px;
          background-image: linear-gradient(to bottom, #7a88ff, #7affaf);
          border-radius: 50%;
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 5px;
          animation: ks 2s infinite linear;
          .box;
          .prog {
            width: 30px;
            height: 30px;
            background: white;
            border-radius: 50%;
          }
        }
        .progress.jieShu {
          background: #7affaf;
        }
        .jinDu {
          width: 30px;
          height: 30px;
          line-height: 30px;
          .cen;
          position: absolute;
          top: 15px;
          right: 15px;
          font-size: 12px;
        }
        .bBtm {
          width: 100%;
          margin-bottom: 18px;
          .flex;
          .tmleft {
            width: 98px;
            height: 20px;
            line-height: 20px;
            .cen;
            background: #f5f5f5;
            border-radius: 4px;
            font-size: 12px;
            font-family: PingFangTC-Regular;
            font-weight: 400;
            color: rgba(145, 147, 152, 1);
          }
          .tmright {
            margin-left: 31px;
            width: 146px;
            height: 20px;
            line-height: 20px;
            .cen;
            background: #ffebee;
            border-radius: 4px;
            font-size: 12px;
            font-family: PingFangTC-Regular;
            font-weight: 400;
            color: rgba(252, 96, 128, 1);
          }
        }
        .bZhong {
          width: 100%;
          height: 36px;
          line-height: 36px;
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(48, 49, 50, 1);
        }
        .bTOP {
          width: 100%;
          width: 82px;
          height: 26px;
          background: #daf8e8;
          border-radius: 4px;
          font-size: 14px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(48, 49, 50, 1);
          .an {
            width: 82px;
            height: 26px;
            padding-left: 32px;
            line-height: 26px;
            cursor: pointer;
            background: url(../assets/img/clock.png) no-repeat 8px center;
          }
        }
      }
    }
    .bg {
      border: 2px solid #409eff;
    }
    .fangan2.bg {
      border: 2px solid red;
    }
    .fangan2 {
      background: #f6f6f6;
      .bttn {
        .bTOP {
          background: #ffebee;
          .an {
            background: url(../assets/img/minus-circle.png) no-repeat 8px center;
          }
        }
        .bBtm {
          .tmleft {
            background: #f0f1f2;
            color: rgba(145, 147, 152, 1);
          }
          .tmright {
            background: #f0f1f2;
            color: rgba(145, 147, 152, 1);
          }
        }
      }
    }
    .tianjia {
      margin-top: 16px;
      width: 316px;
      height: 36px;
      cursor: pointer;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.14);
      .jiaBtn {
        width: 316px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        padding-left: 134px;
        color: rgba(48, 49, 50, 1);
        background: url(../assets/img/CombinedShape.png) no-repeat 112px center;
      }
    }
    .jia {
      margin: 24px 0px;
      margin-bottom: 0px;
      width: 100px;
      height: 36px;
      line-height: 36px;
      border-radius: 4px;
      border: 1px solid rgba(213, 215, 221, 1);
      padding-left: 32px;
      .box;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 800;
      color: rgba(70, 128, 255, 1);
      background: url(../assets/img/jia.png) no-repeat 10px center;
    }
    .top {
      .flex;
      transform: translateY(-4px);
      align-items: center;
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(48, 49, 51, 1);
      span {
        width: 3px;
        height: 16px;
        background: rgba(117, 178, 255, 1);
        display: block;
        margin-right: 4px;
      }
    }
    .copy {
      cursor: pointer;
      width: 124px;
      height: 36px;
      line-height: 36px;
      padding-left: 31px;
      border-radius: 4px;
      border: 1px solid rgba(213, 215, 221, 1);
      font-size: 14px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(70, 128, 255, 1);
      .box;
      background: url(../assets/img/copy.png) no-repeat 6px center;
    }
    .kong {
      cursor: pointer;
      width: 100px;
      height: 36px;
      line-height: 36px;
      .box;
      font-size: 14px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(70, 128, 255, 1);
      border-radius: 4px;
      border: 1px solid rgba(213, 215, 221, 1);
      background: url(../assets/img/trash.png) no-repeat 26px center;
      padding-left: 47px;
    }
    .quanAll {
      height: 56px;
      line-height: 56px;
      margin-right: 24px;
      margin-top: 24px;
      background: #f2f3f4;
      font-size: 14px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
    }
    .tie {
      font-size: 14px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      margin-right: 24px;
      padding: 24px 0;
      .tt {
        padding: 16px 0px;
        .box;
        border-bottom: 1px solid rgba(213, 215, 221, 1);
        .flex;
        .left {
          width: 70px;
          padding-left: 8px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 800;
          color: rgba(145, 147, 152, 1);
          white-space: nowrap;
        }
        .right {
          width: 144px;
          font-size: 14px;
          font-family: PingFang-SC-Medium;
          font-weight: 800;
          color: rgba(96, 98, 102, 1);
          word-break: break-all;
          width: 235px;
        }
      }
    }
    .sou {
      .flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 800;
      color: rgba(96, 98, 102, 1);
      .ipt {
        width: 142px;
        height: 30px;
        border-radius: 4px;
        border: 1px solid rgba(213, 215, 221, 1);
        padding-left: 1px;
        .flex;
        input {
          width: 112px;
          height: 30px;
          border: 0px;
          padding: 0;
          outline: none;
          padding-left: 8px;
          .box;
        }
        .iptsou {
          width: 30px;
          height: 30px;
          background: rgba(70, 128, 255, 1);
          border-radius: 0px 4px 4px 0px;
          .icon {
            width: 30px;
            height: 30px;
            background: url(../assets/img/sou.png) no-repeat center;
            cursor: pointer;
          }
        }
      }
    }
  }
  .inLeft::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
}
section {
  width: 100%;
  height: 100vh;
  .box;
  background: white;
  .flex;
  position: relative;
  .btnLeft {
    z-index: 999;
    width: 16px;
    height: 44px;
    border-radius: 4px 0px 0px 4px;
    position: absolute;
    background: rgba(192, 196, 204, 1);
    top: 40%;
    left: -16px;
    cursor: pointer;
    .flex;
    align-items: center;
    justify-content: center;
    .btnzuo {
      width: 10px;
      height: 20px;
      background: url(../assets/img/zuo.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .zhuan1 {
    left: 0px;
    transform: rotateY(180deg);
  }
  .btnRight {
    z-index: 999;
    width: 16px;
    height: 44px;
    border-radius: 0 4px 4px 0;
    position: absolute;
    background: rgba(192, 196, 204, 1);
    top: 40%;
    right: -16px;
    cursor: pointer;
    .flex;
    align-items: center;
    justify-content: center;
    .btnzuo {
      width: 10px;
      height: 20px;
      background: url(../assets/img/zuo.png) no-repeat;
      transform: rotateY(180deg);
      background-size: 100% 100%;
    }
  }
  .zhuan2 {
    right: 0px;
    transform: rotateY(180deg);
  }
  .leiCon {
    ul {
      li:hover {
        box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.09);
        border: 1px solid rgba(115, 177, 255, 1);
      }
      li {
        padding-left: 4px;
        border: 1px solid white;
        border-bottom: 1px solid rgba(213, 215, 221, 1);
        .box;
        .zhong {
          margin-bottom: 24px;
        }
        .toop {
          .flex;
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          font-family: PingFangTC-Regular;
          font-weight: 400;
          color: rgba(145, 147, 152, 1);
          justify-content: space-between;
          .routop {
            .flex;
            align-items: center;
            .num {
              margin: 0 10px 0 8px;
            }
            .zan,
            .xing,
            .tui {
              width: 15px;
              height: 15px;
              display: block;
              background: url(../assets/img/arrow-right.png) no-repeat 0 2px;
              background-size: 100% 100%;
              margin-left: 8px;
            }
            .zan {
              background: url(../assets/img/thumbs-up.png) no-repeat;
            }
            .tui {
              background: url(../assets/img/arrow-right.png) no-repeat 0px 2px;
            }
            .rit {
              background: url(../assets/img/right.png) no-repeat 0 2px;
              transform: translateY(-2px);
            }
            .start {
              background: url(../assets/img/zan2.png) no-repeat;
              animation: zan 1s;
            }
            @keyframes zan {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.5);
              }
              100% {
                transform: scale(1);
              }
            }
          }
        }
        .hui {
          margin-top: 10px;
          margin-bottom: 10px;
          font-size: 12px;
          font-family: PingFangTC-Regular;
          font-weight: 400;
          color: rgba(145, 147, 152, 1);
          span {
            margin-right: 24px;
          }
        }
        .an {
          font-size: 14px;
          font-family: PingFangTC-Regular;
          font-weight: 400;
          color: rgba(96, 98, 102, 1);
        }
        .shang {
          font-size: 12px;
          font-family: PingFangTC-Regular;
          font-weight: 400;
          color: rgba(145, 147, 152, 1);
          height: 60px;
          line-height: 60px;
          .flex;
          align-items: center;
          .name {
            margin: 0 8px;
          }
          .da {
            width: 15px;
            height: 15px;
            display: block;
            background: url(../assets/img/da.png) no-repeat;
            background-size: 100% 100%;
            margin-left: 8px;
          }
          .reng {
            width: 15px;
            height: 15px;
            display: block;
            background: url(../assets/img/reng.png) no-repeat;
            background-size: 100% 100%;
            margin-left: 8px;
          }
          .shou {
            width: 15px;
            height: 15px;
            display: block;
            margin-left: 8px;
            background: url(../assets/img/star.png) no-repeat;
            background-size: 100% 100%;
          }
          .cang {
            background: url(../assets/img/starbg.png) no-repeat;
            background-size: 100% 100%;
          }
          .can {
            margin-left: 30px;
            width: 106px;
            height: 24px;
            line-height: 24px;
            .cen;
            border-radius: 4px;
            border: 1px solid rgba(252, 96, 128, 1);
            font-size: 12px;
            font-family: PingFangTC-Regular;
            font-weight: 400;
            color: rgba(252, 96, 128, 1);
          }
        }
      }
    }
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
  }
  .top span {
    width: 3px;
    height: 16px;
    background: rgba(117, 178, 255, 1);
    display: block;
    margin-right: 3px;
  }
  .onLeft::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  .onLeft:hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  .onLeft {
    background: white;
    width: 100%;
    height: 88vh;
    overflow-y: scroll;
    position: relative;
    padding: 0 24px;
    min-width: 542px;
    border-right: 2px solid rgba(213, 215, 221, 1);
    .box;
    .onTit {
      margin: 24px 0px;
      margin-bottom: 0px;
      font-size: 14px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(96, 98, 102, 1);
      height: 56px;
      .flex;
      align-items: center;
      justify-content: space-between;
      background: #f2f3f4;
      .shua {
        width: 56px;
        margin-right: 8px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        font-size: 14px;
        font-family: PingFangTC-Regular;
        font-weight: 400;
        color: rgba(48, 49, 50, 1);
      }
    }
    .sou {
      width: 100px;
      height: 36px;
      // margin: auto;
      margin-top: 8px;
      border-radius: 4px;
      border: 1px solid rgba(213, 215, 221, 1);
      .iptsou {
        width: 100px;
        height: 36px;
        line-height: 36px;
        padding-left: 44px;
        font-size: 14px;
        font-family: PingFangTC-Regular;
        font-weight: 400;
        color: rgba(70, 128, 255, 1);
        cursor: pointer;
        .box;
        background: url(../assets/img/sou2.png) no-repeat 16px center;
      }
      .kong {
        background: url(../assets/img/trash.png) no-repeat 16px center;
      }
      .dao {
        background: url(../assets/img/CombinedShape.png) no-repeat 16px center;
      }
    }
    .lie {
      .flex;
      height: 60px;
      align-items: center;
      padding-left: 24px;
      .left {
        width: 80px;
        height: 20px;
        font-size: 14px;
        font-family: PingFang-SC-Medium;
        font-weight: 800;
        color: rgba(96, 98, 102, 1);
        text-align: right;
        margin-right: 2%;
      }
      .right {
        input {
          width: 250px;
          height: 30px;
          border-radius: 4px;
          border: 1px solid rgba(213, 215, 221, 1);
          outline: none;
          margin-left: 5px;
          padding: 0px;
          padding-left: 8px;
          .box;
        }
      }
    }
  }
}
.botm {
  height: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  padding-top: 20px;
  padding-bottom: 20px;
  .box;
  .header {
    height: 48px;
    padding-top: 20px;
    .box;
    span {
      font-size: 14px;
      font-family: PingFangTC-Regular;
      font-weight: 400;
      color: rgba(48, 49, 51, 1);
      margin-left: 5px;
    }
  }
  .zuo {
    margin-right: 8px;
  }
  .gao {
    height: 32px;
    padding-top: 6px;
    padding-left: 20px;
    .box;
    align-items: center;
    cursor: pointer;
  }
  .gao span {
    width: 140px;
    height: 32px;
    line-height: 32px;
    padding-left: 4px;
    .box;
  }
  .gao span:hover {
    background: rgba(242, 246, 252, 1);
  }
  .gao1 {
    padding-left: 60px;
  }
}
.fang {
  width: 16px;
  height: 16px;
  border: 1px solid rgba(210, 211, 216, 1);
}
</style>