/**手机号正则校验 */
export const phoneRule = [
  { required: true, message: '请输入手机号' }, // required 是否为必选字段
  { pattern:/^(?:(?:\+|00)86)?1[3-9]\d{9}$/, message: '请输入手机号' },
];

/** 密码正则 */
export const passwordRule = [
  { required: true, message: '请输入密码' },
  { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '请输入6-16位数字和字母组合的密码' },
];

/** 昵称 */
export const nickNameRule = [{ required: true, message: '请输入昵称' }];

/** 邮箱正则 */
export const emailRule = [
  { required: true, message: '请输入邮箱' },
  {
    pattern:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '请输入正确邮箱',
  },
];


