<template>
  <div>
    <el-container>
        <el-header>
         
            <el-row class="banner">

                <el-col :span="11">
                    <div class="grid-content bg-purple">
                        <!-- <img src="../assets/logo.png"  class="logo" title="la"> -->
                        <div class="title1">
                          <h1>秒杀后台管理系统</h1>
                        </div>
                    </div>
                </el-col>

                <el-col :span="9">
                    <div class="grid-content bg-purple-light">
                        <!-- <h4>后台管理系统</h4> -->
                    </div>
                </el-col>

                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <button @click="exit">返回登录</button>
                    </div>
                </el-col>
            </el-row>
        </el-header>
  <el-container style="height:1000px;border:1px solid #eee">

  <el-aside width="200px" height="300px">

      <el-menu :default-openeds="['1', '5']" >
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>
            <router-link class="shouye" to="/contain/shouye" exact>商品管理</router-link>  
        </template>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
        </el-submenu> 


      <!-- </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>
            <router-link to="/contain/manage" class="manage" exact>商品管理</router-link>
        </template> -->
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      <!-- </el-submenu> -->


      <el-submenu index="3">
        <template slot="title"><i class="el-icon-menu"></i>
        <router-link to="/contain/dmanage" class="dingdan" exact>订单管理</router-link>
        </template>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>
     

      <el-submenu index="4">
        <template slot="title"><i class="el-icon-s-custom"></i>
            <router-link to="/contain/umanage" class="umange" exact>用户管理</router-link>
        </template>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="4-1">选项1</el-menu-item>
          <el-menu-item index="4-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="4-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="4-4">
          <template slot="title">选项4</template>
          <el-menu-item index="4-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>

       <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>
            <router-link to="/contain/mmanage" class="mmange" exact>管理员列表</router-link>
        </template>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="5-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="5-4">
          <template slot="title">选项4</template>
          <el-menu-item index="5-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      </el-submenu>


       <!-- <el-submenu index="5">
        <template slot="title"><i class="el-icon-setting"></i>
            <router-link to="/contain/miaosha" class="mmange" exact>秒杀设置</router-link>
        </template> -->
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="5-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="5-4">
          <template slot="title">选项4</template>
          <el-menu-item index="5-4-1">选项4-1</el-menu-item>
        </el-submenu> -->
      <!-- </el-submenu> -->

    </el-menu>
  </el-aside>

  <el-main>
      <router-view></router-view>
  </el-main>
  </el-container>
</el-container>

  </div>
</template>

<script>
export default {
    methods:{
        exit(){
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="less" >
    .el-header{
        background-color: #222222;
        color: #f0faff;
        margin: 0;
    }
    .el-aside{
        background-color: #222222;
        color:#333;
        padding: 0;
        margin: 0;
    }
    .el-main{
        background-color:#ffffff;
    }
    .logo{
        width: 20px;
    }
    .banner{
        display: flex;
        align-items: center;
    }

    .shouye,
    .manage,
    .dingdan,
    .umange,
    .mmange{
        text-decoration: none;
        color: #ffffff;
        
    }
    .title1{
      // padding-bottom: 40px ;
      font-size: 14px;
    }

    .el-submenu{
       background-color: #222222;
    }
    .el-submenu__title:hover{
      background-color: #09b4c5;
    }
    .el-submenu__title{
      height: 50px;
    }
    

    .el-menu-item-group{
      background-color: #222222;
      
    }
    .el-menu-item:hover{
      background-color: #09b4c5;
    }

    

    .el-menu-item{
      color: #ffffff;
    }
    .el-menu-item-group__title{
      color: #ffffff;
    }

    .router-link-active{
            /* vue-router提供了这个类 */
            color: #FFFFCC;
            // color: #409EFF;
            font-weight: 800;
            font-style: italic;
            text-decoration: underline;
            font-size: 15px;
        }

     .router-link-class {
    background: lightblue;
    color: black;
  }
</style>