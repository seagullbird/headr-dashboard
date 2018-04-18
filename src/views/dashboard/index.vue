<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">email:{{email}}</div>
    <div class="dashboard-text">site_id:{{site_id}}</div>
    <a :href="'https://site.headr.io/' + site_id" target="_blank">
      <el-button type="success" icon="el-icon-news">Open My Site</el-button>
    </a>
    <MarkdownEditor id="simplemde" placeholder="input about here..." v-model="about"></MarkdownEditor>
    <el-button type="primary" @click="handleUpdateAbout">Update About</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkdownEditor from '@/components/MarkdownEditor/index.vue'

export default {
  components: { MarkdownEditor },
  data() {
    return {
      about: ''
    }
  },
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'email',
      'site_id'
    ])
  },
  methods: {
    handleUpdateAbout() {
      if (this.about === '') return
      this.$message('Updating about...')
      this.$store.dispatch('UpdateAbout', { site_id: this.$store.getters.site_id, content: this.about }).then(res => {
        this.$message({
          type: 'success',
          message: 'Successfully updated about!'
        })
      }).catch(error => {
        this.$message.error(error)
      })
    },
    getAbout() {
      this.$store.dispatch('GetAbout', this.$store.getters.site_id).then(res => {
        this.about = res
      }).catch(error => {
        this.$message.error(error)
      })
    }
  },
  mounted() {
    this.getAbout()
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
