<template>
   <div class="demo-image">
  <div class="block" v-for="fit in fits" :key="fit">

    <div class="box">
    
       <el-image
      class="img"
      :src="url"
      :fit="fit"
      @click="skip"
      >
      </el-image>
      <div class="name"><p>1斤装【瓜子酥+芝麻酥】</p></div>
      <div class="price"><p>￥8.5</p></div>
       <div class="num"> <p>已库存：
         <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
         
         </p></div>
    </div>


      <div class="box">
      <el-image
      class="img"
      :src="url"
      :fit="fit">
      </el-image>
      <div class="name"><p>1斤装【瓜子酥+芝麻酥】</p></div>
      <div class="price"><p>￥8.5</p></div>
       <div class="num"> <p>已库存：
         <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
         
         </p></div>
    </div>

      <div class="box">
      <el-image
      class="img"
      :src="url"
      :fit="fit">
      </el-image>
      <div class="name"><p>1斤装【瓜子酥+芝麻酥】</p></div>
      <div class="price"><p>￥8.5</p></div>
       <div class="num"> <p>已库存：
         <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
         
         </p></div>
    </div>


       <div class="box">
      <el-image
      class="img"
      :src="url"
      :fit="fit">
      </el-image>
      <div class="name"><p>1斤装【瓜子酥+芝麻酥】</p></div>
      <div class="price"><p>￥8.5</p></div>
       <div class="num"> <p>已库存：
         <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
         
         </p></div>
    </div>

       <div class="box">
      <el-image
      class="img"
      :src="url"
      :fit="fit">
      </el-image>
      <div class="name"><p>1斤装【瓜子酥+芝麻酥】</p></div>
      <div class="price"><p>￥8.5</p></div>
       <div class="num"> <p>已库存：
         <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
         
         </p></div>
    </div>


       <div class="box">
      <el-image
      class="img"
      :src="url"
      :fit="fit">
      </el-image>
      <div class="name"><p>1斤装【瓜子酥+芝麻酥】</p></div>
      <div class="price"><p>￥8.5</p></div>
       <div class="num"> <p>已库存：
         <el-progress :text-inside="true" :stroke-width="22" :percentage="80" status="warning"></el-progress>
         
         </p></div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
      return {
        fits: [ 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        data:[]
      }
    },
    methods:{
      skip(){
        this.$router.push('/login')
      },

      getList(){
        this.$axios.get('api/usermanager/secList/1').then(resp => {
              if(resp.status == 200){
                this.data = resp.data.data.records;
                this.$message.success("获取成功");
                console.log(resp);
              }else{
                this.$message.console.error("获取秒杀列表失败");
              }
            })
      },

    },
    created(){
      this.getList();
    }
}
</script>

<style>
  .img{  
    margin-right: 50px;
    margin-left: 50px;
    width: 300px; height: 200px;
    margin-top: 10px;
  }
  .block{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-content: flex-end;
    
  }
  .box{
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    /* box-shadow: 2px 2px 4px #888888; */
    background-color: rgba(255, 255, 255, 0.9);
    margin-bottom:40px ;
    margin-left: 10px;
  }
  .name{
    padding-left: 50px;
    /* background-color: antiquewhite; */
    font-size: 20px;
  }
  .price{
    padding-left: 50px;
    font-size: 20px;
  }
  .num{
    padding-left: 50px;
    font-size: 20px;
  }
</style>