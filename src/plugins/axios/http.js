import axios from 'axios';
import { Toast } from 'vant';
import store from '@/store';
import router from '@/router';

export default class {
  constructor(config) {
    // 创建axios实例
    this.axiosInstance = axios.create(config);

    // 拦截器
    this.requestInterceptor();
    this.responceInterceptor();
  };

  /** 请求拦截器 */
  requestInterceptor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        if(config.loading) {
          this.loading = Toast.loading({
            message: '加载中...',
            forbidClick: true, // 禁止点击
            duration: 0, //持续时间 0 为不自动关闭
          });
        }
        // 请求头添加token
        config.headers.Authorization = 'Bearer '+ store.state.token;
        // 结构页面提示是否加载
        this.isHideMessage = config.isHideMessage;
        return config;
      },
      (error) => Promise.reject(error),
    )
  };
  /** 响应拦截器 */
  responceInterceptor() {
    this.axiosInstance.interceptors.response.use(
      (response) => this.handleResponse(response.data),
      (error) => {
        console.log(error);
        return this.handleError(error.response);
      }
    )
  };
  /**  处理响应数据 */
  handleResponse({code, message, data}) {
    // 清除loading
    this.loading && this.loading.clear();

    if(code === 200) {
      // 提示信息
      // 双层三元表达式  结构页面提示是否加载
      return message ? ( !this.isHideMessage ? Toast.success(message): '' ): data;
    }

    if(code === 401 || code === 401) {
      // 跳转登录页
        router.replace('/login');
    };
    // 错误处理  提示错误信息
    Toast.fail(message);
    return Promise.reject(message)
  };
  /** 处理错误响应 */
  handleError( error) {
    this.loading && this.loading.clear();

    const status = error && error.status;
    let message = '';
    switch (status) {
      case 400:
        message = '请求错误';
        break;
      case 401:
        message = '未授权,请登录';
        // 跳转登录页
        router.replace('/login');
        break;
      case 403:
        message = '未授权,请登录';
        // 跳转登录页
        router.replace('/login');
        break;
      case 404:
        message = '请求地址出错';
        break;
      case 500:
        message = '服务器内部出错';
        break;
      default:
        message = '未知错误';
        break;
    }
    Toast.fail(message)
  }
  /** get请求 */
  get(url,config) {
    return this.axiosInstance.request({ method: 'GET', url, ...config});
  };
  /** post请求 */
  post(config) {
    return this.axiosInstance.request({ method: 'POST', ...config});
  };
  /** delete请求 */
  delete(config) {
    return this.axiosInstance.request({ method: 'DELETE', ...config});
  };
  /** patch请求 */
  patch(config) {
    return this.axiosInstance.request({ method: 'PATCH', ...config});
  };
  /** update请求 */
  update(config) {
    return this.axiosInstance.request({ method: 'UPDATE', ...config});
  }
}
