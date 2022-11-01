import {http} from '@/plugins/axios'

/** 根据id查询商品 */
export const queryGoodsById = (id) => {
  return http.get(`/goods/${id}`);
};
