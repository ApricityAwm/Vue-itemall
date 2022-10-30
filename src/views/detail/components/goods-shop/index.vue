<template>
  <div class="goods-shop">
    <img :src="shopInfo.shopLogo" />
    <div class="name">{{ shopInfo.name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    shopInfo: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>

<style lang="less" scoped>
.goods-shop {
  padding: 16px;
  border-radius: 8px;
  margin-top: 10px;
  display: flex;
  align-items: center;
  background: @theme-white;
  img {
    width: 60px;
    height: 60px;
    border-radius: 8px;
  }
  .name {
    margin-left: 10px;
    font-size: 14px;
    font-weight: 700;
  }
}
</style>
