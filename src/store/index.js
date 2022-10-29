import Vue from 'vue';
import Vuex from 'vuex';

import { login, getUserInfo } from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabBarHeight: 0,
    token: '',
  },
  getters: {},
  mutations: {
    setTabBarHeight: (state, height) => (state.tabBarHeight = height), // 将tabBarHeight存在vuex中
    setToken: (state, token) => (state.token = token ),
  },
  actions: {
    // ctx 上下文对象  paylaod 携带的一些参数
    loginAction: async (ctx, payload) => {
      const { token } = await login(payload);
      ctx.commit('setToken', token);
      const res = await getUserInfo();
      console.log(res);
    }
  },
  modules: {}
});
