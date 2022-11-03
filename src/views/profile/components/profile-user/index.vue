<template>
  <div class="profile-user">
    <div class="top">
      <i class="iconfont icon-shezhi" style="margin-right: 10px"></i>
      <i class="iconfont icon-msg"></i>
    </div>
    <div class="middle">
      <img :src="user.avatar" />
      <div>
        <p>{{ user.nickName }}</p>
        <p>{{ user.phone }}</p>
      </div>
    </div>
    <div class="bottom">
      <div>
        <p>23</p>
        <p>我的关注</p>
      </div>
      <div>
        <p>66</p>
        <p>我的收藏</p>
      </div>
      <div>
        <p>8</p>
        <p>浏览记录</p>
      </div>
      <div>
        <p>0</p>
        <p>红包卡券</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.profile-user {
  height: 200px;
  padding: 0 16px;
  background: linear-gradient(to bottom, #00bfc0, #e4f3f3);
  font-size: 13px;
  color: white;
  .top {
    padding: 16px 0;
    color: @theme-white;
    text-align: right;
  }
  .middle {
    display: flex;
    align-items: center;
    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
  .bottom {
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    font-weight: 500;
  }
}
</style>
