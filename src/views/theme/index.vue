<template>
  <div class="app-container">
    <el-row>
      <el-col :span="6" v-for="(theme, index) in themes" :key="index" :offset="index % 3 != 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <a :href="theme.home_page" target="_blank">
            <img :src="theme.thumb_nail" class="image">
          </a>
          <div style="padding: 14px;">
            <span>{{ theme.name }}</span>
            <div class="bottom clearfix">
              <el-button class="currentChoice" type="text" v-if="currentTheme === theme.name">Current Theme</el-button>
              <el-button class="choose" type="text" v-else @click="handleChangeTheme(theme.name)">Choose</el-button>
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
    },
    methods: {
      handleChangeTheme(theme) {
        this.$message('Chaning theme...')
        this.$store.dispatch('UpdateTheme', { site_id: this.$store.getters.site_id, theme: theme }).then(res => {
          this.$message({
            type: 'success',
            message: 'Successfully updated config!'
          })
        }).catch(error => {
          this.$message.error(error)
        })
      }
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

  .currentChoice {
    padding: 0;
    border-bottom: 1px solid #409EFF;
    float: right;
  }

  .choose {
    padding: 0;
    float: right;
  }

  .image {
    height: 100%;
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