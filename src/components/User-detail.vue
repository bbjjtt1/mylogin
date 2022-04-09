<template>
    <div>
    <el-container>
      <el-header class="header"> 
        <!-- header----- {{this.$route.params.goodsId}} -->
       <el-row>
          <el-button type="primary" @click="back1">返回</el-button>
      </el-row>
        </el-header>

      <el-main>
         <!-- 商品参数区域 -->
          

        <!-- <div class="mui-card">
          <div class="mui-card-header">商品参数</div>
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <p>商品货号：{{ detail.goodsPrice }}</p>
              <p>库存情况：{{ detail.goodsName }}</p>
              <p>上架时间：{{ detail.goodsTitle }}</p>
            </div>
          </div>
        </div> -->
       
        <div class="container">
          <div class="box_p">
             <hr>
            <h1>商品基本信息</h1>
          </div>
          <div class="block1">
            <div class="b">
                <p>商品名称：</p>
                <input type="text" name="" id="" v-model="detail.goodsName" disabled>
            </div>
             <div class="b">
                <p>商品标题：</p>
                <input type="text" name="" id="" v-model="detail.goodsTitle" disabled>
            </div>
             <div class="b">
                <p>商品描述：</p>
                <input type="text" name="" id="" v-model="detail.goodsDetail" disabled>
            </div>
             <div class="b">
                <p>商品价格：</p>
                <input type="text" name="" id="" v-model="detail.goodsPrice" disabled>
            </div>
             <div class="b">
                <p>商品库存：</p>
                <input type="text" name="" id="" v-model="detail.goodsStock" disabled>
            </div>
             <div class="b">
                <p>年利化率：</p>
                <input type="text" name="" id="" v-model="detail.aggr" disabled>
            </div>
             <div class="b">
                <p>最低期限：</p>
                <input type="text" name="" id="" v-model="detail.term" disabled>
            </div>
             <div class="b">
                <p>商品类型：</p>
                <input type="text" name="" id="" v-model="detail.goodsType" disabled>
            </div>
          </div>
          <!-- <table border="1" class="mt">
            <thead>
              <tr>
                <th>商品名称</th>
                <th>商品标题</th>
                <th>商品描述</th>
                <th>商品价格</th>
                <th>商品库存</th>
                <th>年化利率</th>
                <th>理财产品最低期限</th>
                <th>商品类型</th>
              
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{detail.goodsName}}</td>
                <td>{{detail.goodsTitle}}</td>
                <td>{{detail.goodsDetail}}</td>
                <td>{{detail.goodsPrice}}</td>
                <td>{{detail.goodsStock}}</td>
                <td>{{detail.aagr}}</td>
                <td>{{detail.term}}</td>
                <td>{{detail.goodsType}}</td>
              </tr>
            </tbody>
          </table> -->
        </div>

      </el-main>

      <el-footer> </el-footer>
    </el-container>
 
 
  </div>
</template>

<script>
export default {
    data(){
        return{
            detail:{}
        }
    },

    components:{
      scroll
    },
    methods:{
        //拿管理员的数据
      getList(){
        const token = localStorage.getItem('Token')
        this.$axios.get('api/usermanager/goodsall',{
            headers: {
              goodsId:this.$route.params.goodsId,
              Token:token
            }

        }).then(resp => {
              if(resp.status == 200){
                console.log(resp);
                this.detail = resp.data.data;
                
              }else{
                this.$message.console.error("获取订单列表失败");
              }
            })
      },

      back1(){
      this.$router.push('/contain/shouye');
      // console.log("ok");
    }
    },
    created(){
        this.getList()
    },
    
}
</script>

<style>
    .header{
        background-color: #fff;
    }
    /* table.mt {
	width: 1000px;
	border-spacing: 0px;
	border-right:1px solid #aaa;
	border-bottom:1px solid #aaa;
}
table.mt td {
	border-left:1px solid #aaa;
	border-top:1px solid #aaa;
	padding:10px;
}
table.mt thead tr {
	background: #409EFF;
	color: #fff;
}
table.mt tbody tr:nth-child(even) {
	background: #eee;
  text-align: center;
}
table.mt tbody tr:hover {
	background: #ccc;
	color: #fff;
} */
.mt{
  margin-top: 20px;
}

.box_p{
  font-size: 15px;
  background-color: #eee;
  height: 50px;
  padding-bottom: 15px;
}
h1{
  padding-left:10px;
  
}

.block1{
  margin-top: 50px;
  margin-left: 70px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-end;
}
.b{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-bottom: 30px;
}
input{
  height: 30px;
  width: 250px;
  border-radius: 5px;
}
</style>