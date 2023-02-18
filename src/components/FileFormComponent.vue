<script lang="ts">
import {reactive, toRefs} from "vue";

export default {
  name: "FileFormComponent",
  setup() {
    const state = reactive({
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      }
    })
    return {...toRefs(state)}
  }
}
</script>

<template>
  <el-dialog width="400px" :show-close="false" class="demo-tabs">
    <!--header-->
    <template #header>

      <!--标题-->
      <div style="overflow: auto">

        <!--左侧标题-->
        <div class="left-float">
          <span class="big-text">上传文件</span>
          <span class="small-text">包含区段信息的文件</span>
        </div>

        <!--下载模板文件-->
        <el-button class="right-float">
          下载模板文件
        </el-button>

      </div>
    </template>

    <el-form
        label-position="top"
        label-width="100px"
        :model="formLabelAlign"
        size="small"
        style="max-width: 460px"
    >
      <el-form-item label="工程名称">
        <el-input v-model="formLabelAlign.name"/>
      </el-form-item>
      <el-form-item label="区段名称">
        <el-input v-model="formLabelAlign.name"/>
      </el-form-item>
      <el-form-item label="区段描述">
        <el-input v-model="formLabelAlign.name" type="textarea"/>
      </el-form-item>
    </el-form>

    <!--footer-->
    <el-upload
        v-model:file-list="fileList"
        class="upload-demo"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :limit="3"
        :on-exceed="handleExceed"
    >
      <el-button type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">
          支持xlxs等文件
        </div>
      </template>
    </el-upload>
  </el-dialog>

</template>

<style scoped>
.big-text {
  font-size: 18px;
  display: block
}

.small-text {
  font-size: 12px;
  color: #b1b3b8
}

.left-float {
  float: left;
}

.right-float {
  float: right
}

.text-center {
  display: flex;
  justify-content: center;
}
</style>
