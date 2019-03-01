<template>
  <div>
    <p>Week view {{ currentClass.classTitle }}</p>
    <ol>
      <li v-for="task in currentClass.tasks" :key="task.name">{{ task.name }}</li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapMutations } from "vuex";
import RootStore from "@/models/root-store";
import ClassInfo from "@/models/class-info";

@Component
export default class Weekview extends Vue {
  @Prop() private classKey!: string;

  constructor() {
    super();
    this.requestUpdate();
  }

  get currentClass() {
    return <ClassInfo>this.$store.getters.getClass(this.classKey);
  }

  @Watch("classKey")
  requestUpdate() {
    this.$store.dispatch("update", this.classKey);
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
