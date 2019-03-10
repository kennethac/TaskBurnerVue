<template>
  <div class="new-task-container">
    <h4>Add Task</h4>
    <input v-model="newTaskName">
    <input type="date" v-model="newTaskDueDate" />
    <input type="date" v-model="newTaskScheduledDate" />
    <button @click="addTask">Add Task</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import Task from '@/models/task'

@Component
export default class AddTask extends Vue {
  @Prop() classKey!: string;
  newTaskName: string = "hey";
  newTaskDueDate: string | null = null;
  newTaskScheduledDate: string | null = null;

  addTask() {
    console.log(this.newTaskName + " " + this.newTaskDueDate);
    if (!this.inputValid) {
      return;
    }

    this.$store.commit("addTask", {
      classKey: this.classKey,
      task: new Task(this.newTaskName, new Date(this.newTaskDueDate!), new Date(this.newTaskScheduledDate!), false)
    });
    this.newTaskName = "";
    this.newTaskDueDate = null;
  }

  get inputValid() {
    return (
      this.newTaskDueDate != null &&
      this.newTaskName != null &&
      Date.parse(this.newTaskDueDate) != undefined &&
      this.newTaskName.trim().length > 0
    );
  }
  
  @Watch("newTaskDueDate")
  updateScheduledDate() {
      if (this.newTaskScheduledDate === null) {
          this.newTaskScheduledDate = this.newTaskDueDate;
      }
  }
}
</script>
