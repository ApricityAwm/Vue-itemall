import { http } from '@/plugins/axios';

/** 查询轮播图 */
export const queryBanner = () => {
  return http.get('/home/banner')
};

/** 查询热门数据 */
export const queryRecommend = () => {
  return http.get('/home/recommend')
};

/** 查询商品详情 */
export const queryGoodsDetail = (iid) => {
  return http.get(`/goods/detail/${iid}`);
};

/** 根据id查询商品 */
export const queryGoodsById = (id) => {
  return http.get(`/goods/${id}`);
};
