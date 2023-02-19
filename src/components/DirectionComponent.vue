<script lang="ts">

export default {
  name: "DirectionComponent",
  setup() {
    return {}
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
        <svg height="25px" width="83px" class="svg">
          <line x1="0" y1="12.5" x2="63" y2="12.5" class="svg-line"/>
          <path d="M83 12.5 L58 0 L58 25 Z" class="svg-path"/>
        </svg>
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

.svg-line {
  stroke: #409EFF;
  stroke-width: 5;
}

.svg:hover {
  transform: rotate(-180deg);
  transform-origin: 50% 50%;
}

.svg-path {
  fill: #409EFF;
}

</style>
