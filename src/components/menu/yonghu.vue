<template>
  
  <div>
    <el-container>
      <!-- <el-header class="header"></el-header> -->

      <el-main>
         <el-table
    :data="data"
    style="width: 100%"
    :stripe="true"
    :border="true">
    <el-table-column
      label="nickname"
      width="180"
      align="center">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>nickname: {{ scope.row.nickname }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.nickname }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>

    <el-table-column
      label="account"
      width="180"
      align="center"
      >
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.account }}</span>
      </template>
    </el-table-column>


     <el-table-column
      label="permissions"
      width="180"
       align="center"
      >
      <template slot-scope="scope">
        <!-- <i class="el-icon-time"></i> -->
        <span style="margin-left: 10px">{{ scope.row.permissions }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作"
     align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">暂无</el-button>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
      </template>
    </el-table-column>
  </el-table>
      </el-main>

      <el-footer>
        
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.current"
      :page-sizes="[1,2,5]"
      :page-size="queryInfo.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages">
    </el-pagination>
      </el-footer>
    </el-container>



    
  </div>
</template>

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
  export default {
    data() {
      return {
        data:[],

        //footer
        //获取用户列表的参数对象
        queryInfo:{
          //查询参数
          query:"",
          //每页显示多少人
          Size:6,
          //当前页码数
          current:0,

        },
        //总数
        total:6,
        pages:0,
        userId:10,

      }
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      //main
      //拿管理员的数据
      getList(){
        this.$axios.get('api/usermanager/userlist/' + this.queryInfo.current,
        {
          params: this.queryInfo
        }).then(resp => {
              if(resp.status == 200){
                this.data = resp.data.data.records;
                this.total = resp.data.data.total;
                this.pages = resp.data.data.pages;
                console.log(resp);
              }else{
                this.$message.console.error("获取订单列表失败");
              }
            })
      },

      //footer
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
         //将监听接受到的每页显示多少条的数据 val 赋值给 size
        this.queryInfo.size = val
        //  修改完以后，重新发起请求获取一次数据
        this.getList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
         //  将监听接受到的页码值的数据 val 赋值给 current
        this.queryInfo.current = val
        this.getList()
      }

    },
    created(){
      this.getList();
    }
  }
</script>