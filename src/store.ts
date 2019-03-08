import Vue from 'vue'
import Vuex from 'vuex'
import { Dictionary } from 'vue-router/types/router';
import RootStore from './models/root-store';
import ClassInfo from './models/class-info';

Vue.use(Vuex)

export default new Vuex.Store({
  state: <RootStore>{
    classData: {
      /* No initial classes */
    }
  },
  mutations: {
    setClassInfo(state: RootStore, payload : {classKey: string, classInfo: ClassInfo}) {
      Vue.set(state.classData, payload.classKey, payload.classInfo);
    },

    setLoading(state: RootStore, payload : {classKey: string, loading: boolean}) {
      if (!state.classData.hasOwnProperty(payload.classKey)) {
        Vue.set(state.classData, payload.classKey, <ClassInfo>{});
      }

      if (!state.classData[payload.classKey].hasOwnProperty("loading")) {
        state.classData[payload.classKey] = { ...state.classData[payload.classKey], loading: payload.loading };
      } else {
        state.classData[payload.classKey].loading = payload.loading;
      }
    }
  },
  actions: {
    async update({ commit, store }, classKey) {
      console.log("Update with: " + classKey);
      // Update the class.
      let url = webpackHotUpdate
        ? "http://localhost:3000/tasks/"
        : "http://taskburner.kennethchristensen.me/api/tasks/";

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
      let data = state.classData[classKey];
      if (data === undefined) {
        data = <ClassInfo>{};
      }
      return data;
    }
  }
})
