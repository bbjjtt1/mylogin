<template>
  
  <div>
    <el-container>
      <el-header class="header">
           <el-row :gutter="20">
            <el-col :span="8">
                  <el-input placeholder="请输入你要查找的id" v-model="Id" clearable @clear="getList()">
                   <!-- <el-button slot="append" icon="el-icon-search" @click="findUser"></el-button> -->                  
                   </el-input>
              </el-col>
             <el-col :span="4">
                  <el-button type="primary" @click="findUser">查找订单</el-button>
            </el-col>
  </el-row>
      </el-header>

      <el-main>
         <el-table
    :data="data"
    style="width: 100%"
    :stripe="true" :border="true"
    align="center"
    >
    <el-table-column
      label="id"
      prop="id"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="user_id"
      prop="userId"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="goods_Count"
      prop="goodsCount"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="goods_id"
      prop="goodsId"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="price"
      prop="price"
      align="center"
      >
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100"
      align="center"
      >
      <template slot-scope="scope">
        <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button> -->
        <el-button @click="showEditDialog(scope.row.id)" type="text" size="small">编辑</el-button>
        <!-- <a href="#" @click.prevent="handleClick(scope.row)">详情</a> -->
      </template>
    </el-table-column>
  </el-table>
      </el-main>

      <el-footer>
        <span class="demonstration">显示总数</span>
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="queryInfo.current"
      :page-size="queryInfo.size"
      layout="total, prev, pager, next"
      :total="pages">
    </el-pagination>
      </el-footer>
    </el-container>
 

    <!-- 修改用户的对话框 -->
    <!-- editDialogVisible 值 为 true 显示对话框 / false 隐藏对话框 -->
    <!-- editDialogClosed 监听对话框 -->

<el-dialog
  title="修改订单"
  :visible.sync="editDialogVisible"
  width="50%"
  @close="editDialogClosed"
>
  <el-form
    ref="editFormRef"
    :model="editForm"
    :rules="editFormRules"
    label-width="70px"
  >
    <el-form-item label="商品名" prop="goodsId">
      <el-input v-model="editForm.goodsId"></el-input>
    </el-form-item>

    <el-form-item label="数量" prop="goodsCount">
      <el-input v-model="editForm.goodsCount"></el-input>
    </el-form-item>

    <el-form-item label="价格" prop="price">
      <el-input v-model="editForm.price"></el-input>
    </el-form-item>

  </el-form>
  <span slot="footer" class="dialog-footer">
    <!-- 点击 取消 或 确定 都 隐藏 对话框 -->
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">保 存</el-button>
  </span>
</el-dialog>




    
  </div>
</template>

<script>
export default {
  methods: {
    //main
      handleClick(row) {
        console.log(row);
        console.log(row.id);
        this.$router.push('/contain/dingdandetail/'+ row.id)
      },
      //拿管理员的数据
      //拿管理员的数据
      getList(){
        this.$axios.get('api/usermanager/orderPage/' + this.queryInfo.current,{
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
      
      //搜索订单
      findUser(){
        this.$axios.get('api/usermanager/search',
        {
          headers:{
            id:this.Id
          }
        })
            .then(resp =>{
              if(resp.data.code == 200){
                // this.data = resp.data.data;
                console.log('find');
                console.log(resp);
                this.$message.success("搜索成功");
                // console.log(resp.data.data);
              }
              else{
                this.$message.error("搜索失败");
              }
            }
            )
            this.getList()
      },
     

      // 监听修改用户对话框的关闭事件
      // editFormRef 修改用户表单 的 别名
      editDialogClosed() {
      this.$refs.editFormRef.resetFields()
},
      //展示编辑用户的对话框
      showEditDialog(editId){
         //发起编辑用户的网络请求
      this.$axios.get('api/usermanager/search',{
        headers:{
          id:editId
        }
      })
            .then(resp =>{
              if(resp.data.code == 200){
                this.id = editId;
                this.editForm = resp.data.data;
                this.editDialogVisible = true;
                console.log(resp.data.data);
              }
              else{
                this.$message.error('查询用户失败')
              }
            }
            )
      this.getList()
      },
      // 修改用户信息并提交
      editUserInfo(){
        this.$refs.editFormRef.validate(async valid => {
      if(!valid) return
      //发起修改用户的网络请求
      this.$axios.post('api/usermanager/orderChange',
            {
              goodsId: this.editForm.goodsId,
              goodsCount: this.editForm.goodsCount,
              price:this.editForm.price
            },
            {
                headers:{
                id:this.id
              }
              }
            
            )
            .then(resp =>{
              if(resp.data.code == 200){
                console.log('edit');
                console.log(resp);
                this.$message.success("修改成功");

              }
              else{
                this.$message.error('修改失败')
              }
            }
            )
      this.editDialogVisible = false,
      this.getList()


    })
      },



      //footer
      //footer
      //监听Size改变的事件
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        //将监听接受到的每页显示多少条的数据 val 赋值给 Size
        this.queryInfo.size = val
        //  修改完以后，重新发起请求获取一次数据
        this.getList()
      },
      // 监听  current 改变的事件
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //  将监听接受到的页码值的数据 val 赋值给 current
        this.queryInfo.current = val
        this.getList()
        // const token = localStorage.getItem("Authorization")
        // this.$axios.get('api/page/1'
        //     ).then(resp => {
        //       console.log(resp.data.records);
        //     })
      }
    },

    created(){
        this.getList();
      },

    data() {
      return {
        //main

         //获取用户列表的参数对象
        queryInfo:{
          //查询参数
          query:"",
          //每页显示多少人
          Size:6,
          //当前页码数
          current:0,

        },


        //修改用户所需数据
        //控制修改用户框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象
        editForm: {}, 
        // 修改表单的验证规则
      editFormRules: {
        goodsId: [
          { required: true, message: '请输入商品名', trigger: 'blur' },
         // { min: 3,max:10,message:'长度范围在3到10之间',trigger: 'blur' },
        ],
        goodsCount: [
          { required: true, message: '请输入商品数量', trigger: 'blur' },
         // { min: 3,max:32,message:'长度范围在3到32之间',trigger: 'blur' },
        ],
       
        price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' },
         // { min: 3,max:32,message:'长度范围在3到32之间',trigger: 'blur' },
        ],
      },


        // search: '',
        //获取的用户列表
        data:[],
        
        //总数
        total:6,
        pages:0,
        userId:'',
        id:'',
        Id:''
        //footer


      }
    }
}
</script>

<style>

</style>