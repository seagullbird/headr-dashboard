<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6" v-for="(theme, index) in themes" :key="index" :offset="index % 3 != 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="theme.thumb_nail" class="image">
          <div style="padding: 14px;">
            <span>{{ theme.name }}</span>
            <div class="bottom clearfix">
              <span class="button" v-if="currentTheme === theme.name">
                Current Theme</span>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        themes: {},
        currentTheme: ''
      }
    },
    mounted() {
      this.$store.dispatch('GetThemes', this.$store.getters.site_id).then(res => {
        this.themes = res.themes
        this.currentTheme = res.current_theme
      }).catch(error => {
        this.$message.error(error)
      })
    }
  }
</script>
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 5px;
    background: #409EFF;
    color: white;
    text-align: center;
    border-radius: 5px;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>