<template>
  <div>
     <el-container>
      <el-header class="header">
         <el-row :gutter="20">
                <!-- <el-col :span="8">
                    <el-input placeholder="请输入你要查找的id" v-model="id" clearable @clear="getList()">
                        <el-button slot="append" icon="el-icon-search" @click="findUser"></el-button>
                    </el-input>
                </el-col> -->
                <el-col :span="8">
                    <!-- <el-button type="primary">添加用户</el-button> -->
                    <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
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
      label="goods_id"
      prop="goodsId"
      align="center"
      >
    </el-table-column>

    <el-table-column
      label="stockCount"
      prop="stockCount"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="seckillPrice"
      prop="seckillPrice"
      align="center"
      >
    </el-table-column>

    <el-table-column
      label="startDate"
      prop="startDate"
      align="center"
      >
    </el-table-column>
    <el-table-column
      label="endDate"
      prop="endDate"
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
        <el-button @click="handle(scope.row.id)" type="text" size="small">编辑</el-button>
        <a href="#" @click.prevent="handleClick(scope.row)" class="hre">详情</a>
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

     <!-- 添加用户的对话框 -->
   <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
     <!-- 内容主题区域 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <!-- <el-form-item label="商品号" prop="goodsId">
          <el-input v-model="addForm.goodsId"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="价格" prop="seckillPrice">
          <el-input v-model="addForm.seckillPrice"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="stockCount">
          <el-input v-model="addForm.stockCount"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" prop="goodsName">
          <el-input v-model="addForm.goodsName"></el-input>
        </el-form-item>

         <el-form-item label="标题" prop="goodsTitle">
          <el-input v-model="addForm.goodsTitle"></el-input>
        </el-form-item>

         <el-form-item label="详情" prop="goodsDetail">
          <el-input v-model="addForm.goodsDetail"></el-input>
        </el-form-item>

         <el-form-item label="价格" prop="goodsPrice">
          <el-input v-model="addForm.goodsPrice"></el-input>
        </el-form-item>

         <el-form-item label="库存" prop="goodsStock">
          <el-input v-model="addForm.goodsStock"></el-input>
        </el-form-item>

         <el-form-item label="年化利率" prop="aagr">
          <el-input v-model="addForm.aagr"></el-input>
        </el-form-item>

         <el-form-item label="最低期限" prop="term">
          <el-input v-model="addForm.term"></el-input>
        </el-form-item>

         <el-form-item label="类型" prop="goodsType">
          <el-input v-model="addForm.goodsType"></el-input>
        </el-form-item>


         <el-form-item label="开始时" prop="startDate">
          <el-input v-model="addForm.startDate"></el-input>
        </el-form-item>
         <el-form-item label="结束时" prop="endDate">
          <el-input v-model="addForm.endDate"></el-input>
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
  title="修改时间"
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
    <el-form-item label="开始时" prop="startDate">
      <el-input v-model="editForm.startDate"></el-input>
    </el-form-item>

    <el-form-item label="结束时" prop="endDate">
      <el-input v-model="editForm.endDate"></el-input>
    </el-form-item>

    <!-- <el-form-item label="数量" prop="stockCount">
      <el-input v-model="editForm.stockCount"></el-input>
    </el-form-item> -->
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
// import JSONbig from 'json-bigint'
export default {
    data(){
      return{
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

        id:0,

         //header
        // 添加用户弹窗
        addDialogVisible:false,
        //添加用户的表单数据
        addForm:{
          // goodsId:'',
          // seckillPrice:'',
          // stockCount:'',
          startDate:'',
          endDate:'',
          goodsName:'',
          goodsTitle:'',
          goodsDetail:'',
          goodsPrice:'',
          goodsStock:'',
          aagr:'',
          term:'',
          goodsType:''
        },
        //添加用户表单的验证规则对象
        addFormRules:{
          goodsId:[
            { required: true, message: '请输入商品名',trigger:'blur'},
            // { min:3, max:10, message: '长度范围在3-10个字符',trigger: 'blur'}
          ],
          seckillPrice:[
            { required: true, message: '请输入价格',trigger:'blur'},
            // { min:1, max:15, message: '长度范围在1-15个字符',trigger: 'blur'}
          ],
          stockCount:[
            { required: true, message: '请输入限定数量',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],
           startDate:[
            { required: true, message: '请输入开始时间',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],
           endDate:[
            { required: true, message: '请输入结束时间',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],
           goodsName:[
            { required: true, message: '请输入商品名称',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           goodsTitle:[
            { required: true, message: '请输入商品标题',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           goodsDetail:[
            { required: true, message: '请输入商品详情',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           goodsPrice:[
            { required: true, message: '请输入商品价格',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           goodsStock:[
            { required: true, message: '请输入商品库存',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           aagr:[
            { required: true, message: '请输入年利化率',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           term:[
            { required: true, message: '请输入最低期限',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ],

           goodsType:[
            { required: true, message: '请输入商品类型',trigger:'blur'},
            // { min:1, max:10, message: '长度范围在1-10个字符',trigger: 'blur'}
          ]

        },

        //修改用户所需数据
        //控制修改用户框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象
        editForm: {
          goodsId:'',
          seckillPrice:'',
          stockCount:'',
          startDate:'',
          endDate:'',
        }, 
        // 修改表单的验证规则
      editFormRules: {
        startDate: [
          { required: true, message: '请设置开始时间', trigger: 'blur' },
         // { min: 3,max:10,message:'长度范围在3到10之间',trigger: 'blur' },
        ],
        endDate: [
          { required: true, message: '请设置结束时间', trigger: 'blur' },
         // { min: 3,max:32,message:'长度范围在3到32之间',trigger: 'blur' },
        ],
      },


      }
    },
    methods:{
      //header
    //监听 添加用户对话框的关闭事件
    addDialogClosed(){
      this.$refs.addFormRef.resetFields()
    },
//用户详情
handleClick(row){
  console.log('ok');
  this.$router.push('/contain/userdetail/' + row.goodsId)
},




  //点击按钮 添加新用户
  addUser(){
    this.$refs.addFormRef.validate(async valid => {
      if(!valid) return
      //发起添加用户的网络请求
      this.$axios.post('api/usermanager/seckilladd',{
              // seckillPrice: this.addForm.seckillPrice,
              // stockCount: this.addForm.stockCount,
              startDate: this.addForm.startDate,
              endDate: this.addForm.endDate,
              goodsName: this.addForm.goodsName,
              goodsTitle: this.addForm.goodsTitle,
              goodsDetail: this.addForm.goodsDetail,
              goodsPrice: this.addForm.goodsPrice,
              goodsStock:this.editForm.goodsStock,
              aagr: this.addForm.aagr,
              term: this.addForm.term,
              goodsType: this.addForm.goodsType
              
            },)
            .then(resp =>{
              if(resp.data.code == 200){
                console.log('add');
                console.log(resp);
                this.$message.success("添加成功")
              }
              else{
                this.$message.error("添加失败")
              }
            }
            )
      this.addDialogVisible = false,
      this.getList()


    })
  },



      getList(){
        this.$axios.get('api/usermanager/secList/' + this.queryInfo.current,
        {
          params: this.queryInfo
        }).then(resp => {
              if(resp.status == 200){
                this.data = resp.data.data.records;
                this.total = resp.data.data.total;
                this.pages = resp.data.data.pages;
                // this.$message.success("获取成功");
                console.log(resp);
              }else{
                this.$message.console.error("获取秒杀列表失败");
              }
            })
      },



      
       // 监听修改用户对话框的关闭事件
      // editFormRef 修改用户表单 的 别名
      editDialogClosed() {
      this.$refs.editFormRef.resetFields()
      },
   
      //展示编辑用户的对话框
      // 修改用户信息并提交
      handle(row){
        this.editDialogVisible = true,
        this.id = row.toString(),
        // this.id = JSONbig.parse(row),
        // this.id = JSON.stringify(row),
        console.log(this.id);
      },
      editUserInfo(){
        // id = id.toString();
        this.$refs.editFormRef.validate(async valid => {
      if(!valid) return
      //发起修改用户的网络请求
      
      this.$axios.post('api/usermanager/seckilltime/' + this.id,{
              goodsId: this.editForm.goodsId,
              seckillPrice: this.editForm.seckillPrice,
              stockCount: this.editForm.stockCount,
              startDate: this.editForm.startDate,
              endDate: this.editForm.endDate,        
            },
           
            )
            .then(resp =>{
              if(resp.data.code == 200){
                console.log('edit');
                console.log(resp);
                this.$message.success(resp.data.data);

              }
              else{
                this.$message.error('修改失败');
                // console.log(error.response);
              }
            }
            )
      this.editDialogVisible = false,
      this.getList()


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

<style>
  .hre{
    padding-left: 5px;
    text-decoration: none;
    font-size: 13px;
    color: #409EFF;
  }
</style>