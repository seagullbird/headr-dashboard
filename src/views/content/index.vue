<template>
  <div class="app-container">
    <el-container>
      <el-aside>
        <el-input placeholder="Filter keyword" v-model="filterText" style="margin-bottom:30px;"></el-input>
        <el-tree class="filter-tree" :data="posts_menu" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree2" @node-click="handleNodeClick"></el-tree>
      </el-aside>
      <el-main>
        <el-tabs tab-position="right">
          <el-tab-pane label="Edit">
            <MarkdownEditor id="simplemde" :value="selected_post.content"></MarkdownEditor>
          </el-tab-pane>
          <el-tab-pane label="Config">
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="Title">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="Draft">
                <el-switch v-model="form.draft"></el-switch>
              </el-form-item>
              <el-form-item label="Tags">
                <el-tag
                  :key="tag"
                  v-for="tag in form.tags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="form.tagInputVisible"
                  v-model="form.tagInputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </el-form-item>
                <el-form-item>
                  <el-button type="primary" icon="el-icon-upload">Publish</el-button>
                  <el-button type="danger" icon="el-icon-delete">Delete</el-button>
                </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import MarkdownEditor from '@/components/MarkdownEditor/index.vue'
  export default {
    components: { MarkdownEditor },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      },
      posts(val) {
        this.posts_menu = []
        for (let i = 0; i < val.length; i++) {
          this.posts_menu.push({
            id: val[i].ID,
            label: val[i].title
          })
        }
      }
    },

    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },

      handleClose(tag) {
        this.form.tags.splice(this.form.tags.indexOf(tag), 1)
      },

      showInput() {
        this.form.tagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm() {
        const tagInputValue = this.form.tagInputValue
        if (tagInputValue) {
          this.form.tags.push(tagInputValue)
        }
        this.form.tagInputVisible = false
        this.form.tagInputValue = ''
      },
      handleNodeClick(data) {
        for (let i = 0; i < this.posts.length; i++) {
          if (this.posts[i].ID === data.id) {
            this.selected_post = this.posts[i]
            break
          }
        }
        this.form.title = this.selected_post.title
        this.form.draft = this.selected_post.draft
        this.form.tags = JSON.parse(this.selected_post.tags)
      },
      getPosts() {
        this.$store.dispatch('GetAllPosts')
      }
    },
    data() {
      return {
        form: {
          title: '',
          draft: true,
          tags: ['1', '2'],
          tagInputVisible: false,
          tagtagInputValue: ''
        },
        title: '',
        posts_menu: [],
        selected_post: {},
        tabPosition: 'top',
        filterText: '',
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    mounted() {
      this.getPosts()
    },
    computed: {
      posts() {
        return this.$store.getters.posts
      }
    }
  }
</script>
<style scoped>
  .el-main {
    height: 500px;
    padding: 0;
    padding-left: 10px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .op-button-group {
    float: right;
    margin-top: 5px;
    margin-right: 10px;
  }
</style>