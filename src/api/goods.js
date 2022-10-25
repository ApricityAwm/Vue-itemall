import { http } from "@/plugins/axios";

// get ? query  axios中使用params对象传参
//  post axios中body中  放data中取
/** 查询商品数据 */
export const queryGoods = (params) => {
  return http.get('/goods', {params})
}
