import { http } from "@/plugins/axios";


/** 查询一级分类菜单 */
export const queryCategory = () => {
  return http.get('/category');
}

/** 查询二级分类菜单 */
export const queryCategorySub = (maitKey) => {
  return http.get(`/category/${maitKey}`);
}
