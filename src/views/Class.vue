<template>
  <div class="class">
    <WeekView v-bind:classKey="classData"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import WeekView from '@/components/WeekView.vue' // @ is an alias to /src
import Dashboard from '@/components/Dashboard.vue' // @ is an alias to /src
import Router from '../router';


@Component({
  components: {
    WeekView,
  }
})
export default class Class extends Vue {
  classData : object = {
    classKey: ""
  }

  mounted() {
    this.classData.classKey = this.$route.params.className;
  }
}
</script>
