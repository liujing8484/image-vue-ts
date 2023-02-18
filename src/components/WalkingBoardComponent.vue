<script lang="ts">
import {getCurrentInstance} from "vue";

export default {
  name: "WalkingBoardComponent",
  props: {
    tower: Object
  },
  setup() {
    const {proxy} = getCurrentInstance() as any;
    const left = () => {
      proxy.$emit('emit_walk', true);
    }
    const right = () => {
      proxy.$emit('emit_walk', false);
    }
    return {left, right}
  }
}
</script>

<template>
  <el-card class="card">
    <div class="container">
      <div class="top">
        <el-button text @click="left">
          <el-icon class="icon">
            <CaretLeft/>
          </el-icon>
        </el-button>
        <div class="center-div">
          <span>{{ tower.tName }}</span>
        </div>
        <el-button text @click="right">
          <el-icon class="icon">
            <CaretRight/>
          </el-icon>
        </el-button>
      </div>
      <div class="small-border">
        <span class="small-text font-color">走板位置</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>

.card {
  width: 200px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.icon {
  font-size: 30px;
}

.center-div {
  background: #D8D8D8;
  width: 50px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-div > span {
  font-family: Consolas;
  font-size: 12px;
  font-weight: bold;
  color: #409EFF;
}

.small-text {
  font-size: 10px;
  color: #73767A;
}

.small-border {
  background: #409EFF;
  width: 80px;
  height: 25px;
  border-radius: 4px;
  margin-top: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-color {
  color: white;
}
</style>
