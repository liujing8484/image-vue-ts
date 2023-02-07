<template>
  <div>SmallSite</div>
  <canvas ref="canvas" style="background: gray"/>
</template>

<script lang="ts">
import {onMounted, reactive, ref} from "vue";
import {get_point_towers, get_size} from "@/http/api";
import {Points} from "@/types/site";
import {DrawTower} from "@/assets/ts/drawTower";


export default {
  name: "SmallSiteView",
  setup() {
    const data = reactive(new Points());
    const canvas = ref()
    onMounted(async () => {
      // 通过api获取points
      const res = await get_point_towers();
      data.list = res.data;

      // 通过api获取size
      const res_size = await get_size();
      data.size = res_size.data;

      // 对width和height进行操作
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      data.size.width = width > data.size.width ? width : data.size.width;
      data.size.height = height > data.size.height ? height : data.size.height;

      // 对所有的point进行操作
      // y = -y + height
      data.list.forEach(v => {
        v.y = -v.y + data.size.height + data.size.minY;
      })

      // 绘制曲线
      const ctx = canvas.value.getContext('2d');
      canvas.value.width = data.size.width;
      canvas.value.height = data.size.height;
      new DrawTower(ctx, data).draw();
    })
    return {
      data, canvas
    }
  }
}
</script>

<style scoped>

</style>
