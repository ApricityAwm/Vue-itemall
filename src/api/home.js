import { http } from '@/plugins/axios';

/** 查询轮播图 */
export const queryBanner = () => {
  return http.get('/home/banner')
};

/** 查询热门数据 */
export const queryRecommend = () => {
  return http.get('/home/recommend')
};
