<template>
  <div id="index" class="flex">
    <div id="bg" v-show="flag"></div>
    <div id="box" v-show="flag" v-if="crr.length>=1">
      <div class="top flex">添加网站</div>
      <div class="btm">
        <div class="btmLie flex">
          <div class="left">网站类型：</div>
          <div class="right">
            <el-select v-model="boxVal1" placeholder="请选择" @change="box1()" style="width:250px;">
              <el-option
                v-for="(item,index) in crr"
                :key="item.boss"
                :label="item.boss"
                :value="item.boss"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="btmLie flex">
          <div class="left">网站名称：</div>
          <div class="right">
            <el-select v-model="boxVal2" placeholder="请选择" style="width:250px;">
              <el-option
                v-for="(item,index) in crr[len1].name"
                :key="item.t1"
                :value="item.t1"
                :label="item.t1"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="anniu" style="padding-left:150px;padding-top:32px">
        <el-button type="primary" style="margin-right:24px;width:100px" @click="yes()">确定</el-button>
        <el-button plain style="width:100px" @click="no()">取消</el-button>
      </div>
    </div>
    <div class="inLeft" v-show="hieen1">
      <!-- <div class="sou">
        <span>网站名称：</span>
        <div class="ipt">
          <input type="text" placeholder="请输入标题名称" v-model="iptTitle" @keydown.enter="titSetch()">
          <div class="iptsou">
            <div class="icon" @click="titSetch()"></div>
          </div>
        </div>
      </div>-->
      <!-- <div class="rba" style="width:100px;">
        <div class="jia cur" @click="addcom()">添加网站</div>
      </div>-->
      <div class="botm">
        <div class="header flex xian_dao flex gao" style="padding-left:10px">
          <div class="fang zuo" v-show="!xian" @click="all()"></div>
          <img
            src="../assets/img/形状复制.png"
            width="14px"
            height="14px"
            v-show="xian"
            class="zuo"
            @click="all()"
          />
          <span
            style="font-size:14px;
            font-family:PingFangTC-Regular;
            font-weight:400;
            color:rgba(96,98,102,1);"
          >全选</span>
        </div>
        <div class="xian" v-for="(val,index) in brr">
          <div class="xian_dao flex gao">
            <img
              src="../assets/img/xia.png"
              style="transform: rotate(0deg);"
              width="8px"
              height="8px"
              class="zuo zhuan"
              @click="zhan(index)"
            />
            <div class="fang zuo" v-show="!val.t2" @click="zhuan(index)"></div>
            <img
              src="../assets/img/形状复制.png"
              width="14px"
              height="14px"
              v-show="val.t2"
              class="zuo"
              @click="zhuan(index)"
            />
            <span @click="zhan(index)">{{val.boss}}</span>
          </div>
          <div class="er" v-if="val.zhan">
            <div class="gao gao1 flex" v-for="(kt,kb) in val.name" v-if="val.name">
              <div class="fang zuo" v-show="!kt.t2" @click="xuan(index,kb)"></div>
              <img
                src="../assets/img/形状复制.png"
                width="14px"
                height="14px"
                v-show="kt.t2"
                class="zuo"
                @click="xuan(index,kb)"
              />
              <span @click="xuan(index,kb)">{{kt.t1}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section>
      <div class="btnLeft" @click="hieen1=!hieen1" :class="{zhuan1:!hieen1}">
        <div class="btnzuo"></div>
      </div>
      <div class="btnRight" @click="hieen2=!hieen2" :class="{zhuan2:!hieen2}">
        <div class="btnzuo"></div>
      </div>
      <div class="onLeft" id="scroll1" @scroll="onScroll1()">
        <div id="lei">
          <div class="top">
            <span></span>新闻列表
          </div>
          <div class="lie">
            <div class="left">新闻标题:</div>
            <div class="right">
              <el-input
                v-model="input"
                placeholder="请输入标题"
                @keydown.enter.native="iptSou()"
                clearable
              ></el-input>
              <!-- <div class="start" @click="stFlag=!stFlag" :class="{'bg':stFlag}"></div> -->
            </div>
          </div>
          <div class="lie">
            <div class="left">日期:</div>
            <div class="right">
              <div class="block riqi" style="position: relative;">
                <el-date-picker
                  :picker-options="pickerOptions0"
                  v-model="value7"
                  type="daterange"
                  align="right"
                  :disabled="dis2"
                  @blur="dateBur()"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
                <span class="xx" style="position: absolute;top:3px;right:30px" @click="dateNull()">x</span>
              </div>
            </div>
          </div>
          <div class="lie">
            <div class="left">排序:</div>
            <div class="right">
              <el-select v-model="value" style="width:120px;margin-right:20px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <div class="left">类型:</div>
              <div class="right" style="width:200px;">
                <el-select v-model="valXin" style="width:120px;margin-left:5px;">
                  <el-option
                    v-for="item in optionX"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <div class="lie">
            <div class="left">时间:</div>
            <div class="right tme" :class="{'jincur':disabled}">
              <div
                class="rTime"
                v-for="(val,index) in timeR"
                :class="{'bg':val.bg,'disabled':disabled}"
                @click="timeQie(index)"
              >{{val.time}}</div>
            </div>
          </div>
          <div class="sou rba">
            <div class="iptsou" @click="iptSou()">搜索</div>
          </div>
          <div class="onTit">
            <div class="zuoleft">
              <el-checkbox
                style="line-height:30px;padding-left:12px"
                :indeterminate="isIndeterminate2"
                v-model="checkAll2"
                @change="handleCheckAllChange2"
                class="boox"
              ></el-checkbox>共有
              <span class="lan">{{record}}</span> 篇文章
            </div>
            <div class="shua" @click="uped()">刷新</div>
          </div>
          <div class="leiCon" v-show="shuaxin">
            <ul v-if="cities2.length>=1">
              <li
                v-for="(val,index) in cities2"
                :class="{'bg':val.wenid}"
                @click="qie(index,val.topicId,val.title,val.participateCount)"
              >
                <div class="shang" style="position: relative;">
                  <span class="time">{{val.publishTimeStr}}</span>
                  <span class="name" style="margin-left:5%">
                    <a
                      @click.stop
                      target="_blank"
                      :href="val.sourceUrl"
                      class="aa"
                    >{{val.websiteName}}</a>
                  </span>
                  <span class="da" title="网评大师" style="margin-left:5%" @click.stop></span>
                  <span class="reng" title="网评指令" style="margin-left:5%" @click.stop></span>
                  <span
                    class="shou"
                    :class="{'cang':val.isStore}"
                    @click.stop="shoucang1(index)"
                    style="margin-left:5%;cursor: pointer;"
                  ></span>
                  <span
                    class="can"
                    style="position: absolute;right:2px;"
                  >参与人数{{numType(val.participateCount)}}</span>
                </div>

                <div class="zhong flex" style="font-size:16px">
                  <div @click.stop="stt()">
                    <el-checkbox-group
                      v-model="checkedCities2"
                      @change="handleCheckedCitiesChange2"
                    >
                      <el-checkbox :label="val.flag" :key="val.flag" class="boox">{{kt}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div style="word-break:break-all;max-width:90%">{{val.title}}</div>
                </div>
              </li>
            </ul>

            <div class="olad" v-show="load" @click="loand()">
              {{zai}}
              <span class="xiah"></span>
            </div>
            <div class="jiazai" v-show="!load">
              <img src="../assets/img/onld.gif" alt width="30px" height="30px" />
              <div>加载中</div>
            </div>
          </div>
          <div class="jiazai" v-show="!shuaxin">
            <img src="../assets/img/onld.gif" alt width="30px" height="30px" />
            <div>加载中</div>
          </div>
        </div>
      </div>
      <div class="onLeft" id="scroll2" @scroll="onScroll2()">
        <div id="lei2">
          <div class="top">
            <span></span>跟评列表
          </div>
          <div class="lie">
            <div class="left">跟评关键字:</div>
            <div class="right">
              <el-input v-model="input2" placeholder="请输入关键字" clearable></el-input>
            </div>
          </div>
          <div class="lie">
            <div class="left">昵称:</div>
            <div class="right">
              <el-input v-model="input3" placeholder="请输入昵称" clearable></el-input>
            </div>
          </div>
          <div class="lie">
            <div class="left">排序</div>
            <div class="right">
              <el-select v-model="value3" style="width:120px;margin-right:20px">
                <el-option
                  v-for="item in options3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="lei">类型:</span>
              <el-select v-model="value4" style="width:120px;margin-left:5px;">
                <el-option
                  v-for="item in options4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="lie">
            <div style="padding-left:130px;">
              <el-radio v-model="radio" label="1">仅结果中查找</el-radio>
              <el-radio v-model="radio" label="2">全部跟评</el-radio>
            </div>
          </div>
          <div class="pai flex">
            <div class="sou rba">
              <div class="iptsou" @click="genSou()">搜索</div>
            </div>
            <div class="sou rba">
              <div class="iptsou dao" @click="daochu()">导出</div>
            </div>
            <div class="sou rba">
              <div
                class="iptsou kong"
                @click="wenzhang2=[],genNum=0,tiaoSum=0,leftId2='',qing2(),iptNull()"
              >清空</div>
            </div>
          </div>
          <div class="onTit">
            <div class="zuoleft">
              <el-checkbox v-model="checked2" class="boox"></el-checkbox>全部跟评
              <span class="lan">{{genNum}}</span>个，参与合计
              <span class="lan">{{tiaoSum}}</span>条
            </div>
          </div>
          <div class="leiCon" v-show="shuaxin2">
            <div class="tou" style="padding:24px 0px;" v-if="wenzhang2.length>=1">
              <!-- <span>ID:{{topic}}  </span> -->
              <span style="margin-left:4px">{{tit}}</span>
            </div>
            <ul v-if="wenzhang2.length>=1">
              <li v-for="(val,index) in wenzhang2" style="padding-top:14px">
                <div class="toop">
                  <div class="zuotop">
                    <span class="lan" style="color:blue">{{val.nickName}}</span>
                    <span style="margin-left:20px;">{{val.publishTimeStr}}</span>
                  </div>
                  <div class="routop shang" style="margin-top:-18px;">
                    <span class="zan"></span>
                    <span class="num">{{val.praiseCount}}</span>
                    <span
                      class="shou"
                      :class="{'cang': val.isStore}"
                      @click.stop="shoucang2(index)"
                      style="cursor: pointer;"
                    ></span>
                    <span
                      class="tui"
                      :class="{'rit':val.tui}"
                      @click="tuiXiang(val.id,index)"
                      style="cursor: pointer;"
                    ></span>
                  </div>
                </div>
                <div class="zhong">
                  <span class="zhCon an" style="word-wrap:break-all;">{{val.content}}</span>
                </div>
              </li>
            </ul>
            <div class="olad" v-show="load2" @click="loand2()">
              {{zai2}}
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
        <span></span>跟评详情
      </div>
      <div class="rba" style="width:124px">
        <div class="copy" @click="copyUrl2()">复制到粘贴板</div>
      </div>
      <div class="rba" style="width:100px">
        <div class="kong" @click="cities=[],qing2()">清空</div>
      </div>
      <div class="quanAll">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          class="boox"
        >全选</el-checkbox>
      </div>
      <el-checkbox-group
        v-model="checkedCities"
        @change="handleCheckedCitiesChange"
        v-if="cities.length>=1"
      >
        <div class="tie" v-for="(val,index) in cities">
          <div class="title">
            {{index+1}}.{{val.publishTimeStr}}
            <span>{{val.websiteName}}</span>
          </div>
          <div class="zhong flex">
            <div class="tieLeft">
              <el-checkbox :label="val" :key="val.id">{{kong}}</el-checkbox>
            </div>
            <div class="tieRight" style="word-wrap:break-all;max-width:92%">
              <span style="color:black">网友：@{{val.nickName}}</span>
              发布"{{val.content}}"
            </div>
          </div>
          <div class="rm">
            <span @click="cities.splice(index,1),qinRm(val.inx)" style="cursor: pointer;">删除</span>
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
import { stringify } from "querystring";
import { type } from "os";
import { isArray } from "util";
import { close, closeSync } from "fs";
export default {
  name: "Index",
  components: {},
  data() {
    return {
      //日期只能选今天之前(包括今天)
      pickerOptions0: {
        disabledDate(time) {
          let _now = Date.now(),
            seven = 7 * 24 * 60 * 60 * 1000,
            sevenDays = _now - seven;
          return time.getTime() > _now || time.getTime() < sevenDays; //大于当前的禁止，小于7天前的禁止
        }
      },
      redArr: [],
      record: 0,
      topic: "",
      tit: "",
      iptFlag: true,
      kong: "",
      zai2: "查看更多跟评",
      zai: "载入更早新闻",
      tuiID: 0,
      //新闻列表id
      lieID: "",
      //请求数量
      PageSize: 10,
      //页码
      PageIndex: 1,
      //输入的网站名称
      iptTitle: "",
      //左侧id
      leftId: [],
      //时间选择
      disabled: false,
      //24h选择的日期
      flagTime: "",
      timeR: [
        { time: "24h", bg: false },
        { time: "48h", bg: false },
        { time: "72h", bg: false }
      ],
      xuanPick: true,
      //可添加新闻网站
      crr: [],
      kong: "",
      hua1: 0,
      hua2: 0,
      //新闻收藏
      stFlag: false,
      //弹出框选择
      flag: false,
      len1: 0,
      len2: 0,
      //网站类型：
      boxVal1: "",
      //网站名称：
      boxVal2: "",
      kt: "",
      //定时器
      timr: "",
      //默认高度
      i: 0,
      p: 0,
      t: 0,
      i2: 0,
      p2: 0,
      t2: 0,
      checkAll: false,
      checkedCities: [],
      cities: [],
      isIndeterminate: false,

      //文章
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
      wenzhang: [
        { checked: false, shou: false },
        { checked: false, shou: false },
        { checked: false, shou: false }
      ],
      wenzhang2: [],
      checked1: true,
      checked2: true,
      tabPosition: "24h",
      //新闻标题:
      input: "",
      //跟评关键字:
      input2: "",
      //昵称
      input3: "",
      //下拉选择
      //一
      options: [
        {
          value: 3,
          label: "时间降序"
        },
        {
          value: 1,
          label: "评论数量"
        }
      ],
      value: 3,
      //二
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
      //三
      value3: 3,
      options3: [
        {
          value: 3,
          label: "时间降序"
        },
        {
          value: 1,
          label: "点赞数量"
        }
      ],
      //新闻列表
      valXin: 1,
      optionX: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "已收藏"
        }
      ],
      //四
      options4: [
        {
          value: 1,
          label: "全部"
        },
        {
          value: 2,
          label: "已收藏"
        }
      ],
      value4: 1,
      value6: "",
      //日期
      value7: [],
      xian: false,
      brr: [],
      tt: "ks",
      PageIndex2: 1,
      PageSize2: 10,
      //跟评列表 id;
      genID: "12232321234",
      //跟评列表 标题;
      genTitle: "高薪二路发生火灾",
      leftId2: "",
      //条数
      tiaoSum: 0,
      //跟评数
      genNum: 0,
      dis2: false,
      tiao: 0,
      sTop1: 0,
      pageLoad: true
    };
  },
  methods: {
    //清空1
    iptNull() {
      this.cities2.forEach(x => {
        x.wenid = false;
      });
    },
    //清空2
    qing2() {
      this.wenzhang2.forEach(x => {
        x.tui = false;
      });
      this.checkAll = false;
      this.checkedCities = [];
    },
    qinRm(inx) {
      this.wenzhang2.forEach(x => {
        if (inx == x.id) {
          x.tui = false;
        }
      });
      this.checkedCities.forEach((x, i) => {
        if (inx == x.id) {
          this.checkedCities.splice(i, 1);
        }
      });
    },
    //阻止冒泡
    stt() {
      return false;
    },
    //收藏1
    shoucang1(index) {
      this.cities2[index].isStore = !this.cities2[index].isStore;
      var id = this.cities2[index].id;
      this.$axios
        .post(url + "Api/topic/TopicStore", {
          TopicId: id,
          CustomerId: 1
        })
        .then(
          res => {
            if (res.data.isOperationSuccess) {
              if (this.cities2[index].isStore) {
                this.$message({
                  type: "success",
                  message: "收藏成功",
                  duration: 500
                });
              } else {
                this.$message({
                  type: "info",
                  message: "取消收藏",
                  duration: 500
                });
              }
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
    //收藏2
    shoucang2(index) {
      this.wenzhang2[index].isStore = !this.wenzhang2[index].isStore;
      var id = this.wenzhang2[index].id;
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
              if (this.wenzhang2[index].isStore) {
                this.$message({
                  type: "success",
                  message: "收藏成功",
                  duration: 500
                });
              } else {
                this.$message({
                  type: "info",
                  message: "取消收藏",
                  duration: 500
                });
              }
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
    //导出
    daochu() {
      if (this.leftId2 == "") {
        this.$message({
          type: "info",
          message: "请选择新闻列表"
        });
        return false;
      }
      var _this = this;
      var dat, time, month, date;
      if (
        (this.input2.trim() != "" && this.input3.trim() != "") ||
        this.leftId2.length != ""
      ) {
        _this.value3 = _this.value3 == "时间降序" ? 3 : _this.value3;
        _this.value4 = _this.value4 == "全部" ? 1 : _this.value4;
        var bool;
        bool = _this.radio == "1" ? true : false;
        dat = {
          //条数
          PageSize: this.PageSize2,
          //页码
          PageIndex: this.PageIndex2,
          //网站id
          TopicId: this.leftId2,
          //跟评关键字
          KeyWord: this.input2,
          //昵称:
          NickName: this.input3,
          //排序
          TopicOrderBy: this.value3,
          //类型
          SearchType: this.value4,
          //全部跟评
          IsInResult: bool
        };
        const rLoading = this.openLoading();
        window.location.href = `${url}Api/TopicFollow/ExportTopicFollowForRealTime?PageSize=${_this.PageSize2}&PageIndex=${_this.PageIndex}&TopicId=${_this.leftId2}&KeyWord=${_this.input2}&NickName=${_this.input3}&TopicOrderBy=${_this.value3}&IsInResult=${bool}&SearchType=${_this.value4}&CustomerId=1`;
        this.$axios
          .get(
            `${url}Api/TopicFollow/ExportTopicFollowForRealTime?PageSize=${_this.PageSize2}&PageIndex=${_this.PageIndex}&TopicId=${_this.leftId2}&KeyWord=${_this.input2}&NickName=${_this.input3}&TopicOrderBy=${_this.value3}&IsInResult=${bool}&SearchType=${_this.value4}&CustomerId=1`
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
      }
    },
    //详情
    tuiXiang(sikid, index) {
      var _this = this;
      var len = this.wenzhang2.length;
      this.wenzhang2[index].tui = !this.wenzhang2[index].tui;
      if (this.wenzhang2[index].tui) {
        this.$axios
          .get(url + "/api/TopicFollow/GetTopicFollowDetail?followId=" + sikid)
          .then(
            res => {
              if (res.data.isOperationSuccess) {
                var obj = res.data.result;
                obj.flag = obj.id;
                obj.inx = sikid;
                _this.cities.push(obj);
                this.checkAll = false;
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
        var kt;
        _this.cities.forEach((x, i) => {
          if (sikid == x.inx) {
            kt = i;
          }
        });
        _this.cities.splice(kt, 1);
        return false;
      }
    },
    //新闻切换
    qie(index, id, title, tiao) {
      var len = this.cities2.length;
      this.tiao = tiao;
      this.topic = id;
      this.tit = title;
      for (let i = 0; i < len; i++) {
        if (i == index) {
          continue;
        }
        this.cities2[i].wenid = false;
      }
      this.cities2[index].wenid = !this.cities2[index].wenid;
      if (!this.cities2[index].wenid) {
        this.wenzhang2 = [];
        this.genID = "";
        this.genTitle = "";
        this.leftId2 = "";
        this.genNum = 0;
        this.tiaoSum = 0;
      } else {
        this.leftId2 = this.cities2[index].id;
        this.wenzhang2 = [];
        this.genNum = 0;
        this.tiaoSum = 0;
        this.PageIndex2 = 1;
        this.genLoad();
      }
    },
    genLoad() {
      if (this.leftId2 == "") {
        this.$message({
          type: "info",
          message: "请选择新闻列表"
        });
        return false;
      }
      var _this = this;
      this.load2 = false;
      var dat, time, month, date;
      _this.value3 = _this.value3 == "点赞数量" ? 1 : _this.value3;
      _this.value4 = _this.value4 == "全部" ? 1 : _this.value4;
      var bool;
      bool = _this.radio == "1" ? true : false;
      dat = {
        //条数
        PageSize: this.PageSize2,
        //页码
        PageIndex: this.PageIndex2,
        //网站id
        TopicId: this.leftId2,
        //跟评关键字
        KeyWord: this.input2.trim(),
        //昵称:
        NickName: this.input3.trim(),
        //排序
        TopicOrderBy: this.value3,
        //类型
        SearchType: this.value4,
        //全部跟评
        IsInResult: bool,
        CustomerId: 1
      };
      this.$axios
        .post(url + "api/TopicFollow/GetFollowList", dat)
        .then(
          res => {
            if (res.data.isOperationSuccess) {
              var arr = res.data.result.topicFollowList;
              if (arr.length == 0) {
                this.hua2 = "98k";
                this.load2 = true;
                this.zai2 = "没有更多内容";
                this.pageLoad = false;
                this.genNum = 0;
                this.tiaoSum = 0;
                return false;
              }
              arr.forEach((x, i) => {
                x.checked = false;
                x.flag = i;
                x.tui = false;
              });
              arr.forEach((x, i) => {
                _this.cities.forEach((k, t) => {
                  if (x.id == k.inx) {
                    x.tui = true;
                  }
                });
              });
              arr.forEach(x => {
                _this.wenzhang2.push(x);
              });
              this.genNum = res.data.result.totalItemCount;
              this.tiaoSum = this.tiao;
              this.genID = res.data.result.topicId;
              this.genTitle = res.data.result.topicTitle;
              this.load2 = true;
              this.zai2 = "查看更多跟评";
              this.PageIndex2++;
              this.hua2 = 0;
              this.topicId = "";
              this.title = "";
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
    genSou() {
      this.PageIndex2 = 1;
      this.wenzhang2 = [];
      this.genLoad();
    },
    //新闻列表加载
    iptLoad() {
      this.iptFlag = false;
      this.record = 0;
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
      if (this.leftId.length != 0) {
        this.load = false;
        _this.value = _this.value == "时间降序" ? 3 : _this.value;
        _this.valXin = _this.valXin == "全部" ? 1 : _this.valXin;
        dat = {
          //条数
          PageSize: this.PageSize,
          //页码
          PageIndex: this.PageIndex,
          //网站id
          WebsiteIds: this.leftId,
          //标题
          Title: this.input.trim(),
          //开始时间
          BeginTime: beginDate,
          //结束时间
          EndTime: endDate,
          //24小时制度
          FixedTime: this.flagTime,
          //排序
          TopicOrderBy: _this.value,
          //类型
          SearchType: _this.valXin,
          //id
          CustomerId: 1
        };
        this.$axios
          .post(url + "Api/Topic/GetTopicList", dat)
          .then(
            res => {
              this.iptFlag = true;
              if (res.data.isOperationSuccess) {
                window.sessionStorage.setItem("monIpt", JSON.stringify(dat));
                var arr = res.data.result.topicList;
                if (arr.length == 0) {
                  this.hua1 = "98k";
                  this.load = true;
                  this.zai = "没有更多内容";
                  return false;
                }
                arr.forEach((x, i) => {
                  x.wenid = false;
                  x.flag = x.id;
                });
                arr.forEach(x => {
                  _this.cities2.push(x);
                });
                if (this.pageLoad) {
                  this.cities2[0].wenid = true;
                  this.leftId2 = this.cities2[0].id;
                  this.tit = this.cities2[0].title;
                  this.tiao = this.cities2[0].participateCount;
                  this.genLoad();
                }
                this.hua1 = 0;
                this.load = true;
                this.zai = "载入更早新闻";
                _this.hua1 = 0;
                this.PageIndex++;
                this.iptFlag = true;
                this.record = res.data.result.recordCount;
              }
            },
            err => {
              console.log(err);
              this.iptFlag = true;
            }
          )
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$message({
          type: "info",
          message: "请选择网站平台"
        });
        this.iptFlag = true;
      }
    },
    //搜索新闻列表
    iptSou() {
      this.PageIndex = 1;
      this.cities2.length = 0;
      if (this.iptFlag) {
        this.iptLoad();
      }
    },
    //网站搜索
    titSetch() {
      var iptTitle = this.iptTitle;
      if (iptTitle.trim() != "") {
        this.$axios
          .get(url + `Api/Website/GetWebsiteListByName?name=${iptTitle}`)
          .then(res => {
            if (res.data.isOperationSuccess) {
              this.xuanZe(res.data.result.websiteModelList);
              this.iptTitle = "";
            }
          });
      }
    },
    xuanZe(dat) {
      var arr = dat;
      var crr = [];
      arr.forEach((m, o) => {
        this.brr.forEach((x, k) => {
          x.name.forEach((j, i) => {
            if (m.id) {
              if (j.id == m.id) {
                this.brr[k].name[i].t2 = true;
                crr.push(k);
                // console.log(k + "..." + i);
              }
            } else {
              if (j.id == m) {
                this.brr[k].name[i].t2 = true;
                crr.push(k);
                //console.log(k + "..." + i);
              }
            }
          });
        });
      });
      var brr = [...new Set(crr)];
      brr.forEach(x => {
        this.brr[x].t2 = true;
        this.xian = true;
        for (let i = 0; i < this.brr[x].name.length; i++) {
          if (!this.brr[x].name[i].t2) {
            this.brr[x].t2 = false;
          }
        }
        for (let i = 0; i < this.brr.length; i++) {
          if (!this.brr[i].t2) {
            this.xian = false;
          }
        }
      });
      this.getID();
    },
    dateNull() {
      this.value7 = [];
      this.disabled = false;
    },
    dateBur() {
      if (this.value7.length < 1) {
        this.disabled = false;
        this.timeR = [
          { time: "24h", bg: false },
          { time: "48h", bg: false },
          { time: "72h", bg: false }
        ];
      } else {
        this.disabled = true;
      }
    },
    //24H切换
    timeQie(index) {
      if (this.timeR[index].bg) {
        this.timeR[index].bg = false;
        this.flagTime = "";
        this.dis2 = false;
      } else {
        this.timeR = [
          { time: "24h", bg: false },
          { time: "48h", bg: false },
          { time: "72h", bg: false }
        ];
        this.timeR[index].bg = true;
        this.flagTime = this.timeR[index].time.substr(0, 2);
        this.value7 = [];
        this.dis2 = true;
      }
    },
    //复制到粘贴板
    copyUrl2() {
      var str = "";
      var cities = this.checkedCities;
      if (cities.length < 1) {
        this.$message({
          type: "info",
          message: "请选择复制的内容",
          duration: 800
        });
        return false;
      }
      var brr = [];
      cities.forEach(x => {
        brr.push(
          "　　" +
            x.publishTimeStr +
            "，" +
            x.websiteName +
            "网友@" +
            x.nickName +
            "发布:" +
            "   " +
            '"' +
            x.content +
            '"' +
            " ;"
        );
      });
      str = brr.join("\n\n");
      var Url2 = document.getElementById("biao1");
      Url2.innerHTML = str;
      Url2.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      this.$message({
        type: "success",
        message: "已复制好可粘贴"
      });
    },
    //获取已添加网站平台
    WebsitePlatform() {
      this.$axios
        .get(url + "api/Website/GetCustomerWebsiteList?customerid=1")
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
            var arr = res.data.result;
            arr.forEach(x => {
              if (x.websiteModelList.length >= 1) {
                x.websiteModelList.forEach(i => {
                  i.t1 = i.name;
                  i.t2 = false;
                });
              }
            });
            this.brr = arr.map(function(item) {
              return {
                boss: item.typeName,
                t2: false,
                zhan: true,
                name: item.websiteModelList
              };
            });
            //移除天天快报
            // this.brr.forEach((x, i) => {
            //   if (x.boss == "自媒体平台") {
            //     x.name.forEach((k, t) => {
            //       if (k.name == "天天快报") {
            //         this.brr[i].name.splice(t, 1);
            //       }
            //     });
            //   }
            // });
            //
            this.all();
            this.loand();
          }
        });
    },
    //获取可添加网站
    addcom() {
      this.flag = !this.flag;
      this.$axios
        .get(url + "api/Website/GetUnAddedWebsiteList?customerid=1")
        .then(res => {
          if (res.data.isOperationSuccess) {
            var arr = res.data.result;
            arr.forEach(x => {
              if (x.websiteModelList.length >= 1) {
                x.websiteModelList.forEach(i => {
                  i.t1 = i.name;
                  i.t2 = false;
                });
              }
            });
            this.crr = arr.map(function(item) {
              return {
                boss: item.typeName,
                t2: false,
                zhan: true,
                name: item.websiteModelList
              };
            });
            this.boxVal1 = this.crr[0].boss;
            this.boxVal2 = this.crr[0].name[0].t1;
          }
        })
        .catch(function(error) {
          //  console.log(error);
        });
    },
    //添加网站网站选择
    box1() {
      let val = this.boxVal1;
      var i = this.crr.length;
      while (i--) {
        if (this.crr[i].boss === val) {
          this.len1 = i;
        }
      }
      if (this.crr[this.len1].name.length > 0) {
        this.boxVal2 = this.crr[this.len1].name[0].t1;
      } else {
        this.boxVal2 = "";
      }
    },
    //添加网站
    yes() {
      var str = this.boxVal2;
      if (str == "") {
        this.$message({
          type: "info",
          message: "请选择网站",
          duration: 500
        });
        return false;
      }
      var len = this.len1;
      var biao;
      this.crr[len].name.forEach((x, i) => {
        if (str == x.name) {
          biao = i;
        }
      });
      var id = this.crr[len].name[biao].id;
      this.$axios
        .post(url + "api/Website/AddCustomerWebsite", {
          CustomerId: 1,
          WebSiteId: id
        })
        .then(
          res => {
            if (res.data.isOperationSuccess) {
              this.WebsitePlatform();
              this.$message({
                type: "success",
                message: "添加成功"
              });
              this.flag = false;
              this.xian = false;
              this.xuanZe(this.leftId);
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
    no() {
      this.flag = false;
      this.$message({
        type: "info",
        message: "已取消",
        duration: 500
      });
    },
    handleCheckAllChange(val) {
      var arr = [];
      this.cities.forEach(x => {
        arr.push(x);
      });
      this.checkedCities = val ? arr : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
      console.log(this.checkedCities);
    },
    handleCheckAllChange2(val) {
      var arr = [];
      this.cities2.forEach(x => {
        arr.push(x.flag);
      });
      this.checkedCities2 = val ? arr : [];

      this.isIndeterminate2 = false;
    },
    handleCheckedCitiesChange2(value) {
      let checkedCount2 = value.length;
      this.checkAll2 = checkedCount2 === this.cities2.length;
      this.isIndeterminate2 =
        checkedCount2 > 0 && checkedCount2 < this.cities2.length;
    },
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
    },
    loand() {
      var _this = this;
      this.hua1++;
      if (this.hua1 == 1) {
        let len = this.cities2.length;
        this.load = false;
        var _this = this;
        setTimeout(() => {
          _this.load = true;
          if (_this.load) {
            _this.iptLoad();
          }
        }, 200);
      }
    },
    onScroll1() {
      var _this = this;
      _this.cabll(_this.scrll(), 100);
      this.sTop1 = document.querySelector("#scroll1").scrollTop;
    },
    scrll() {
      var _this = this;
      _this.p = document.querySelector("#scroll1").scrollTop;
      var scrollTop = document.querySelector("#scroll1").scrollTop,
        scrollHeight = document.querySelector("#lei").clientHeight,
        clientHeight = document.querySelector("#scroll1").clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.hua1++;
        if (this.hua1 == 1) {
          let len = this.cities2.length;
          this.load = false;
          var _this = this;
          setTimeout(() => {
            _this.load = true;
            if (_this.load) {
              _this.iptLoad();
            }
          }, 200);
        }
      } else if (scrollTop <= 0) {
        return false;
      }
    },
    uped() {
      this.shuaxin = false;
      var _this = this;
      _this.cities2 = [];
      setTimeout(() => {
        _this.shuaxin = true;
        _this.iptSou();
      }, 200);
    },
    loand2() {
      var _this = this;
      this.hua2++;
      if (this.hua2 == 1) {
        var _this = this;
        setTimeout(() => {
          _this.load = true;
          if (_this.load) {
            _this.genLoad();
          }
        }, 200);
      }
    },
    scrll2() {
      var _this = this;
      _this.p = document.querySelector("#scroll2").scrollTop;
      var scrollTop = document.querySelector("#scroll2").scrollTop,
        scrollHeight = document.querySelector("#lei2").clientHeight,
        clientHeight = document.querySelector("#scroll2").clientHeight;
      if (scrollTop + clientHeight >= scrollHeight) {
        this.hua2++;
        if (this.hua2 == 1) {
          this.load2 = false;
          var _this = this;
          setTimeout(() => {
            _this.load = true;
            if (_this.load) {
              _this.genLoad();
            }
          }, 200);
        } else if (scrollTop <= 0) {
          return false;
        }
      }
    },
    onScroll2() {
      var _this = this;
      _this.cabll(_this.scrll2(), 100);
    },
    zhan(index) {
      this.brr[index].zhan = !this.brr[index].zhan;
      var zhuan = document.querySelectorAll(".gao .zhuan");
      if (this.brr[index].zhan) {
        zhuan[index].style.transform = "rotate(0deg)";
      } else {
        zhuan[index].style.transform = "rotate(-90deg)";
      }
    },
    //获取添加的id
    getID() {
      var arr = [];
      this.brr.forEach(x => {
        x.name.forEach(i => {
          if (i.t2) {
            arr.push(i.id);
          }
        });
      });
      this.leftId = arr;
    },
    //全选网站
    all() {
      var len = this.brr.length;
      this.xian = !this.xian;
      if (this.xian) {
        for (var i = 0; i < len; i++) {
          this.brr[i].t2 = true;
          var k = this.brr[i].name.length;
          for (var j = 0; j < k; j++) {
            this.brr[i].name[j].t2 = true;
          }
        }
      } else {
        for (var i = 0; i < len; i++) {
          this.brr[i].t2 = false;
          var k = this.brr[i].name.length;
          for (var j = 0; j < k; j++) {
            this.brr[i].name[j].t2 = false;
          }
        }
      }
      this.getID();
    },
    //新闻网站类型
    zhuan(index) {
      var len = this.brr[index].name.length;
      this.brr[index].t2 = !this.brr[index].t2;
      this.xian = true;
      if (this.brr[index].t2) {
        for (var i = 0; i < len; i++) {
          this.brr[index].name[i].t2 = true;
        }
      } else {
        for (var i = 0; i < len; i++) {
          this.brr[index].name[i].t2 = false;
        }
      }
      for (let i = 0; i < this.brr.length; i++) {
        if (!this.brr[i].t2) {
          this.xian = false;
        }
      }
      this.getID();
    },
    //新闻网站
    xuan(index, kb) {
      var arr = [];
      this.brr[index].name[kb].t2 = !this.brr[index].name[kb].t2;
      this.brr[index].t2 = true;
      this.xian = true;
      for (let i = 0; i < this.brr[index].name.length; i++) {
        if (!this.brr[index].name[i].t2) {
          this.brr[index].t2 = false;
        } else {
          arr.push(this.brr[index].name[i].id);
        }
      }
      for (let i = 0; i < this.brr.length; i++) {
        if (!this.brr[i].t2) {
          this.xian = false;
        }
      }
      this.getID();
    }
  },
  computed: {},
  mounted() {},
  created() {
    this.WebsitePlatform();
    document.querySelector("body").style.overflow = "hidden";
  },
  updated() {}
};
</script>

<style scoped="scoped" lang="less">
.disabled {
  pointer-events: none;
}
.xx {
  cursor: pointer;
  color: gainsboro;
}
.xx:hover {
  color: black;
}
.jincur {
  cursor: no-drop;
  opacity: 0.6;
}
#biao1 {
  width: 1px;
  height: 1px;
  opacity: 0;
}
.right .start {
  width: 30px;
  cursor: pointer;
  height: 24px;
  background: url(../assets/img/star.png) no-repeat center center;
  background-size: 100% 100%;
  margin-left: 16px;
}
.right .start.bg {
  background: url(../assets/img/starbg.png) no-repeat center center;
  background-size: 100% 100%;
}
#bg {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100%;
  background: black;
  /*定义透明度   0 - 1 */
  opacity: 0.5;
  z-index: 992;
}

#box {
  width: 480px;
  height: 277px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.16);
  position: fixed;
  top: 180px;
  left: 433px;
  z-index: 999;
  .top {
    height: 56px;
    line-height: 56px;
    padding-left: 24px;
    width: 480px;
    border-bottom: 1px solid rgba(213, 215, 221, 1);
    font-size: 16px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(48, 49, 50, 1);
    .box;
  }
  .btm {
    .btmLie {
      justify-content: center;
      align-items: center;
      margin-top: 20px;
    }
    .left {
      width: 70px;
      height: 20px;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
      color: rgba(96, 98, 102, 1);
    }
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
  font-weight: 500;
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
#index {
  height: calc(100% -114px);
  background: rgba(255, 255, 255, 1);
  .inLeft {
    width: 408px;
    height: 88vh;
    min-width: 260px;
    background: #fff;
    overflow-y: scroll;
    z-index: 66;
    padding: 29px 24px;
    padding-right: 0;
    border-right: 2px solid #d5d7dd;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    .box;
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
      font-weight: 500;
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
      margin-top: 24px;
      .box;
      background: url(../assets/img/copy.png) no-repeat 6px center;
    }
    .kong {
      width: 100px;
      height: 36px;
      margin-top: 24px;
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
      padding-left: 8px;
      border-bottom: 1px solid rgba(213, 215, 221, 1);
      .title {
        font-size: 12px;
        font-family: PingFangTC-Regular;
        font-weight: 400;
        color: rgba(145, 147, 152, 1);
        span {
          float: right;
        }
      }
      .zhong {
        margin-top: 16px;
        .tieRight {
          font-size: 14px;
          font-family: PingFangTC-Regular;
          font-weight: 400;
          span {
            color: rgba(70, 128, 255, 1);
          }
        }
      }
      .rm {
        margin-top: 8px;
        font-size: 12px;
        font-family: PingFangTC-Regular;
        font-weight: 400;
        color: rgba(252, 96, 128, 1);
        padding-left: 24px;
      }
    }
    .sou {
      .flex;
      align-items: center;
      font-size: 14px;
      font-family: PingFang-SC-Medium;
      font-weight: 500;
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
  .inLeft :hover::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
}
section {
  width: 100%;
  min-width: 864px;
  height: calc(100% -114px);
  .box;
  background: white;
  .flex;
  position: relative;
  .btnLeft {
    z-index: 888;
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
    z-index: 888;
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
      li.bg {
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
              background: url(../assets/img/star.png) no-repeat;
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
              transform: translateY(-3px);
            }
          }
        }
        .hui {
          height: 40px;
          line-height: 40px;
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
  #lei {
    padding: 0 24px;
  }
  #lei2 {
    padding: 0 24px;
  }
  .onLeft {
    background: white;
    width: 50%;
    height: 88vh;
    overflow-y: scroll;
    position: relative;
    .box;
    border-right: 2px solid rgba(213, 215, 221, 1);
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
      margin: auto;
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
        font-weight: 500;
        color: rgba(96, 98, 102, 1);
        text-align: right;
        margin-right: 2%;
        white-space: nowrap;
      }
      .right {
        .flex;
        align-items: center;
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
    .tme {
      width: 156px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid rgba(213, 215, 221, 1);
      .flex;
      justify-content: center;
      .rTime {
        width: 52px;
        height: 30px;
        line-height: 30px;
        .cen;
        font-size: 14px;
        font-family: PingFangTC-Regular;
        font-weight: 400;
        color: rgba(48, 49, 50, 1);
        overflow: hidden;
        cursor: pointer;
      }
      .rTime:nth-child(2) {
        border-left: 1px solid rgba(213, 215, 221, 1);
        border-right: 1px solid rgba(213, 215, 221, 1);
      }
      .bg {
        background: rgba(70, 128, 255, 1);
        color: white;
      }
      .rTime:nth-child(1) {
        border-radius: 4px 0px 0px 4px;
      }
      .rTime:nth-child(3) {
        border-radius: 0px 4px 4px 0px;
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
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
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
      margin-left: 0px;
    }
  }
  .zuo {
    margin-right: 6px;
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
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(48, 49, 50, 1);
  }
  .gao1 {
    padding-left: 60px;
  }
}
.fang {
  width: 12px;
  height: 12px;
  border: 1px solid rgba(210, 211, 216, 1);
  border-radius: 2px;
}
</style>