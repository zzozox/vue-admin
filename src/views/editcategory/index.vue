<template>
  <div class="app-container">
    <el-form ref="form" :model="list" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="list.typeName"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        'videotypeId': null,
        'typeName': ''
      }
    }
  },
  created() {
    this.fetchDataById()
  },
  methods: {
    fetchDataById() {
      var id = this.$route.params.id
      var vm = this
      this.axios({
        method: 'GET',
        url: 'http://localhost:8083/milimili/admin/getCategory?id=' + id
      }).then(function(resp) {
        vm.list = resp.data
      })
    },
    onSubmit() {
      var vm = this
      this.axios({
        method: 'POST',
        data: vm.list,
        url: 'http://localhost:8083/milimili/admin/updatecategory'

      }).then(function(resp) {
        vm.$message({
          message: '修改成功',
          type: 'success'
        })
        vm.$router.push('/category')
      })
    },
    onCancel() {
      this.$message({
        message: '返回中!',
        type: 'success'
      })
      this.$router.push('/category')
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
.el-input {
  width: 200px;
}
</style>

