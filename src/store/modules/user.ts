import { initRouter } from '@/router/index'
import router from '@/router/index'

const user = {
    state:{
        routers:JSON.parse(localStorage.getItem('v3-element-plus-menu') || '[]'),
        loginState:false
    },
    mutations:{
        SET_ROUTERS(state:any,routes:any){
            state.routers = routes
        },
        SET_LOGIN_STATE(state:any,loginState:any){
            state.loginState = loginState
        }
    },
    actions:{
        GET_ROUTERS_DATA(ctx:any){
            fetch("/menu.json")
                .then((res:any) => res.json())
                .then((data:any) => {
                    localStorage.setItem('v3-element-plus-menu',JSON.stringify(data.menu))
                    ctx.commit('SET_ROUTERS',data.menu)
                    ctx.commit('SET_LOGIN_STATE',true)
                    initRouter(data.menu,undefined)   // 拼接路由信息
                    data.menu.forEach((rt:any) => {  // 添加路由信息到实例
                        router.addRoute(rt)
                    })
                    localStorage.setItem('v3-element-plus-token',JSON.stringify(data.token))
                    router.push({path:'/home'})
                })
                .catch((err:any) => {
                    console.log(err)
                })
        }
    }
}

export default user