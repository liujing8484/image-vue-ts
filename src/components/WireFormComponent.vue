<template>
  <!--导线及引绳
    show-close:false 取消关闭按钮
    -->
  <el-dialog width="400px" title="导线及引绳" :show-close="false" class="demo-tabs">

    <!--tabs-->
    <el-form
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
    >
      <el-form-item label="小引绳" class="form-item">
        <el-select v-model="value" class="m-2" placeholder="请选择您的引绳">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-color-picker v-model="color" show-alpha/>
      </el-form-item>
      <el-form-item label="大引绳" class="form-item">
        <el-select v-model="value" class="m-2" placeholder="请选择您的引绳">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-color-picker v-model="color" show-alpha/>
      </el-form-item>
      <el-form-item label="导线" class="form-item">
        <el-select v-model="value" class="m-2" placeholder="请选择您的导线">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <el-color-picker v-model="color" show-alpha/>
      </el-form-item>
    </el-form>


    <!--footer-->
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="closed">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import {getCurrentInstance, reactive, toRefs} from "vue";

export default {
  name: "WireFormComponent",
  setup() {
    const data = reactive({
      value: '',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelAlign: {
        name: '',
        region: '',
        type: '',
      },
      options: [
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
      ],
      color: 'rgba(19, 206, 102, 0.8)'
    })
    const {proxy} = getCurrentInstance();
    const closed = () => {
      proxy.$emit('emit', false);
    }
    return {
      ...toRefs(data),
      closed
    }

  }
}
</script>

<style scoped>

</style>
