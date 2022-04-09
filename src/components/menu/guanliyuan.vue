<template>
  <div>
    <el-container>

      <el-header class="header">
        <el-row :gutter="20">
                <el-col :span="8">
                    <el-input placeholder="请输入你要查找的id" v-model="id" clearable @clear="getList()">
                        <el-button slot="append" icon="el-icon-search" @click="findUser"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <!-- <el-button type="primary">添加用户</el-button> -->
                    <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
                </el-col>
            </el-row>
      </el-header>

      <el-main>
         <el-table
    :data="data" :stripe="true" :border="true"
    style="width: 100%"
    align="center"
    >
    
    <el-table-column
      label="id"
      prop="id"
      align="center"
      >

    </el-table-column>

    <el-table-column
      label="userName"
      prop="username"
      align="center"
      >
    </el-table-column>

     <el-table-column
      label="ip"
      prop="ip"
      align="center"
      >
    </el-table-column>

     <el-table-column
      label="role"
      prop="role"
      align="center"
      >
    </el-table-column>


     <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="showEditDialog(scope.row.id)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>


  </el-table>
      </el-main>


      <el-footer>
        <!-- <span class="demonstration">完整功能</span> -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.current"
      :page-sizes="[1, 2, 4]"
      :page-size="queryInfo.Size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages">
    </el-pagination>
      </el-footer>
    </el-container>


    <!-- <div>{{data.ip}}本书</div> -->


     <!-- 添加用户的对话框 -->
   <el-dialog title="添加管理员" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
     <!-- 内容主题区域 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="ip" prop="ip">
          <el-input v-model="addForm.ip"></el-input>
        </el-form-item>
    </el-form>

    <!-- 底部按钮区域 -->
    <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addUser">确定</el-button>
    </span>
   </el-dialog>


  <!-- 修改用户的对话框 -->
    <!-- editDialogVisible 值 为 true 显示对话框 / false 隐藏对话框 -->
    <!-- editDialogClosed 监听对话框 -->

<el-dialog
  title="修改用户"
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
    <el-form-item label="用户名" prop="username">
      <el-input v-model="editForm.username"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="editForm.password"></el-input>
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

// import {p} from '../../main.js'
export default {
  methods: {
    //header
    //监听 添加用户对话框的关闭事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
  //点击按钮 添加新用户
  addUser(){
    this.$refs.addFormRef.validate(async valid => {
      if(!valid) return
      //发起添加用户的网络请求
      this.$axios.post('api/manager/addManager',{
              username: this.addForm.username,
              password: this.addForm.password,
              ip: this.addForm.ip,
            },)
            .then(resp =>{
              if(resp.data.code == 200){
                console.log('add');
                console.log(resp);
                this.$message.success("添加成功")
              }
              else{
                this.$message.error(resp.data.data)
              }
            }
            )
      this.addDialogVisible = false,
      this.getList()


    })
  },


    //main
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

      //删除管理员
      handleDelete(id){
        

      //发起删除用户的网络请求
      this.$axios.get('api/manager/delete/'+id)
            .then(resp =>{
              if(resp.data.code == 200){
                console.log('delete');
                console.log(resp);
                this.$message.success("删除成功")
              }
              else{
                this.$message.error('删除失败')
              }
            }
            )
      this.getList();
      },

      // 监听修改用户对话框的关闭事件
      // editFormRef 修改用户表单 的 别名
      editDialogClosed() {
      this.$refs.editFormRef.resetFields()
},
      //展示编辑用户的对话框
      showEditDialog(id){
         //发起编辑用户的网络请求
      this.$axios.get('api/manager/search/' + id)
            .then(resp =>{
              if(resp.data.code == 200){
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
      this.$axios.post('api/manager/change',{
              id: this.editForm.id,
              username: this.editForm.username,
              password: this.editForm.password,
              
            },)
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



      //搜索管理员
      findUser(){
        this.$axios.get('api/manager/search/'+this.id)
            .then(resp =>{
              if(resp.data.code == 200){
                // this.data = resp.data.data;
                console.log('find');
                console.log(resp);
                this.$message.success("搜索成功");
                // var obj = resp.data.data;
                // console.log(obj);
                // this.data = Object.values(obj);
                // console.log(this.data);
              }
              else{
                this.$message.error("搜索失败");
              }
            }
            )
            // this.getList()
      },
     


      //拿管理员的数据
      getList(){
        this.$axios.get('api/manager/page/'+this.queryInfo.current,{
          params: this.queryInfo
        }).then(resp => {
              if(resp.status == 200){
                this.data = resp.data.records;
                this.total = resp.data.total;
                this.pages = resp.data.pages;
                console.log(resp);
              }else{
                this.$message.console.error("获取用户列表失败");
              }
            })
      },


      //footer
      //监听Size改变的事件
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        //将监听接受到的每页显示多少条的数据 val 赋值给 Size
        this.queryInfo.Size = val
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

    created() {
        this.getList();
        // this.findUser()
        
      },
    mounted() {
      this.AroundList = this.data;
    },


    data() {
      return {
        //header
        //搜索
        serarch:'',
        // 添加用户弹窗
        addDialogVisible:false,
        //添加用户的表单数据
        addForm:{
          username:'',
          password:'',
          ip:''
        },
        //添加用户表单的验证规则对象
        addFormRules:{
          username:[
            { required: true, message: '请输入用户名',trigger:'blur'},
            { min:3, max:10, message: '长度范围在3-10个字符',trigger: 'blur'}
          ],
          password:[
            { required: true, message: '请输入用户密码',trigger:'blur'},
            { min:1, max:15, message: '长度范围在1-15个字符',trigger: 'blur'}
          ],
          ip:[
            { required: true, message: '请输入用户ip',trigger:'blur'},
            { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ]
        },
        //修改用户所需数据
        //控制修改用户框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象
        editForm: {}, 
        // 修改表单的验证规则
      editFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3,max:10,message:'长度范围在3到10之间',trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3,max:32,message:'长度范围在3到32之间',trigger: 'blur' },
        ],
      },


        //搜索用户
        AroundList:[],
        time:null,//防抖



        //main
        //获取用户列表的参数对象
        queryInfo:{
          //查询参数
          query:"",
          //每页显示多少人
          Size:6,
          //当前页码数
          current:1,

        },

        search: '',
        //获取的用户列表
        data:[],
        
        //总数
        total:6,
        pages:0,
        id:'',

        //footer
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
      }
    }
}
</script>

<style lang="less">
    .header{
      background-color: #ffffff;
      color: black;
    }
</style>