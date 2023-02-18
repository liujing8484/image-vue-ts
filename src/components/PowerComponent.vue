<script>

export default {
  name: "PowerComponent",
  props: {
    power: Object
  }
}
</script>

<template>
  <el-card class="card">
    <div class="container">
      <div class="border-radius">
        <el-icon size="20" color="#73767A">
          <TrendCharts/>
        </el-icon>
      </div>
      <div class="div-span">
        <div>
          <span class="big-text">{{ power.num }}</span>
          <span class="small-text span-n">N</span>
        </div>
        <div class="small-border">
          <span class="small-text font-color">{{ power.title }}</span>
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
  background: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid #409EFF;
  display: flex;
  justify-content: center;
  align-items: center;
}

.big-text {
  font-family: Consolas;
  font-size: 24px;
  font-weight: bold;
  color: #409EFF;
}

.span-n {
  margin-left: 5px;
}

.small-text {
  font-size: 10px;
  color: #73767A;
}

.div-span {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;
}

.small-border {
  background: #409EFF;
  width: 80px;
  height: 25px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.font-color {
  color: white;
}
</style>
