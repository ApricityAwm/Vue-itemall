import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabBarHeight: 0,
  },
  getters: {},
  mutations: {
    setTabBarHeight: (state, height) => (state.tabBarHeight = height), // 将tabBarHeight存在vuex中
  },
  actions: {},
  modules: {}
});
