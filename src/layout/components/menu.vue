<template>
    <div class="menu-wrapper">
        <el-menu
        :collapse="isCollapse"
        :uniqueOpened="true"
        :default-active="currentRoutePath"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="var(--menuBg)"
        text-color="var(--menuTextColor)"
        active-text-color="var(--menuActiveTextColor)">
        <template v-for="(menu,index) in menus">
            <!-- 存在一个子节点 父节点为Layout -->
            <template v-if="menu.name === undefined">
                <el-menu-item @click="selectMenu(menu.children[0])" :index="menu.children[0].meta.url" :key="menu.path">
                    <i class="el-icon-location"></i>
                    <template #title>{{menu.meta.title}}</template>
                </el-menu-item>
            </template>
            <!-- 不存在子节点 -->
            <template v-else-if="menu.children === undefined || menu.children.length === 0 || menu.name === undefined">
                <el-menu-item @click="selectMenu(menu)" :index="menu.meta.url" :key="menu.path">
                    <i class="el-icon-location"></i>
                    <template #title>{{menu.meta.title}}</template>
                </el-menu-item>
            </template>
            <!-- 存在多个子节点 -->
            <el-submenu v-else :index="menu.path" :key="menu.path">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>{{menu.meta.title}}</span>
                </template>
                <el-menu-item @click="selectMenu(item)" :index="item.meta.url" v-for="(item,i) in menu.children" :key="item.path">
                    <template #title>{{menu.meta.title}}</template>
                </el-menu-item>
            </el-submenu>
        </template>
        </el-menu>
    </div>
</template>
<script lang="ts">
import{ defineComponent,toRefs,reactive,onMounted,watch,computed,ref }from 'vue';
import router from '@/router/index'
import store from '@/store/index'
import { Store } from 'vuex'
export default defineComponent({
    name: "",
    props:{
        isCollapse:{
            type:Boolean,
            default:true
        }
    },
    setup: (props) => {
        watch(() => {
            return props.isCollapse
        },(n) => {
            console.log(n)
        })
        const handleOpen = (key:number, keyPath:string):void => {
            console.log(key, keyPath);
        }
        const handleClose = (key:number, keyPath:string):void => {
            console.log(key, keyPath);
        }
        let currentRoutePath = ref(router.currentRoute.value.path)
        const $store: Store<any> = store
        const selectMenu = (item:any):void => {
            currentRoutePath.value = item.meta.url
            router.push({path:item.meta.url})
        }
        const menus = computed(() => {
            return $store.state.user.routers
        })
        return {
            handleOpen,
            handleClose,
            menus,
            selectMenu,
            currentRoutePath
        }
    }
})
</script>
<style scoped>
.menu-wrapper {
    height: calc(100vh - 60px);
    background-color: var(--menuBg);
}
</style>