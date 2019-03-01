<template>
  <div class="class">
    <WeekView v-bind:classKey="classKey"/>
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import WeekView from '@/components/WeekView.vue' // @ is an alias to /src
import Router from '../router';


let store = {
  state: {
    classMap: {},
    selectedClass: ""
  },
  computed: {
    selectedClassItems() {
      let x =  ["Kenneth", "Loves", "Michelle"];
      x.push()
    }
  },
  setClass(className: string) {
    this.state.selectedClass = className;
  }

}

@Component({
  components: {
    WeekView
  }
})
export default class Class extends Vue {
  className: string = "";
  classData : object = store;
  classKey: string = "";

  mounted() {
    this.classKey = this.$route.params.className;
  }
}
</script>
