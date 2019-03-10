import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { Dictionary } from 'vue-router/types/router';
import RootStore from './models/root-store';
import ClassInfo from './models/class-info';
import Task from '@/models/task'

Vue.use(Vuex)

export default new Vuex.Store({
  state: <RootStore>{
    classData: {
      /* No initial classes */
    }
  },
  mutations: {
    setClassInfo(state: RootStore, payload: { classKey: string, classInfo: ClassInfo }) {
      console.log("Setting!");
      if (state.classData.hasOwnProperty(payload.classKey) && state.classData[payload.classKey].lastUpdated === payload.classInfo.lastUpdated) {
        console.log("Quitting");
        return;
      }
      else {
        console.log("Not quitting.");
        try {
          console.log(state.classData[payload.classKey].lastUpdated + " vs " + payload.classInfo.lastUpdated);
        } catch (error) {
          console.log(error);
        }
      }

      // Set all dates to be dates.
      for (let index in payload.classInfo.tasks) {
        console.log(index);
        payload.classInfo.tasks[index] = Task.from(payload.classInfo.tasks[index]);
      }

      Vue.set(state.classData, payload.classKey, payload.classInfo);
    },

    setLoading(state: RootStore, payload: { classKey: string, loading: boolean }) {
      if (!state.classData.hasOwnProperty(payload.classKey)) {
        Vue.set(state.classData, payload.classKey, <ClassInfo>{});
      }

      if (!state.classData[payload.classKey].hasOwnProperty("loading")) {
        state.classData[payload.classKey] = { ...state.classData[payload.classKey], loading: payload.loading };
      } else {
        state.classData[payload.classKey].loading = payload.loading;
      }
    },

    addTask(state: RootStore, payload: { classKey: string, task: Task }) {
      console.log(payload);
      state.classData[payload.classKey].tasks.splice(0, 0, payload.task);
    }
  },
  actions: {
    async update({ commit }, classKey) {
      console.log("Update with: " + classKey);
      let url = process.env.VUE_APP_TASKS_ENDPOINT;

      commit("setLoading", {
        classKey, loading: true
      });

      var response = await fetch(url + classKey);

      if (!response.ok) {
        // Handle error.
        console.error("Failed fetch!");
      }

      var result = await response.json();

      commit('setClassInfo', {
        classKey, classInfo: result
      });

      commit("setLoading", {
        classKey, loading: false
      });
    }
  },
  // This is "computed" for Vuex Store.
  getters: {
    // This is how you can make a getter that accepts an argument *and* is reactive. :)
    example: (state) => (exampleId: string) => {
      return 0;
    },
    getClass: (state: RootStore) => (classKey: string) => {
      if (classKey === "all") {
        console.log("All tasks.");
        let data = <ClassInfo>{};
        data.name = "All Tasks";
        data.loading = false;
        data.tasks = [];
        let allProjects = state.classData;
        Object.keys(allProjects).map((k) => allProjects[k]).forEach((next) => data.tasks = data.tasks.concat(next.tasks));
        return data;
      }

      let data = state.classData[classKey];
      if (data === undefined) {
        data = <ClassInfo>{};
      }
      return data;
    }
  }
})
