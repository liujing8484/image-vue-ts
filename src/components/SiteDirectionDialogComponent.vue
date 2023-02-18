<template>
  <el-dialog width="400px" title="牵引方向" :show-close="false" class="demo-tabs">
    <!--header-->
    <template #header>
      <div style="overflow: auto">
        <div style="float: left">
          <span style="font-size: 18px;display: block">{{ site.title }}</span>
          <span style="font-size: 12px;color: #b1b3b8">{{ site.explain }}</span>
        </div>
        <!--更换-->
        <el-button style="float: right" text>
          <el-icon>
            <Switch/>
          </el-icon>
        </el-button>
      </div>
    </template>

    <!--牵张场位置-->
    <div style="display: flex;justify-content: space-between;align-self: center">
      <el-button>{{ site.tension }}</el-button>
      <div style="display:flex;align-items: center">
        <el-icon size="30" color="#337ecc">
          <Right/>
        </el-icon>
      </div>
      <el-button>{{ site.drag }}</el-button>
    </div>

    <!--footer-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="closed">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">

import {getCurrentInstance} from "vue";

export default {
  name: "SiteDirectionDialogComponent",
  props: {site: Object},
  setup() {
    const {proxy} = getCurrentInstance() as any;
    const closed = () => {
      proxy.$emit('emit', false)
    }
    return {closed}
  }
}
</script>

<style scoped>

</style>
