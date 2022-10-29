<template>
  <div class="login">
    <nav-bar class="nav-bar">
      <template #left>
        <i class="iconfont icon-fanhui"></i>
      </template>
      <template #center>
        <span>登录</span>
      </template>
    </nav-bar>
    <div class="form">
      <van-form @submit="loginAction">
        <van-field v-model="userInfo.phone" name="phone" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="userInfo.password" name="password" label="密码" placeholder="请输入密码" />
        <div style="margin: 16px;">
          <van-button round block type="info" size="small" color="#00bfc0"  native-type="submit">登录</van-button>
          <div style="textAlign: center; fontSize: 12px; marginTop: 10px">
            <span>没有账号?去
              <router-link to="/register">注册</router-link>
            </span>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
import { mapActions } from 'vuex'

export default {
  components: { NavBar, },
  data() {
    return {
      // 表单数据/用户信息
      userInfo: {
        phone: '',
        password: '',
      },
    }
  },
  methods: {
    ...mapActions(['loginAction']),
  }
}

</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: @theme-white;
  .form {
    height: calc(100vh - 44px);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
