<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="广告名">
        <el-input v-model="advertisementName" />
      </el-form-item>
      <el-form-item>
        <el-button type="warning" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="list"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="广告名称">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="点击量" width="95">
        <template slot-scope="scope">
          {{ scope.row.click }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="广告类型" width="95">
        <template slot-scope="scope">
          {{ scope.row.advertisementtype.typeName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="上传日期">
        <template slot-scope="scope">
          {{ scope.row.uploadTime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="广告主">
        <template slot-scope="scope">
          {{ scope.row.user.userName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" width="95">
        <template slot-scope="scope">
          {{ scope.row.tstate.stateName }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="330" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="editadvertisement(scope.row.advertisementId)">
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: { Pagination },
  data() {
    return {
      advertisementName: '',
      total: 0,
      listQuery: {
        page: 1,
        limit: 5
      },
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    onSubmit() {
      var vm = this
      this.axios({
        method: 'GET',
        url: 'http://localhost:8083/milimili/advertisement/searchAd?pageNum=' + vm.listQuery.page + '&pageSize=' + vm.listQuery.limit + '&name=' + vm.advertisementName
      }).then(function(resp) {
        vm.total = resp.data.total // 将pageInfo中的total放到vm的total
        vm.list = resp.data.list
      })
    },
    getList() {
      var vm = this
      this.axios({
        method: 'GET',
        url: 'http://localhost:8083/milimili/advertisement/pageInfo?pageNum=' + vm.listQuery.page + '&pageSize=' + vm.listQuery.limit
      }).then(function(resp) {
        vm.total = resp.data.total // 讲pageInfo中的total放到vm的total
        vm.list = resp.data.list
      })
    },
    addadvertisement() {
      this.$router.push('/addadvertisement/index')
    },
    editadvertisement(id) {
      this.$router.push('/editadvertisement/index/' + id)
    }
  }
}
</script>
