<template>
  <div class="app-container">
    <el-form ref="form" :model="advertisement" label-width="120px">
      <el-form-item label="广告名称">
        <el-input v-model="advertisement.name" />
      </el-form-item>
      <!--      <el-form-item label="广告信息">-->
      <!--        <el-col :span="8">-->
      <!--          <el-input :rows="5" v-model="advertisement.advertisementInfo" type="textarea"/>-->
      <!--        </el-col>-->
      <!--      </el-form-item>-->
      <el-form-item label="广告类型">
        <el-select v-model="advertisement.typeId" placeholder="请选择">
          <el-option
            v-for="item in advertisementTypeList"
            :key="item.typeName"
            :label="item.typeName"
            :value="item.advertisementtypeId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="广告状态">
        <el-select v-model="advertisement.stateId" placeholder="请选择">
          <el-option v-for="item in stateList" :key="item.stateName" :label="item.stateName" :value="item.stateId" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">编辑</el-button>
        <el-button @click="onCancel()">取消</el-button>
      </el-form-item>
    </el-form>
        <pan-thumb :image="image"/>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
// import axios from "axios";
// import advertisement from "@/views/advertisement/index.vue";

export default {
  components: { ImageCropper, PanThumb },
  data() {
    return {
      imageBase64: null,
      imagecropperShow: false,
      imagecropperKey: 0,
      advertisement: {
        'advertisementId': 1,
        'name': '霸王别姬',
        'click': 1,
        'typeId': 4,
        'uploadTime': '2021-04-26T11:59:12.000+0000',
        'advertiserId': '1',
        'stateId': '1',
        'url': '/static/video/bwbj.mp4',
        'advertisementType': {
          'advertisementId': 1,
          'typeName': '广告'
        },
        'tUser': {
          'userId': 1,
          'userName': 'yourname',
          'userAge': 22,
          'userSex': '男',
          'password': '123456',
          'encryptedProblem': '123',
          'fanNum': 0,
          'userTel': '15566666626',
          'registerDate': '2021-04-17 15:17:10',
          'iconUrl': '/user/getIcon/icon1.png',
          'stateId': 1
        },
        'tstate': {
          'stateId': 4,
          'stateName': '已上架'
        }
      },
      // eslint-disable-next-line no-undef
      stateList: [{
        'stateId': '4',
        'stateName': '已上架'
      },
      {
        'stateId': '5',
        'stateName': '已下架'
      }],
      advertisementTypeList: [{
        'typeName': '服装',
        'advertisementtypeId': 1
      },
      {
        'typeName': '美食',
        'advertisementtypeId': 2
      },
      {
        'typeName': '乐器',
        'advertisementtypeId': 3
      }
      ],
      image: '',
      uploadUrl: 'http://localhost:8083/milimili/admin/editThumbnailImageUpload?videoId='
    }
  },
  created() {
    this.fetchDataById()
    this.fetchIconById()
  },
  methods: {
    fetchDataById() {
      var id = this.$route.params.id
      this.uploadUrl = this.uploadUrl + id
      var vm = this
      this.axios({
        method: 'GET',
        url: 'http://localhost:8083/milimili/advertisement/getAdById?id=' + id
      }).then(function(resp) {
        vm.advertisement = resp.data
      })
    },
    fetchIconById() {
      var id = this.$route.params.id
      var vm = this
      this.axios({
        method: 'POST',
        url: 'http://localhost:8083/milimili/advertisement/getAdIcon?id=' + id
      }).then(function(res) {
        vm.imageInfo = res.data
        vm.image = 'data:image/png;base64,' + vm.imageInfo.result
      })
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
      this.$router.push('/advertisement')
    },
    close() {
      this.imagecropperShow = false
    },
    onSubmit() {
      var vm = this
      this.axios({
        method: 'POST',
        data: vm.advertisement,
        url: 'http://localhost:8083/milimili/advertisement/editAd'
      }).then(function(resp) {
        if (resp != null) {
          vm.$message({
            message: '修改成功',
            type: 'success'
          })
          vm.$router.push('/advertisement')
        }
      })
    },
    onCancel() {
      this.$message({
        message: '返回中!',
        type: 'success'
      })
      this.$router.push('/advertisement')
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onloadend = () => {
        this.imageBase64 = reader.result
      }

      if (file) {
        reader.readAsDataURL(file)
      }
    },
    async uploadImage() {
      var vm = this
      if (!this.imageBase64) {
        alert('请先选择图片')
        return
      }

      try {
        const response = await axios.post('http://localhost:8083/milimili/advertisement/uploadeAdImage', {
          advertisement: vm.advertisement,  // advertisement类的其他属性可以在这里添加
          image: vm.imageBase64.split(',')[1]  // 只发送Base64编码的图片数据部分
        });

        console.log('上传成功:', response.data);
      } catch (error) {
        console.error('上传失败:', error);
      }
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

