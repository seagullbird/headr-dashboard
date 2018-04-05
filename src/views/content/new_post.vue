<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-card>
          <el-form
            :model="contentForm"
            :rules="contentFormRules"
            ref="contentForm"
            style="margin-bottom:20px"
            label-width="80px"
            @submit.native.prevent>
            <el-form-item label="Title" prop="title">
              <el-input clearable v-model="contentForm.title"></el-input>
            </el-form-item>
            <el-form-item label="Summary">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="contentForm.summary">
              </el-input>
            </el-form-item>
          </el-form>
          <MarkdownEditor id="simplemde" placeholder="input content here..." v-model="contentForm.content"></MarkdownEditor>
        </el-card>
    </el-main>
    <el-aside>
      <el-card>
        <div slot="header">
          <i class="el-icon-upload2"></i>
          <span>Publish</span>
        </div>
        <el-form
          :model="publishForm"
          :rules="publishFormRules"
          ref="publishForm"
          label-width="50px"
          @submit.native.prevent>
          <el-form-item label="Draft">
            <el-switch v-model="publishForm.draft"></el-switch>
          </el-form-item>
          <el-form-item label="Date" prop="date">
            <el-date-picker
              v-model="publishForm.date"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-bottom:0; text-align:right;">
            <el-button type="primary" @click="handlePublish">Publish</el-button>
            <el-button>Save</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <div slot="header">
            <i class="el-icon-plus"></i>
            <span>Metadata</span>
        </div>
        <el-form
          :model="metadataForm"
          :rules="metadataFormRules"
          ref="metadataForm"
          label-position="top"
          label-width="40px"
          @submit.native.prevent>
          <el-form-item label="Tags">
            <el-tag
              :key="tag"
              v-for="tag in metadataForm.tags"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="metadataForm.tagInputVisible"
              v-model="metadataForm.tagInputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleTagInputConfirm"
              @blur="handleTagInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showTagInput">+ New Tag</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-aside>
    </el-container>
  </div>  
</template>
<script>
  import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
  import Moment from 'moment'

  export default {
    components: { MarkdownEditor },
    data() {
      return {
        contentForm: {
          title: '',
          summary: '',
          content: ''
        },
        contentFormRules: {
          title: [{ required: true, trigger: 'blur', message: 'Please input a title' }]
        },
        publishForm: {
          draft: true,
          date: ''
        },
        publishFormRules: {
          date: [{ required: true, trigger: 'blur', message: 'Please input publish date and time' }]
        },
        metadataForm: {
          tags: [],
          tagInputVisible: false,
          tagtagInputValue: ''
        },
        metadataFormRules: {}
      }
    },
    methods: {
      handleTagClose(tag) {
        this.form.tags.splice(this.form.tags.indexOf(tag), 1)
      },
      showTagInput() {
        this.metadataForm.tagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleTagInputConfirm() {
        const tagInputValue = this.metadataForm.tagInputValue
        if (tagInputValue) {
          this.metadataForm.tags.push(tagInputValue)
        }
        this.metadataForm.tagInputVisible = false
        this.metadataForm.tagInputValue = ''
      },
      handlePublish() {
        var allValid = false
        this.$refs.contentForm.validate(valid => {
          if (valid) {
            this.$refs.publishForm.validate(valid => {
              if (valid) allValid = true
            })
          }
        })
        if (!allValid) return

        this.$store.dispatch('NewPost', {
          site_id: Number(this.$store.getters.site_id),
          post: {
            title: this.contentForm.title,
            summary: this.contentForm.summary,
            content: this.contentForm.content,
            tags: JSON.stringify(this.metadataForm.tags),
            draft: this.publishForm.draft,
            date: new Moment(this.publishForm.date).format()
          }
        }).then(res => {
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
<style scoped>
  .el-main {
    height: 1000px;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
  }
  .el-card {
    width: 100;
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>