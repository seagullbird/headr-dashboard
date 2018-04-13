<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">email:{{email}}</div>
    <div class="dashboard-text">site_id:{{site_id}}</div>
    <a :href="'https://site.headr.io/' + site_id" target="_blank">
      <el-button type="success" icon="el-icon-news">Open My Site</el-button>
    </a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'email',
      'site_id'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
