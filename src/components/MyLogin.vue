<template>
    <div class="Box1">
      <div class="Box">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm"            label-width="100px" class="demo-ruleForm" @keyup.enter.native="submitForm('ruleForm')">
        <h2 class="title">账户登录</h2>

        <el-form-item label="用户名" prop="name" for="ruleForm.name">
        <el-input v-model.trim="ruleForm.name" id="ruleForm.name" clearable=""></el-input>
        </el-form-item>


        <el-form-item label="密码" prop="pass" for="password">
        <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off" show-password id="password"></el-input>
        </el-form-item>
 
        <!-- <el-form-item label="ip" prop="IP" for="ip">
        <el-input type="password" v-model.trim="ruleForm.IP" show-password id="ip"></el-input>
        </el-form-item>

        <el-form-item label="选择身份" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
            <el-radio label="超级管理员" checked = "checked"></el-radio>
            <el-radio label="管理员"></el-radio>
        </el-radio-group>
       </el-form-item> -->
 
       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="login" :disabled="!canSumbit">登录</el-button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <el-button @click="resetForm('ruleForm')" class="reset">重置</el-button>
       </el-form-item>
</el-form>
    </div>
    </div>
    
</template>

<script>
// import axios from 'axios'
export default {
     data() {
      return {
        ruleForm: {
          name: '',
          resource: '',
          pass: '',
          IP:'',
          salt:'helloworld'
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ],

          resource: [
            { required: true, message: '请选择身份', trigger: 'change' }
          ],

        pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 1, max: 32, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ],

        IP:[
            { required: true, message: '请输入IP地址', trigger: 'blur' },
            { min: 1, max: 16, message: '长度在 1 到 16 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) { 
            var salt = 'ngEPY';
            let data1 = this.$md5(this.ruleForm.pass + salt);
            console.log(this.ruleForm.name);
            console.log(data1);


            this.$axios.post('api/manager/login',{
              username: this.ruleForm.name,
              password: data1,

            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
            
            )
            .then(resp => {
              if(resp.data.code === 200){
                const cookie = resp.data.data;
                console.log(resp);
                console.log(cookie);
                localStorage.setItem('token',cookie)
                // this.userToken = 'Bearer' + this.token;
                // this.changeLogin({Authorization:this.userToken})
                this.$router.replace("/contain/shouye");
                // alert("登录成功");
                if(resp.data.result == "success")
                  this.$message.success("登录成功")
              } 
              else{
                 this.$message.error(resp.data.data);
              }
        })  
         //.catch(err=>{
          // alert('账号或密码错误')
          
          // console.log(err);  
          //     else {
          //   console.log('error');
          //   return false;
          // }
       // })
        
        
          
          } 
        })
      },
      async resetForm(formName) {
        this.$refs[formName].resetFields();
        // const{data:res} = await axios.post('http://162.14.80.53:8777/login')
        // console.log(res);
      }
    },
    computed:{
      canSumbit(){
      return Boolean(this.ruleForm.name && this.ruleForm.pass)
    }
    },
    mounted(){
      let data = this.$md5('0' + 'ngEPY')
      console.log(data);
    }
  
}
</script>

<style>
    .Box1{
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        overflow-y: auto;
        background-image: url("../assets/image/图片1.jpg");
        /* 固定body的背景 */
        background-attachment: fixed;
        background-size: cover;
        /* background-color: rgba(233, 23,122 ,0.5); */
    }

    .Box{
        position: absolute;
        display: flex;
        align-items: center;
        width: 400px;
        height: 400px;
        border: 1px solid #ccc;
        margin-left: 800px;
        margin-top: 200px;
        box-shadow: 4px 4px 4px #888888;
        background-color: rgba(255, 255, 255, 0.9);
    }
    
    .title{
        text-align: center;
    }

    
</style>