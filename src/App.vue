<template>
  <div id="app">
    <el-tabs v-model="activeName">
      <el-tab-pane label="Design" name="Design"><home /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Home from "@/views/Home.vue";

export default {
  name: "App",
  data() {
    return {
      activeName: "Design",
    };
  },
  components: {
    Home,
  },
};
</script>
