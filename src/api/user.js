import { http } from '@/plugins/axios'

/** 注册 */
export const register = (data) => {
  return http.post({ url: '/user/register',  data})
};

/** 登录 */
export const login = (data) => {
  return http.post({ url: '/user/login',  data})
};

/** 获取用户信息 */
export const getUserInfo = () => {
  return http.get('/user');
};
