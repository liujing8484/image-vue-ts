<script>
import {reactive, toRefs} from "vue";

export default {
  name: "FileTableDialogComponent",
  setup() {
    const state = reactive({
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        }],
      formInline: {
        user: '',
        region: '',
      }
    })
    return {...toRefs(state)}
  }
}
</script>

<template>
  <el-dialog :show-close="false" class="demo-tabs">
    <!--header-->
    <template #header>
      <!--标题-->
      <div style="overflow: auto">
        <!--左侧标题-->
        <div class="left-float">
          <span class="big-text">文件列表</span>
          <span class="small-text">记录所有区段信息的文件</span>
        </div>
      </div>
    </template>
<!--    <el-form :inline="true" :model="formInline" class="demo-form-inline">-->
<!--      <el-form-item label="区段名称">-->
<!--        <el-input v-model="formInline.user" placeholder="请输入区段名称"/>-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="primary">查询</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <el-table :data="tableData" style="width: 100%" border >
      <el-table-column prop="date" label="工程名称" width="120"/>
      <el-table-column prop="name" label="区段名称" width="100"/>
      <el-table-column prop="address" label="区段描述"/>
      <el-table-column fixed="right" label="操作" width="120">
        <template #default>
          <el-button link type="primary" size="small">删除</el-button>
          <el-button link type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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


</style>
