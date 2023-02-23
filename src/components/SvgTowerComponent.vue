<script lang="ts">
import {onMounted, reactive, toRefs, watchEffect} from "vue";
import {Points_tower} from "../types/site";
import {PowerTowerInit} from "../types/power";
import {get_point_towers, get_power_tower} from "@/http/api";

export default {
  name: "SvgTowerComponent",
  props: {size: Object, selectIndex: Number},
  setup(props: any) {
    const state = reactive({
      points_tower: new Points_tower(),
      power_tower: new PowerTowerInit()
    })
    const filters_m = (v: number) => {
      return `高程：${Math.round(v)}m`
    }
    const filters_n = (v: number) => {
      return `${Math.round(v)}N`
    }
    onMounted(async () => {
      // 通过api获取points_tower
      const res_tower = await get_point_towers();
      state.points_tower.list = res_tower.data;
      state.points_tower.list.forEach(v => {
        v.y = -v.y + props.size.height + props.size.minY;
      })
    })
    watchEffect(async () => {
      // 将si数据赋值到point_tower中
      const res_power = await get_power_tower({index: props.selectIndex})
      const sis = JSON.parse(res_power.data.sis)
      for (let i = 0; i < state.points_tower.list.length; i++) {
        state.points_tower.list[i].si = sis[i];
      }
    })
    return {...toRefs(state), filters_m, filters_n}
  }
}
</script>

<template>
  <!--铁塔-->
  <g v-for="(v,index) in points_tower.list" :key="index">

    <!--绘制铁塔的部分-->
    <!--绘制直线塔部分-->
    <g v-if="v.tower.tStyle==='直线'">
      <line :x1="v.x-20" :y1="v.y" :x2="v.x+20" :y2="v.y" class="line"/>
      <line :x1="v.x" :y1="v.y-20" :x2="v.x" :y2="v.y+50" class="line"/>
    </g>
    <!--绘制耐张塔部分-->
    <g v-else-if="v.tower.tStyle==='耐张'">
      <line :x1="v.x" :y1="v.y" :x2="v.x+18" :y2="v.y+8" class="line"/>
      <line :x1="v.x" :y1="v.y" :x2="v.x-18" :y2="v.y+8" class="line"/>
      <line :x1="v.x" :y1="v.y-20" :x2="v.x" :y2="v.y+50" class="line"/>
    </g>
    <g v-else>
      <circle r="20" :cx="v.x" :cy="v.y+20" stroke="#409EFF" stroke-width="3" fill="none"/>
      <rect :x="v.x-20" :y="v.y+40" width="40" height="15" stroke="#409EFF" stroke-width="3" fill="none"/>
    </g>

    <!--绘制文字的部分-->
    <rect :x="v.x+20" :y="v.y-35" rx="3" ry="3" width="102" height="60" fill="#D8D8D8"/>
    <text :x="v.x+30" :y="v.y-15" class="text text-tower">{{ v.tower.tName }}</text>
    <text :x="v.x+30" :y="v.y" class="text text-type">{{ v.tower.tType }}</text>
    <text :x="v.x+30" :y="v.y+15" class="text text-altitude">{{ filters_m(v.tower.altitude) }}</text>

    <!--牵引力-->
    <rect :x="v.x+20" :y="v.y+30" rx="3" ry="3" width="59" height="22" fill="#409EFF"/>
    <text :x="v.x+25" :y="v.y+45" class="text text-white text-si">轴向张力</text>
    <text :x="v.x+85" :y="v.y+45" class="text text-si">{{ filters_n(v.si) }}</text>

  </g>
</template>

<style scoped>
.line {
  stroke-width: 4;
  stroke: #409EFF;
}

.line:hover {
  stroke: red;
  cursor: pointer;
}

.text {
  font-family: Consolas;
  font-size: 12px;
}

.text-tower {
  font-size: 14px;
  font-weight: bold;
  fill: #033B3D;
}

.text-type {
  color: #0D4A3A;
}

.text-altitude {
  fill: #2D5731;
}

.text-si {
  font-weight: bold;
}

.text-white {
  fill: white;
}
</style>
