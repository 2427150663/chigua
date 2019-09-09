<template>
  <div class="table">
    
     <div class="xian"></div>
          <div class="container">
            <div class="contw">
              <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                @selection-change="handleSelectionChange"
              >
                <el-table-column prop="title" label="任务标题"  width="489"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="140"></el-table-column>
                <el-table-column prop="count" label="数量" align=center></el-table-column>
                <el-table-column prop="state" label="状态" >
                  <template slot-scope="scope">
                    <span :class="{yfj: scope.row.state === 'Pause',zxz: scope.row.state === 'Running',zbks: scope.row.state=== 'Waitting',zc: scope.row.state=== 'Complate'}">{{transAutoTaskState(scope.row.state)}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                  <template slot-scope="scope">
                    <!-- <el-button type="text" v-if="scope.row.sate === 'Complate'" @click="handleSuspend(scope.$index, scope.row)">暂停</el-button>
                    <el-button type="text" v-if="scope.row.sate === 'Waitting'" @click="handleImplement(scope.$index,scope.row)">执行</el-button>
                    <el-button type="text" v-if="scope.row.sate === 'Waitting'" @click="handleImplement(scope.$index,scope.row)">执行</el-button> -->
                    <el-button          
                      type="text"
                      class="red"                     
                    ><router-link :to="{ path: '/Details',query:{id:scope.row.autoTaskId}}">详情</router-link></el-button>
                    
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagination">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="cur_page"
                  :page-sizes="[5,10]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
              </div>
            </div>
          </div>
  </div>
</template>

<script>
import home from './Home'
export default {
  name: "basetable",
  data() {
    return {
      total:0,
      pageSize:5,
      tableData: [

      ],
      cur_page: 1,
      multipleSelection: [],
    };
  },
  created() {
    this.getData();
  },
  computed: {
  },
  methods: {
    //枚举转换
    transAutoTaskState(val){
        if(val==="Waitting"){
          return "准备开始";
        }else if(val==="Running"){
          return "执行中";
        }else if(val==="Pause"){
          return "暂停中";
        }else if(val==="Complate"){
          return "已完成";
        }else if(val==="NotComplate"){
          return "未完成";
        }
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      //   this.getData();
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 获取 easy-mock 的模拟数据
    getData() {
        this.$axios.get(url +'/AutoTask/List',{
       params: { 
       CommandType: 1,
       State: 2,
       pageSize:this.pageSize
    }})
    .then(res=>{
      this.tableData = res.data.data.list
      console.log(res)
    })        
    },
    handleClick(tab, event) {
        console.log(tab, event);
      },
    handleEdit(index, row) {
      this.idx = index;
      const item = this.tableData[index];
      this.form = {
        name: item.name,
        date: item.date,
        address: item.address
      };
      this.editVisible = true;
    },
    handleDelete(index, row) {
      this.idx = index;
      this.delVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 暂停
    handleSuspend(index, row) {
      this.$axios.post(url +'AutoTask/Control',{
        CommandType:2,
        AutoTaskId:row.autoTaskId,
        ControlType:1
      }).then( res1=>{
        if(res1.code==1){
           this.$message({          
             message: '已暂停',
             type: 'success',
            center: true,
        })
        }
      }

      )
    this.getData();
    },
       // 执行
    handleImplement(index, row) {
       this.$axios.post(url +'AutoTask/Control',{
        CommandType:2,
        AutoTaskId:row.autoTaskId,
        ControlType:2,
        pageindex:this.cur_page,
       pagesize:this.pageSize
      }).then( res1=>{
        if(res1.code==1){
           this.$message({          
             message: '已执行',
             type: 'success',
            center: true,
        })
        }
      }

      )
    },
    // 确定删除
    deleteRow() {
      this.tableData.splice(this.idx, 1);
      this.$message.success("删除成功");
      this.delVisible = false;
    }
  }
};
</script>

<style scoped>

/* 发布任务详情 */
.xiangqing{
  padding-left: 24px;
}
.xiangqing h2{
  font-size: 20px;
  color: #303132;
  margin:24px 0;
}
.lianjie{
  font-size: 14px;
  color:#66B1FF;
  margin-bottom: 14px;
}
.plist{
  display: flex;
  margin-bottom: 24px;
}
.plist p{
  margin-right: 40px;
  color: #606266;
}
.btns {
  float: right;
  margin: 14px 24px 14px 0;
}
.lineq {
  margin-top: 18px;
  margin-bottom: 18px;
  color: #303133;
  font-size:16px;
  font-weight: bold;
  border-left:0;
}
h5 {
  font-weight: 500;
  color: #303431;
  display: inline;
  padding: 0 12px 0 24px;
}
.h64{
  line-height: 64px;
  padding-left: 24px;
}
.crumbs {
  background: #fff;
  box-sizing: border-box;
}
.el-breadcrumb {
  border-bottom: 1px solid rgba(213, 215, 221, 1);
}
.handle-box {
  margin-top: 24px;
  padding-bottom: 24px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #66b1ff;
}
.mr10 {
  margin-right: 10px;
}
.container {
  padding-left: 0px;
  padding-top: 0px;
}
.hong {
  color: "red";
}
.xian{
  height: 20px;
  background: rgba(243,246,247,1)
}
</style>
