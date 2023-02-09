<template>
  <div class="home">
    <small-site-view/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import SmallSiteView from "@/views/SmallSiteView.vue";

export default defineComponent({
  name: 'HomeView',
  components: {
    SmallSiteView
  }
});
</script>
