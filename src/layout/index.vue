<template>
      <el-container>
        <el-aside style="transition: all .5s" :width="!isCollapse ? '200px' : '64px'">
            <VLogo :isCollapse="isCollapse"/>  <!-- logo -->
            <VMenu :isCollapse="isCollapse" />  <!-- 菜单 -->
        </el-aside>
        <el-container>
        <el-header>
            <VHeader :isCollapse="isCollapse" @changeIsCollapse="changeIsCollapse" />  <!-- header 头部 -->
        </el-header>
        <el-main>
            <router-view/>
        </el-main>
        </el-container>
    </el-container>
</template>
<script lang="ts">
import{ defineComponent,toRefs,reactive }from 'vue';
import VMenu from './components/menu.vue'
import VLogo from './components/logo.vue'
import VHeader from './components/header.vue'
export default defineComponent({
    name: "",
    components:{
        VMenu,
        VLogo,
        VHeader
    },
    setup: () => {
        const state = reactive({
            isCollapse:false  // 控制菜单展开 收起
        })
        const changeIsCollapse = ():void => {
            state.isCollapse = !state.isCollapse
        }
        return {
            ...toRefs(state),
            changeIsCollapse
        }
    }
})
</script>
<style scoped>
.el-container{
    height:100vh;
}
</style>