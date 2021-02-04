<template>
  <router-view />
</template>
<script lang="ts">
import{ defineComponent }from 'vue';
export default defineComponent({
  name: "App",
  setup: () => {

  }
})
</script>
<style>
@import '~@/styles/base.css';
#app{
  height:100%;
}
</style>