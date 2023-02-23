<script lang="ts">
import {onMounted, reactive, toRefs} from "vue";
import {get_point_across_max} from "@/http/api";
import {Points_across} from "@/types/site";

export default {
  name: "SvgAcrossComponent",
  props: {size: Object},
  setup(props: any) {
    const state = reactive({
      points_across: new Points_across()
    })
    const filters_m = (v: number) => {
      return `${Math.round(v)}m`
    }
    onMounted(async () => {
      // 通过api获取points_across
      const res_across = await get_point_across_max();
      state.points_across.list = res_across.data;
      // 对所有的point_across进行操作
      state.points_across.list.forEach(v => {
        v.y = -v.y + props.size.height + props.size.minY;
      })
    })
    return {...toRefs(state), filters_m}
  }
}
</script>
<template>
  <g v-for="(v,index) in points_across.list" :key="index">
    <g v-if="index === 1">
      <circle :cx="v.x" :cy="v.y" r="12" stroke="red" stroke-width="2" fill="none"/>
      <text :x="v.x-5.5" :y="v.y+6" class="across-1">1</text>
    </g>
    <g v-else class="across-g">
      <circle :cx="v.x" :cy="v.y" r="8" stroke="blue" stroke-width="2" fill="none"/>
      <text :x="v.x-4" :y="v.y+4" class="across-2">2</text>
    </g>
    <text :x="v.x+15" :y="v.y-5" class="text-across">{{ v.across.acrossName }}</text>
    <text :x="v.x+15" :y="v.y+5" class="text-across-y">{{ filters_m(v.across.acrossY) }}</text>
  </g>
</template>

<style scoped>

.text-across {
  text-align: left;
  font-family: Consolas;
  font-size: 12px;
  color: #033B3D;
}

.text-across-y {
  text-align: left;
  font-family: Consolas;
  font-size: 10px;
  color: #2D5731;
}

.across-1 {
  font-size: 16px;
  font-weight: bold;
}

.across-2 {
  font-size: 12px;
  font-weight: bold;
}
</style>
