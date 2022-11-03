import { http } from "@/plugins/axios";

/** 查询购物车 */
export const queryCarts = () => {
  return http.get('/cart');
};

/** 添加购物车 */
export const addCarts = (data) => {
  return http.post({url: '/cart', data});
};

/** 删除购物车内商品 */
export const deleteCarts = (data) => {
  return http.delete({url: '/cart', data, isHideMessage:  true});
}

/** 修改购物车内商品数量 */
export const updateCarts = (data) => {
  return http.patch({url: '/cart', data});
}
