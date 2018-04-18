<template>
  <div class="dashboard-container">
    <el-row :gutter="100">
      <el-col :span="16">
        <div>
          <MarkdownEditor id="simplemde" placeholder="Describe yourself" v-model="about"></MarkdownEditor>
          <div class="tip">
            Tip: Content you edit here will be shown in the "About Me" page.
          </div>
          <div class="update-button">
            <el-button type="primary" @click="handleUpdateAbout">Update About</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <img :src="avatar" class="image">
          <div class="profile-name">{{name}}</div>
          <div style="text-align: center;">
            <i class="el-icon-message"></i>
            <a class="profile-email" :href="'mailto:' + email">{{email}}</a>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
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
      'site_id',
      'avatar'
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

<style scoped>
.dashboard-container {
    margin: 30px;
    padding: 20px;
}

.image {
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}

.profile-name {
  margin-bottom: 10px;
  text-align: center;
  font-size: 30px;
}

.profile-email {
  color: #0366d6;
}

.update-button {
  margin-top: 20px;
  float: right;
}

.tip {
  font-size: 15px;
  float: left;
  margin-top: 20px;
}
</style>
