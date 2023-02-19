<script lang="ts">
import {onMounted, reactive, toRefs, watchEffect} from "vue";
import {get_point_curve, get_point_towers, get_size} from "@/http/api";
import {Points_curve, Points_tower} from "@/types/site";

export default {
  name: "SiteSvgView",
  props: {selectIndex: Number},
  setup(props: any) {
    const state = reactive({
      size: {
        width: 0,
        height: 0,
        minY: 0
      },
      points_tower: new Points_tower(),
      points_curve: new Points_curve(),
    })
    onMounted(async () => {

      // 获取长宽
      const res_size = await get_size();
      state.size = res_size.data;

      // 通过api获取points_tower
      const res_tower = await get_point_towers();
      state.points_tower.list = res_tower.data;
      state.points_tower.list.forEach(v => {
        v.y = -v.y + state.size.height + state.size.minY;
      })

    })
    watchEffect(async ()=>{
      // 通过api获取points_curve
      const res_curve = await get_point_curve({index: props.selectIndex});
      state.points_curve.list = res_curve.data;
      // 对所有的point_curve进行操作(适应svg)
      state.points_curve.list.forEach(v => {
        let ys = JSON.parse(v.ys);
        let new_ys: number[] = [];
        ys.forEach((y: number) => {
          new_ys.push(-y + state.size.height + state.size.minY);
        })
        v.ys = JSON.stringify(new_ys);
      })
      // 对所有的point_curve进行改造(适应path)
      state.points_curve.list.forEach(v => {
        const xs = JSON.parse(v.xs);
        const ys = JSON.parse(v.ys);
        let str = ''
        for (let i = 0; i < xs.length; i++) {
          if (i === 0) {
            str += `M${xs[i]} ${ys[i]} `;
          } else {
            str += `L${xs[i]} ${ys[i]} `
          }
        }
        v.str = str;
      })
    })
    return {...toRefs(state)}
  }
}
</script>

<template>

  <svg :width="size.width" :height="size.height" class="svg">
    <!--铁塔-->
    <g v-for="(v,index) in points_tower.list" :key="index">
      <line :x1="v.x-20" :y1="v.y" :x2="v.x+20" :y2="v.y" class="line"/>
      <line :x1="v.x" :y1="v.y-20" :x2="v.x" :y2="v.y+50" class="line"/>
    </g>
    <!--引绳曲线-->
    <g v-for="(v,index) in points_curve.list" :key="index">
      <path :d="v.str" class="path" fill="none"/>
    </g>
  </svg>

</template>

<style scoped>
.svg {
  border: 1px solid #409EFF;
  /*background: #409EFF;*/
}

.line {
  stroke-width: 4;
  stroke: #409EFF;
}

.line:hover {
  stroke: red;
  cursor: pointer;
}

.path {
  stroke: #000;
  stroke-width: 2;
}

.path:hover {
  stroke: red;
  stroke-width: 4;
  cursor: pointer;
}
</style>
