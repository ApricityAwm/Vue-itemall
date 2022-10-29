import Vue from 'vue';
import Vuex from 'vuex';

import { login, getUserInfo } from '@/api';
import router from '@/router';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tabBarHeight: 0,
    token: '',
  },
  getters: {},
  mutations: {
    // tabBar高度
    setTabBarHeight: (state, height) => (state.tabBarHeight = height), // 将tabBarHeight存在vuex中
    // token
    setToken: (state, token) => (state.token = token ),
    // 用户信息
    setUserInfo: (state, userInfo) => (state.userInfo = userInfo)
  },
  actions: {
    // ctx 上下文对象  paylaod 携带的一些参数
    /** 登录 */
    loginAction: async (ctx, payload) => {
      try {
        const { token } = await login(payload);
        ctx.commit('setToken', token);
        const userInfo = await getUserInfo();
        ctx.commit('setUserInfo', userInfo);
        router.replace('/');
      } catch (error) {
        console.log(error);
      }

    }
  },
  modules: {}
});
