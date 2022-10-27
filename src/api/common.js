import { http } from "@/plugins/axios";

/** 上传头像 */
export const uploadAvatar = (data) => {
  return http.post({
    url: '/common/upload',
    data,
    header: {
      'Content-Type': 'multipart/form-data',
  }})
}
/** 发送短信验证码 */
export const sendCode = (data) => {
  return http.post({ url: '/common/send_code', data })
}
