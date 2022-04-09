<template>
  <el-dialog
  :title="!form.id ? '新增' : '修改'"
  :close-on-click-modal="false"
  :visible.sync="visible"
  >
    <el-form ret="form" :model="form" label-width="80px">
        <el-form-item label="表单名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
    </el-form>


  </el-dialog>
</template>

<script>
export default {
    name: 'baseform',
    data(){
        return{
            visible: false,
            form:{
                name:''
            }
        }
    },
    methods:{
        init(id){
            this.form.id = id || 0
            this.visible = true
            this.$$nextTick(() => {
                
            })
        }
    }
}
</script>

<style>

</style>