<template>
    <div class="logo-wrapper">
        <img src="~@/assets/logo.png" alt="">
        <span v-if="!isCollapse" class="logo-text">vue3-element-plus</span>
    </div>
</template>
<script lang="ts">
import{ defineComponent }from 'vue';
export default defineComponent({
    name: "",
    props:{
        isCollapse:{
            type:Boolean,
            default:true
        }
    },
    setup: () => {

    }
})
</script>
<style scoped>
.logo-wrapper{
    height:60px;
    margin:0 auto;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: var(--menuBg);
    overflow:hidden;
}
.logo-wrapper img{
    width:50px;
}
.logo-wrapper span{
    color:var(--menuTextColor);
}
.logo-text{
    white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>