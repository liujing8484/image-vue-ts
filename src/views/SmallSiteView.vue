<template>
  <div class="container">
    <canvas ref="canvas" class="canvas"/>
    <canvas ref="canvas_across" class="canvas"/>
    <canvas ref="canvas_curve" class="canvas"/>
  </div>
</template>

<script lang="ts">
import {onMounted, reactive, ref} from "vue";
import {get_point_across_max, get_point_curve, get_point_towers, get_size} from "@/http/api";
import {Points, Points_across, Points_curve} from "@/types/site";
import {DrawTower} from "@/assets/ts/drawTower";
import {DrawLine} from "@/assets/ts/drawLine";
import {DrawCurve} from "@/assets/ts/drawCurve";
import {DrawAcross} from "@/assets/ts/drawAcross";


export default {
  name: "SmallSiteView",
  props: {
    select_tower: Object
  },
  setup(props: any) {
    const data = reactive(new Points());
    const data_curve = reactive(new Points_curve())
    const data_across = reactive(new Points_across())
    const canvas = ref()
    const canvas_curve = ref()
    const canvas_across = ref()
    onMounted(async () => {
      // 通过api获取points
      const res = await get_point_towers();
      data.list = res.data;

      // 通过api获取size
      const res_size = await get_size();
      data.size = res_size.data;

      // 通过api获取points_curve
      const res_curve = await get_point_curve({index:7});
      data_curve.list = res_curve.data;

      // 通过api获取points_across
      const res_across = await get_point_across_max();
      data_across.list = res_across.data;

      // 对width和height进行操作
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      data.size.width = width > data.size.width ? width : data.size.width;
      data.size.height = height > data.size.height ? height : data.size.height;
      data.size.width += 150;
      data.size.height += 100;

      // 对所有的point进行操作
      // y = -y + height
      data.list.forEach(v => {
        v.y = -v.y + data.size.height + data.size.minY;
      })
      // 对所有的point_curve进行操作
      data_curve.list.forEach(v => {
        let ys = JSON.parse(v.ys);
        let new_ys: number[] = [];
        ys.forEach((y: number) => {
          const new_y = -y + data.size.height + data.size.minY;
          new_ys.push(new_y);
        })
        v.ys = JSON.stringify(new_ys);
      })
      // 对所有的point_across进行操作
      data_across.list.forEach(v => {
        v.y = -v.y + data.size.height + data.size.minY;
      })

      // 绘制铁塔和网格
      const ctx = canvas.value.getContext('2d');
      canvas.value.width = data.size.width;
      canvas.value.height = data.size.height;
      new DrawTower(ctx, data).draw();
      new DrawLine(ctx, data.size).draw();
      // 绘制控制点
      const ctx_across = canvas_across.value.getContext('2d');
      canvas_across.value.width = data.size.width;
      canvas_across.value.height = data.size.height;
      new DrawAcross(ctx_across, data_across).draw();

      // 绘制曲线
      const cxt_curve = canvas_curve.value.getContext('2d');
      canvas_curve.value.width = data.size.width;
      canvas_curve.value.height = data.size.height;
      new DrawCurve(cxt_curve, data_curve, 0).draw();
    })
    console.log(props.select_tower)
    return {
      data, canvas, canvas_curve, canvas_across
    }
  }
}
</script>

<style scoped>
.container {
  position: relative;
}

.canvas {
  /*background: red;*/
  position: absolute;
  left: 0;
  top: 0;
  /*float: left;*/
}
</style>
