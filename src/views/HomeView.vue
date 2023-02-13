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
        <el-menu-item index="5">
          <el-icon class="icon">
            <Platform/>
          </el-icon>
        </el-menu-item>
        <el-menu-item index="0">刘晶的架线作业图</el-menu-item>

        <div class="flex-grow"/>
        <!--分割线-->
        <el-divider direction="vertical" class="divider"/>
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
        <el-sub-menu index="1">
          <template #title>100%</template>
          <el-menu-item index="1-1">25%</el-menu-item>
          <el-menu-item index="1-2">50%</el-menu-item>
          <el-menu-item index="1-3">75%</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-header>

    <!--main-->
    <el-main>
      <el-scrollbar always class="scrollbar">
        <small-site-view/>
      </el-scrollbar>
    </el-main>
  </el-container>

  <el-dialog v-model="dialogFormVisible" title="设置" :show-close="false" class="demo-tabs">
    <!--tabs-->
    <el-tabs tab-position="left">
      <el-tab-pane label="导线引绳">
        <el-form
            label-position="right"
            label-width="100px"
            :model="formLabelAlign"
            style="max-width: 460px"
        >
          <el-form-item label="小引绳">
            <el-select v-model="value" class="m-2" placeholder="请选择您的引绳">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="大引绳">
            <el-select v-model="value" class="m-2" placeholder="请选择您的引绳">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="导线">
            <el-select v-model="value" class="m-2" placeholder="请选择您的导线">
              <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="牵引顺序">Config</el-tab-pane>
      <el-tab-pane label="颜色设置">Role</el-tab-pane>
    </el-tabs>

    <!--footer-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>


<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import SmallSiteView from "@/views/SmallSiteView.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    SmallSiteView
  },
  setup() {
    const dialogFormVisible = ref(false)
    const formLabelWidth = '140px'
    const value = ref('')
    const form = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
    })
    const formLabelAlign = reactive({
      name: '',
      region: '',
      type: '',
    })
    const options = [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
      {
        value: 'Option3',
        label: 'Option3',
      },
      {
        value: 'Option4',
        label: 'Option4',
      },
      {
        value: 'Option5',
        label: 'Option5',
      },
    ]

    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath);
      if (key == "2") {
        dialogFormVisible.value = true
      }
    }
    return {
      handleSelect,
      dialogFormVisible,
      formLabelWidth,
      form, formLabelAlign, options, value
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

</style>
