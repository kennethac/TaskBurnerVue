<template>
  <div>
    <p>Week view {{ myState.state.selectedClass }}</p>
  </div>
</template>

<script lang="ts">

import { Component, Prop, Vue } from "vue-property-decorator";
import { mapMutations } from 'vuex';

@Component
export default class Weekview extends Vue {
  @Prop() private classData!: object;
  myState: object;
  constructor() {
    super();
    this.myState = this.classData;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
:root {
  --primary-color: var(--orange);
  --accent-color: var(--red);
  --logo-font: "CharBB";
}
.primary-bg {
  background-color: var(--primary-color);
}

.chart-container {
  text-align: center;
  display: inline;
}

.medium-chart {
  width: 400px;
  height: 400px;
  position: relative;
}

.chart-area {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.chart-area a,
.chart-container {
  flex: 1 0 auto;
  min-width: 25vw;
  display: flex;
  justify-content: center;
  padding: 20px;
}

.flex-entry {
  display: flex;
  flex-flow: row nowrap;
}
</style>
