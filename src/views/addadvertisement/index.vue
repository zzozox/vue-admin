<template>
  <div class="app-container">
    <el-form ref="form" :model="advertisement" label-width="120px">
      <el-form-item label="广告名称">
        <el-input v-model="advertisement.advertisementTitle"/>
      </el-form-item>
      <el-form-item label="广告类型">
        <el-select v-model="advertisement.advertisementTypeId" placeholder="请选择">
          <el-option v-for="item in advertisementTypeList" :key="item.typeName" :label="item.typeName"
                     :value="item.advertisementtypeId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="广告状态">
        <el-select v-model="advertisement.advertisementStateId" placeholder="请选择">
          <el-option v-for="item in stateList" :key="item.stateName" :label="item.stateName" :value="item.stateId"/>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
    <pan-thumb :image="image"/>

    <el-button type="primary" icon="el-icon-upload" style="position: relative;bottom: 15px;margin-left: 40px;"
               @click="imagecropperShow=true"
    >
      添加缩略图
    </el-button>

    <image-cropper
      v-show="imagecropperShow"
      :key="imagecropperKey"
      :width="210"
      :height="300"
      :url="uploadUrl"
      lang-type="en"
      @close="close"
      @crop-upload-success="cropSuccess"
    />
    <ele-upload-video
      :data="{
      /*token: token*/
    }"
      :fileSize="1024"
      @error="handleUploadError"
      :responseFn="handleResponse"
      style="margin: 50px"
      action="http://localhost:8083/milimili/adminAdvertisementUpload"
      v-model="advertisement.advertisementUrl"
    />

  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import qs from 'qs'

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imagecropperShow: false,
      imagecropperKey: 0,
      advertisement: {
        'advertisementId': null,
        'advertisementTitle': '123',
        'advertisementInfo': '11',
        'advertisementTypeId': null,
        'advertisementStateId': null,
        'thunmbnailUrl': '',
        'advertisementType': {
          'advertisementtypeId': null,
          'typeName': ''
        },
        'editDate': '',
        'tUser': {
          'userId': null,
          'userName': '',
          'userAge': null,
          'userSex': '',
          'password': '',
          'encryptedProblem': '',
          'fanNum': 0,
          'userTel': '',
          'registerDate': '',
          'iconUrl': '',
          'stateId': null
        },
        'advertisementState': {
          'stateId': null,
          'stateName': ''
        },
        'advertisementUrl': '',
        'thumbnailUrl': '',
        'viewNum': null,
        'ppNum': null
      },
      // eslint-disable-next-line no-undef
      stateList: [{
        'stateId': '',
        'stateName': ''
      }],
      advertisementTypeList: [{
        'typeName': '',
        'advertisementtypeId': null
      }
      ],
      image: '',
      uploadUrl: 'http://localhost:8083/milimili/admin/thumbnailImageupload?advertisementId='
    }
  },
  created() {
    this.fetchDataById()
  },
  methods: {
    handleUploadError(error) {
      console.log('error', error)
    },
    handleResponse(response) {
      console.log(response.data)
      return response.data
    },
    fetchDataById() {
      var vm = this
      this.axios({
        method: 'GET',
        url: 'http://localhost:8083/milimili/admin/getAdvertisementStateList'
      }).then(function(resp) {
        vm.stateList = resp.data
      })
      this.axios({
        method: 'GET',
        url: 'http://localhost:8083/milimili/admin/getAdvertisementTypeList'
      }).then(function(resp) {
        vm.advertisementTypeList = resp.data
      })
    },
    onSubmit() {
      var vm = this
      console.log(vm.advertisement)
      this.axios({
        method: 'POST',
        data: vm.advertisement,
        url: 'http://localhost:8083/milimili/admin/addAdvertisement',
        transformRequest: [function(data) {
          if (data.code === 200) {
            alert("success")
          }
          data = qs.stringify(data)
          return data
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function(resp) {
        vm.$message({
          message: '添加成功',
          type: 'success'
        })
      })
    },
    onCancel() {
      this.$message({
        message: '返回中!',
        type: 'success'
      })
      this.$router.push('/advertisement')
    },
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.image = resData
      // eslint-disable-next-line no-implied-eval

      this.$message({
        message: '上传成功',
        type: 'success',
        duration: 2000
      })
    },
    close() {
      this.imagecropperShow = false
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
.avatar {
  width: 120px;
  height: 200px;
}
</style>

