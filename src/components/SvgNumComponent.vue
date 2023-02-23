<script lang="ts">
import {reactive, toRefs, watchEffect} from "vue";

interface LineData {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

class LineInitData {
  list: LineData[] = []
}

export default {
  name: "SvgNumComponent",
  props: {size: Object},
  setup(props: any) {
    const state = reactive({
      horizontal_list: new LineInitData(),
      vertical_list: new LineInitData(),
      step: 50,
    })
    watchEffect(() => {
      // horizontal_line
      let n = 0;
      while (state.step * n < props.size.height) {
        const y = props.size.height - n * state.step;
        state.horizontal_list.list.push({
          x1: 0, y1: y, x2: props.size.width, y2: y,
        })
        n++;
      }
      // vertical_line
      n = 0;
      while (state.step * n < props.size.width) {
        const x = n * state.step;
        state.vertical_list.list.push({
          x1: x, y1: 0, x2: x, y2: props.size.height,
        })
        n++;
      }
    })
    return {...toRefs(state)}
  }
}
</script>

<template>
  <!--horizontal_line-->
  <g v-for="(v,index) in horizontal_list.list" :key="index">
    <line :x1="v.x1" :y1="v.y1" :x2="v.x2" :y2="v.y2" stroke="grey" stroke-width="0.5"/>
  </g>
  <!--vertical_line-->
  <g v-for="(v,index) in vertical_list.list" :key="index">
    <line :x1="v.x1" :y1="v.y1" :x2="v.x2" :y2="v.y2" stroke="grey" stroke-width="0.5"/>
  </g>
</template>

<style scoped>

</style>
