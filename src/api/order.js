import {http} from '@/plugins/axios'

/** 添加订单 */
export const addOrder = (data) => {
  return http.post({url: '/order', data});
};
/** 查询订单 */
export const queryOrder = (params) => {
  return http.get('/order', { params });
}
/** 支付订单 */
export const payOrder = (id) => {
  return http.post({url: `/order/pay/${id}`})
}
/** 取消订单 */
export const cancelOrder = (id) => {
  return http.post({url: `/order/cancel/${id}`})

}
/** 删除订单 */
export const delOrder = (id) => {
  return http.delete({url: `/order/${id}`})
}
/** 查询订单详情 */
export const queryOrderById = (id) => {
  return http.get(`/order/${id}`);
};

