import { defineComponent } from 'vue'

{
  /* <script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

</script>

<template>
  <div class="w-full bg-slate-500 h-16">

  </div>
  <div class="p-4">
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}
</style> */
}

export default defineComponent({
  setup() {
    return () => (
      <>
        <div class="w-full bg-slate-500 h-16"></div>
        <div class="p-4">
          <router-view></router-view>
        </div>
      </>
    )
  }
})
