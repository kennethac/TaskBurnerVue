<template>
  <div>
    <h3>Scheduled Tasks</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Completed</th>
          <th>Task</th>
          <th>Due Date</th>
          <th>Scheduled Date</th>
        </tr>
      </thead>
      <tbody class="upcoming-area">
        <template v-for="day in scheduledDays">
          <tr :key="day.first" class="day-header">
            <td colspan="4">
              <strong>{{ new Date(day.first).toDateString() }}</strong>
            </td>
          </tr>
          <tr v-for="task of day.group" :key="task.name">
            <td>{{ task.complete ? "Yes" : "No" }}</td>
            <td>{{ task.name }}</td>
            <td>{{ task.dueDate }}</td>
            <td>{{ task.scheduledDate }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { mapMutations } from "vuex";
import RootStore from "@/models/root-store";
import ClassInfo from "@/models/class-info";
import Task from "@/models/task";

function addDays(date: Date, days: number) {
  return new Date(date.valueOf() + days * 86400000);
}

function groupBy(list: Task[], selector: Function) {
  if (list.length == 0) {
    return [];
  }

  let result = [];

  var first = selector(list[0]);
  let group: Task[] = [];
  for (var i of list) {
    if (selector(i) == first) {
      group.push(i);
    } else {
      result.push({ first, group });
      group = [i];
      first = selector(i);
    }
  }

  if (group.length > 0) {
    result.push({ first, group });
  }

  return result;
}

@Component
export default class Weekview extends Vue {
  @Prop() private classKey!: object;
  myClassKey: object = this.classKey;

  constructor() {
    super();
  }

  // mounted() {
  //   console.log("Mounted: " + this.myClassKey.classKey);
  //   setTimeout(this.requestUpdate, 1);
  //   // this.requestUpdate();
  // }

  get currentClass() {
    this.$store.dispatch("update", this.myClassKey.classKey);
    return <ClassInfo>this.$store.getters.getClass(this.myClassKey.classKey);
  }

  get scheduledDays() {
    let classData = this.currentClass;
    if (classData === undefined || classData.tasks === undefined) {
      console.log("Class DATA");
      console.log(classData);
      return [];
    }

    console.log("Num tasks: " + classData.tasks.length);

    console.log("Dateline: " + addDays(new Date(), 7));
    let soon = classData.tasks.filter(
      t => new Date(t.scheduledDate) < addDays(new Date(), 7)
    );

    console.log("Num soon: " + soon.length);

    return groupBy(soon, (t: Task) => new Date(t.scheduledDate).valueOf());
  }

  // @Watch("myClassKey")
  // requestUpdate() {
  //   this.$store.dispatch("update", this.myClassKey.classKey);
  // }
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
