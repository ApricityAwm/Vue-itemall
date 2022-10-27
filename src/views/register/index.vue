<template>
  <div class="register">
    <nav-bar class="nav-bar">
      <template #center>
        <span>注册</span>
      </template>
    </nav-bar>
    <div class="from">
      <van-form>
        <van-field name="file" label="头像">
          <template #input>
            <van-uploader v-model="fileList" :max-count="1" :after-read="upload" @delete="deleteFile"/>
          </template>
        </van-field>
        <van-field v-model="userInfo.phone" name="phone" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="code" center clearable label="短信验证码" placeholder="请输入短信验证码">
          <template #button>
            <van-button size="mini" type="primary" color="#00bfc0" :disabled="disabled" @click="sendCode" style="min-width: 60px">
              {{ text || '发送验证码' }}
            </van-button>
          </template>
        </van-field>
        <van-field v-model="userInfo.password" name="password" label="密码" placeholder="请输入密码" />
        <van-field v-model="userInfo.nickName" name="nickName" label="昵称" placeholder="请输入用户昵称" />
        <van-field v-model="userInfo.email" name="email" label="邮箱" placeholder="请输入邮箱" />
        <van-field name="gander" label="性别">
          <template #input>
            <van-radio-group v-model="userInfo.gander" direction="horizontal">
              <van-radio name="1" shape="square" checked-color="#00bfc0">男</van-radio>
              <van-radio name="2" shape="square" checked-color="#00bfc0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" size="small" color="#00bfc0">注册</van-button>

          <div style="textAlign: center; fontSize: 12px; marginTop: 10px">
            <span>已有账号?去
              <router-link to="login">登录</router-link>
            </span>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { uploadAvatar, sendCode } from '@/api'
import NavBar from '@/components/nav-bar';

export default {
  data() {
    return {
      // 表单数据/用户信息
      userInfo: {
        password: '',
        email: '',
        phone: '',
        gander: '',
        nickName: '',
        avatar: '',
      },
      // 上传的图像文件
      fileList: [],
      // 用户输入的验证码
      code: '',
      // 获取的验证码
      vcode: '',
      text: '',
      disabled: false,
    }
  },
  components: { NavBar },
  methods: {
    /** 上传头像 */
    async upload({ file }) {
      const data = new FormData();
      data.set('file', file);
      const _ = await uploadAvatar(data);
      this.fileList = [_];
      this.userInfo.avatar = _.url
    },
    /** 删除上传的头像 */
    async deleteFile() {
      this.fileList = [];
      this.userInfo.avatar = '';
    },
    /** 发送短信验证码 */
    async sendCode() {
      // 校验
      const {code} = await sendCode({phone: this.userInfo.phone});
      this.vcode = code;
      this.disabled = true;
      Toast.success('发送成功');

      let time = 60;
      var timer = setInterval(() => {
        time--;
        if(time <= 0) {
          this.text = '';
          clearInterval(timer);
          this.disabled = false;
          return
        }
        this.text = `${time}s`
      }, 1000)

    }
  }
}
</script>

<style lang="less" scoped>
.register {
  height: 100vh;
  background: @theme-white;
  .from {
    height: calc(100vh - 44px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
