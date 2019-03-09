<template>
  <div>
    <h2>Welcome, Kenneth!</h2>
    <p>Keep it up, you're doing great!</p>
    <ProgressPie classKey="english" link="/classes/english"></ProgressPie>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProgressPie from "@/components/ProgressPie.vue";
import Chart from "chart.js";

@Component({
  components: {
    ProgressPie
  }
})
export default class Dashboard extends Vue {
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
