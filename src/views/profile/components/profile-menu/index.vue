<template>
  <div class="profile-menu">
    <div class="menu">
      <van-cell title="我的订单" is-link value="查看全部" class="profile-cell" />
      <div class="profile-item">
        <div>
          <i class="iconfont icon-qianbao"></i>
          <p>待付款</p>
        </div>
        <div>
          <i class="iconfont icon-daifahuo"></i>
          <p>待发货</p>
        </div>
        <div>
          <i class="iconfont icon-daishouhuo"></i>
          <p>待收货</p>
        </div>
        <div>
          <i class="iconfont icon-pingjia"></i>
          <p>待评价</p>
        </div>
        <div>
          <i class="iconfont icon-tuihuanhuo"></i>
          <p>退换货</p>
        </div>
      </div>
      <div class="num">{{}}</div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.profile-menu {
  margin: 0 8px;
  margin-top: -40px;
  .menu {
    height: 100px;
    padding-left: 8px;
    border-radius: 8px;
    background: white;
    font-size: 12px;
    .profile-cell {
      border-radius: 8px;
    }
    .profile-item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      text-align: center;
    }
  }
}
.num {
  width: 16px;
  height: 16px;
  border: 1px solid red;
  border-radius: 50%;
  position: fixed;
  left: 50px;
  top: 200px;
  background: white;
}
</style>
