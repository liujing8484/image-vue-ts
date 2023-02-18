<script lang="ts">
import {onMounted, ref} from "vue";
import {ContinueLineData, LineData} from "@/types/draw";
import {draw_continue_line, draw_line} from "@/utils/draw";

export default {
  name: "DirectionComponent",
  setup() {
    const canvas = ref()
    onMounted(() => {
      // console.log(canvas.value)
      canvas.value.width = 83;
      canvas.value.height = 25;
      const ctx = canvas.value.getContext('2d');
      // 绘制直线
      const line: LineData = {
        x1: 0,
        y1: 12.5,
        x2: 83 - 20,
        y2: 12.5,
        lineWidth: 5,
        color: "#409EFF"
      }
      draw_line(ctx, line);
      // 绘制三角型
      const conLine: ContinueLineData = {
        xs: [83, 83 - 25, 83 - 25, 83],
        ys: [12.5, 0, 25, 12.5],
        lineWidth: 2,
        color: "#409EFF",
        isFill: true
      }
      draw_continue_line(ctx, conLine);
    })
    return {canvas}
  }
}
</script>

<template>
  <el-card class="card">
    <div class="container">
      <div class="border-radius">
        <el-icon size="20" color="#73767A">
          <Guide/>
        </el-icon>
      </div>
      <div class="div-span">
        <canvas ref="canvas"></canvas>
        <div class="small-border">
          <span class="small-text font-color">牵引方向</span>
        </div>
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
  flex-direction: row;
}

.border-radius {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #409EFF;
  display: flex;
  justify-content: center;
  align-items: center;
}

.border-radius > span {
  font-size: 26px;
  font-family: Consolas;
  font-weight: bold;
  color: #73767A;
}

.div-span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
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
