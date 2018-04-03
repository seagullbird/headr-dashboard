<template>
  <div class="new-site-container">
    <el-form :model="newSiteForm" :rules="newSiteRules" ref="newSiteForm" label-position="left" label-width="0px"
      class="card-box new-site-form">
      <h3 class="title">Welcome, {{ user_name }}!</h3>
      <el-form-item prop="sitename">
        <span class="svg-container svg-container_newsite">
          <i class="el-icon-news" style="color: white;"  v-show="!sitenameExists && !validating"></i>
          <i class="el-icon-loading" style="color: white;" v-show="!sitenameExists && validating"></i>
          <i class="el-icon-check" style="color: green;" v-show="sitenameExists === 'false'"></i>
          <i class="el-icon-close" style="color: red;" v-show="sitenameExists === 'true'"></i>
        </span>
        <el-input name="sitename" type="text" v-model="newSiteForm.sitename" placeholder="enter a name for your brand new site" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleGenerate">
          Generate
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" style="width:100%;" :loading="loading" @click.native.prevent="handleLogOut">
          Log Out
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidSitename } from '@/utils/validate'

export default {
  name: 'new_site',
  computed: {
    user_name() {
      return this.$store.getters.name
    }
  },
  data() {
    var validateSitename = (rule, value, callback) => {
      this.sitenameExists = ''
      if (!isvalidSitename(value)) {
        callback(new Error('Site name should include only [A-Za-z0-9_-], length 4~16'))
      } else {
        this.validating = true
        this.$store.dispatch('CheckSitenameExists', value).then(res => {
          this.validating = false
          if (res === false) {
            this.sitenameExists = 'false'
            callback()
          } else {
            this.sitenameExists = 'true'
            callback(new Error('Site name already exists.'))
          }
        }).catch(() => {
          this.validating = false
          this.sitenameExists = 'true'
          callback(new Error('Checking site name existence failed.'))
        })
      }
    }
    return {
      newSiteForm: {
        sitename: ''
      },
      newSiteRules: {
        sitename: [{ trigger: 'blur', validator: validateSitename }]
      },
      loading: false,
      validating: false,
      sitenameExists: ''
    }
  },
  methods: {
    handleGenerate() {
      this.$refs.newSiteForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('GenerateNewSite', this.newSiteForm).then(res => {
            this.$store.commit('SET_SITE_ID', res.site_id)
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            // TODO: Deal with error
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    handleLogOut() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .new-site-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_newsite {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .new-site-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
