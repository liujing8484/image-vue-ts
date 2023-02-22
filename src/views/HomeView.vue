<template>
  <el-container>

    <!--header-->
    <el-header class="header">
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          :ellipsis="false"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleSelect"
      >
        <!--工程-->
        <el-menu-item index="5">
          <el-icon class="icon">
            <Platform/>
          </el-icon>
        </el-menu-item>
        <el-menu-item index="0">刘晶的架线作业图</el-menu-item>

        <div class="flex-grow"/>
        <!--分割线-->
        <el-divider direction="vertical" class="divider"/>
        <!--图片-->
        <el-menu-item index="4">
          <el-icon class="icon">
            <PictureFilled/>
          </el-icon>
        </el-menu-item>
        <!--设置-->
        <el-menu-item index="2">
          <el-icon class="icon">
            <Operation/>
          </el-icon>
        </el-menu-item>
        <!--计算-->
        <el-menu-item index="3">
          <el-icon class="icon">
            <VideoPlay/>
          </el-icon>
        </el-menu-item>
        <!--分割线-->
        <el-divider direction="vertical" class="divider"/>
        <!--100%-->
        <el-sub-menu index="7">
          <template #title>
            <el-icon class="icon">
              <SetUp/>
            </el-icon>
          </template>
          <el-menu-item index="7-1">大牵张</el-menu-item>
          <el-menu-item index="7-2">小牵张</el-menu-item>
        </el-sub-menu>
        <!--设置-->
        <el-sub-menu index="1">
          <template #title>100%</template>
          <el-menu-item index="1-1">25%</el-menu-item>
          <el-menu-item index="1-2">50%</el-menu-item>
          <el-menu-item index="1-3">75%</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>

    <!--main-->
    <el-main class="main">
      <el-scrollbar always class="scrollbar">
        <!--        <small-site-view :select_tower="data_tower.select_tower"/>-->
        <site-svg-view :selectIndex="selectIndex"/>
      </el-scrollbar>
      <power-component :power="si_power" class="si_power"/>
      <power-component :power="ti_power" class="ti_power"/>
      <direction-component class="direction"/>
      <walking-board-component :selectTower="selectTower" @emit_walk="emit_walk" class="walking-board"/>
    </el-main>

  </el-container>
  <!--导线参数-->
  <wire-form-component v-model="dialogFormVisible" @emit="emit"/>
  <!--牵引方向-->
  <site-direction-dialog-component v-model="directionFromVisible"
                                   :site="site"
                                   @emit="emit"/>
  <!--打开文件-->
  <file-form-component v-model="fileFormVisible"/>
</template>


<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue';
// import SmallSiteView from "@/views/SmallSiteView.vue";
import SiteDirectionDialogComponent from "@/components/SiteDirectionDialogComponent.vue";
import WireFormComponent from "@/components/WireFormComponent.vue";
import FileFormComponent from "@/components/FileFormComponent.vue"
import PowerComponent from "@/components/PowerComponent.vue"
import DirectionComponent from "@/components/DirectionComponent.vue"
import WalkingBoardComponent from "@/components/WalkingBoardComponent.vue"
import SiteSvgView from "@/views/SiteSvgView.vue"
import {get_towers} from '@/http/api';
import {towers} from "@/types/home";

export default defineComponent({
  name: 'HomeView',
  components: {
    DirectionComponent,
    FileFormComponent,
    // SmallSiteView,
    WireFormComponent,
    SiteDirectionDialogComponent,
    PowerComponent,
    WalkingBoardComponent,
    SiteSvgView
  },
  setup() {
    const state = reactive({
      dialogFormVisible: false,
      directionFromVisible: false,
      fileFormVisible: false,
      formLabelWidth: '140px',
      selectIndex: 0,
      towers: new towers(),
      selectTower: {
        id: 0,
        tName: "s",
        tType: "string",
        tStyle: "string",
        corner: "string",
        altitude: 1000.0,
        remark: "string"
      },
      site: {
        title: '小牵张',
        explain: '主要用于展放引绳',
        tension: 'N7176',
        drag: 'N7176'
      },
      si_power: {
        title: '牵引力',
        num: 18000
      },
      ti_power: {
        title: '张力整定值',
        num: 2000
      }
    })
    onMounted(async () => {
      const res = await get_towers();
      state.towers.list = res.data;
      state.selectTower = state.towers.list[state.selectIndex]
    })
    const handleSelect = (key: string) => {
      if (key == "2") {
        state.dialogFormVisible = true
      } else if (key == "7-1") {
        state.directionFromVisible = true
      } else if (key == "5") {
        state.fileFormVisible = true
      }
    }
    const emit = (value: boolean) => {
      state.dialogFormVisible = value;
      state.directionFromVisible = value;
    }
    const emit_walk = (value: boolean) => {
      if (value) {
        if (state.selectIndex > 0) {
          state.selectIndex--;
        }
      } else {
        if (state.selectIndex < state.towers.list.length - 1) {
          state.selectIndex++;
        }
      }
      if (state.selectIndex >= 0 && state.selectIndex < state.towers.list.length) {
        state.selectTower = state.towers.list[state.selectIndex]
      }
    }
    return {
      ...toRefs(state),
      handleSelect,
      emit, emit_walk
    }
  }
});
</script>

<style scoped>

.header {
  height: 35px;
}

.scrollbar {
  height: calc(100vh - 80px);
  width: calc(100vw - 45px);
}

.flex-grow {
  flex-grow: 1;
}


.main {
  position: relative;
}

.el-menu-demo {
  height: 35px;
}

.icon {
  width: 18px;
  height: 18px;
  margin: 0;
}

.divider {
  height: 19px;
  margin: 6px 8px;
}

.si_power {
  position: absolute;
  top: 20px;
  left: 20px;
}

.ti_power {
  position: absolute;
  top: 20px;
  left: 240px;
}

.direction {
  position: absolute;
  top: 120px;
  left: 20px;
}

.walking-board {
  position: absolute;
  top: 120px;
  left: 240px;
}
</style>
