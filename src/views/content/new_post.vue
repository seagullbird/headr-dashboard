<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-card>
          <el-form  style="margin-bottom:20px" label-width="80px">
            <el-form-item label="Title">
              <el-input clearable></el-input>
            </el-form-item>
            <el-form-item label="Summary">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                v-model="form.summary">
              </el-input>
            </el-form-item>
          </el-form>
          <MarkdownEditor id="simplemde" placeholder="input content here..."></MarkdownEditor>
        </el-card>
    </el-main>
    <el-aside>
      <el-card>
        <div slot="header">
          <i class="el-icon-upload2"></i>
          <span>Publish</span>
        </div>
        <el-form :model="form" label-width="40px">
          <el-form-item label="Draft">
            <el-switch v-model="form.draft"></el-switch>
          </el-form-item>
          <el-form-item label="Date">
            <el-date-picker
              v-model="form.date"
              type="datetime">
            </el-date-picker>
          </el-form-item>
          <el-form-item style="margin-bottom:0; text-align:right;">
            <el-button type="primary">Publish</el-button>
            <el-button>Save</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card>
        <div slot="header">
            <i class="el-icon-plus"></i>
            <span>Metadata</span>
        </div>
        <el-form label-position="top" label-width="40px">
          <el-form-item label="Tags">
            <el-tag
              :key="tag"
              v-for="tag in form.tags"
              closable
              :disable-transitions="false"
              @close="handleTagClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="form.tagInputVisible"
              v-model="form.tagInputValue"
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

  export default {
    components: { MarkdownEditor },
    data() {
      return {
        form: {
          draft: true,
          date: '',
          tags: ['1', '2'],
          summary: '',
          tagInputVisible: false,
          tagtagInputValue: ''
        }
      }
    },
    methods: {
      handleTagClose(tag) {
        this.form.tags.splice(this.form.tags.indexOf(tag), 1)
      },
      showTagInput() {
        this.form.tagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      handleTagInputConfirm() {
        const tagInputValue = this.form.tagInputValue
        if (tagInputValue) {
          this.form.tags.push(tagInputValue)
        }
        this.form.tagInputVisible = false
        this.form.tagInputValue = ''
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