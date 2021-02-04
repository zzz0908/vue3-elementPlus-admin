import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import store from '@/store'
import { Store } from 'vuex'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    // redirect:'/home',
    name:"Layout",
    children:[]
  },
  {
    path: '/login',
    name:"Login",
    component:() => import('@/views/Login/index.vue'),
    children:[]
  }
]
export const initRouter = (routers:any,path:any) => {
  routers.forEach((route:any) => {
    if(route.meta && route.meta.component){
      route.component = loadView(route.meta.component)
    }else{
      route.component = Layout
    }
    if(path){
      path === '/' 
        ? route.meta.url = path + route.path
        : route.meta.url = path + '/' + route.path
    }
    if(route.children != undefined && route.children.length > 0){
      initRouter(route.children,route.path)
    }
  })
}
const loadView = (view:string) => {
  return () => import(`@/views/${view}.vue`)
}
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,form,next)=>{
  if(to.path !== '/login'){ // 不在登录页面时
    if(localStorage.getItem('v3-element-plus-token')){
      // 判断登录状态  存在token
      let $store:Store<any> = store
      if($store.state.user.loginState){
        // 已经登录
        next()
      }else{
        // 逻辑 1 ------------------------------------
        // 未登录( 刷新时 )  
        // 调用getUserInfo 
        // 存储 menu 
        // 加载路由信息
        // 改变 loginState 状态为 true

        // 逻辑 2 ------------------------------------
        let menu:any = localStorage.getItem('v3-element-plus-menu')
        let menuJson = JSON.parse(menu)  // 临时保存menu
        if(menu){  // 本地存在menu  加载路由信息
          initRouter(menuJson,undefined)
          menuJson.forEach((rt:any) => {  // 添加路由信息到实例
              router.addRoute(rt)
          })
          $store.commit('SET_ROUTERS',menuJson)
          $store.commit('SET_LOGIN_STATE',true)
          next({path:to.path})
        }else{
          // 不存在菜单 退回login
          window.localStorage.clear()
          router.push({path:'/login'})
        }
      }
    }else{
      window.localStorage.clear()
      router.push({path:'/login'})
    }
  }else{  // 登录页面
    next()
  }
})

export default router
