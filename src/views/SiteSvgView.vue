<script lang="ts">
import {onMounted, reactive, toRefs, watchEffect} from "vue";
import {get_point_curve, get_point_towers, get_power_tower, get_size} from "@/http/api";
import {Points_across, Points_curve, Points_tower} from "@/types/site";
import {PowerTowerInit} from "@/types/power";
import SvgTowerComponent from "@/components/SvgTowerComponent.vue"
import SvgNumComponent from "@/components/SvgNumComponent.vue"
import SvgAcrossComponent from "@/components/SvgAcrossComponent.vue"

export default {
  name: "SiteSvgView",
  props: {selectIndex: Number},
  components: {
    SvgTowerComponent, SvgNumComponent, SvgAcrossComponent
  },
  setup(props: any) {
    const state = reactive({
      size: {
        width: 0,
        height: 0,
        minY: 0
      },
      points_tower: new Points_tower(),
      points_curve: new Points_curve(),
      points_across: new Points_across(),
      power_tower: new PowerTowerInit()
    })
    const filters_m = (v: number) => {
      return `${Math.round(v)}m`
    }
    const filters_n = (v: number) => {
      return `${Math.round(v)}N`
    }
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


      // 通过api获取powers_tower
      // const res_pt = await get_powers_tower();
      // state.power_tower.list = res_pt.data;
    })
    watchEffect(async () => {
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

  <svg :width="size.width" :height="size.height" class="svg">
    <!--横线和竖线-->
    <svg-num-component :size="size"/>
    <!--铁塔-->
    <svg-tower-component :selectIndex="selectIndex" :size="size"/>
    <!--控制点-->
    <svg-across-component :size="size"/>
    <!--引绳曲线-->
    <g v-for="(v,index) in points_curve.list" :key="index">
      <path :d="v.str" class="path-small" v-if="index>=selectIndex" fill="none"/>
      <path :d="v.str" class="path-big" v-else fill="none"/>
    </g>
  </svg>

</template>

<style scoped>
.svg {
  /*border: 1px solid #409EFF;*/
  /*background: #409EFF;*/
}

.path-small {
  stroke-width: 2;
  stroke: #000;
}

.path-big {
  stroke-width: 4;
  stroke: #409EFF;
}

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
