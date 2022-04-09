import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入需要的组件
import Login from '@/components/MyLogin.vue'
import Contain from '@/components/contain.vue'
import Shouye from '@/components/menu/shouye.vue'
import Manage from '@/components/menu/shangpin.vue'
import Dingdan from '@/components/menu/dingdan.vue'
import Umanage from '@/components/menu/yonghu.vue'
import Mmanage from '@/components/menu/guanliyuan.vue'
import Userdetail from '@/components/User-detail.vue'
import Miaosha from '@/components/menu/miaosha.vue'
import Dingdandetail from '@/components/dingdan_detail.vue'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: 
        //登录的路由规则
        [
            {path:'/',redirect:'/login'},
            { path: '/login', component: Login },
            {
                path: '/contain',
                component: Contain,
                redirect:'/contain/shouye',
                meta: { authRquired: true },
                children: [
                    { path: 'shouye', component: Shouye },
                    { path: 'manage', component: Manage },
                    { path: 'dmanage', component: Dingdan },
                    { path: 'umanage', component: Umanage },
                    { path: 'mmanage', component: Mmanage },
                    { path: 'miaosha', component: Miaosha},
                    { path: 'userdetail/:goodsId', component: Userdetail,props:true },
                    { path: 'dingdandetail/:id', component: Dingdandetail },
            ]}
        ]
    
})

router.beforeEach((to, from, next) =>{
    if (to.path === '/contain')
    {
        const token = localStorage.getItem('token')
        if (token) {
            next()
        }
        else {
            next('/login')
        }
    } else {
        next()
    }
})

export default router