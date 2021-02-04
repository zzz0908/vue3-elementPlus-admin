<template>
    <div class="header-wrapper">
        <div style="display: flex;align-items: center;">
            <span :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'" @click="changeIsCollapse"></span>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="display:inline-block;">
                <el-breadcrumb-item v-for="(item,index) in routeMatched" :key="item.path">
                    <span v-if="item.name===undefined||index == routeMatched.length-1">{{ item.meta.title }}</span>
                    <a v-else @click="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
                <!-- <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div>
            <el-dropdown>
                <span style="cursor: pointer;">皮肤</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="tabStyle(co)" v-for="co in style">{{co.label}}</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <el-dropdown>
                <!-- <el-button type="primary"> -->
                    <span style="cursor: pointer;">admin</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                <!-- </el-button> -->
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script lang="ts">
import{ defineComponent,watch,computed,toRefs,reactive }from 'vue';
import router from '@/router/index'
export default defineComponent({
    name: "",
    props:{
        isCollapse:{
            type:Boolean,
            default:true
        }
    },
    setup: (props,{emit}) => {
        const state:any = reactive({
            routeMatched:[],
            style:[
                {
                    label:'默认',
                    value:'base'
                },
                {
                    label:'红色',
                    value:'red'
                },
                {
                    label:'绿色',
                    value:'green'
                },
                {
                    label:'黑色',
                    value:'black'
                }
            ]
        })
        watch(() => router.currentRoute.value.matched,(n) => {
            state.routeMatched = router.currentRoute.value.matched
        },{deep:true,immediate:true})
        const logOut = () => {
            window.localStorage.clear()
            router.push({path:'/login'})
        }
        const handleLink = (item:any) => {
            console.log(item)
            router.push({path:item.path})
        }
        const changeIsCollapse = ():void => {
            emit('changeIsCollapse')
        }
        let el:any = document.querySelector('html')
        el.setAttribute('class',localStorage.getItem('v3-element-plus-style') || 'base')
        const tabStyle = (co:any) => {
            localStorage.setItem('v3-element-plus-style',co.value)
            el.setAttribute('class', co.value)
        }
        return {
            changeIsCollapse,
            logOut,
            handleLink,
            ...toRefs(state),
            tabStyle
        }
    }
})
</script>
<style scoped>
.header-wrapper{
    height:100%;
    box-shadow: 24px 4px 29px #ccc;
    display:flex;
    justify-content: space-between;
    align-items: center;
}
.el-icon-s-fold,.el-icon-s-unfold{
    cursor: pointer;
    font-size:30px;
    padding:15px;
}
</style>