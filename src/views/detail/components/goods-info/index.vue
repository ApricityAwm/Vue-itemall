<template>
  <div class="goods-info">
    <div class="top">
      <div class="price">￥{{ itemInfo.lowNowPrice }}</div>
      <div>
        <i class="iconfont icon-shoucang1"></i>
        <div class="collection">收藏</div>
      </div>
    </div>
    <div class="title">{{ itemInfo.title}}</div>
    <div>
      <van-tag  text-color="#00bfc0" color="#def6f4" size="medium">免费</van-tag>
      <van-tag  text-color="#00bfc0" color="#def6f4" size="medium" style="margin-left: 10px">包邮</van-tag>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemInfo: {
      typr: Object,
      default: () => ({}),
    }
  }
}
</script>

<style lang="less" scoped>
.goods-info {
  padding: 10px 12px;
  margin-bottom: 10px;
  background: @theme-white;
  border-radius: 8px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    .price {
      color: @theme-color;
      font-size: 18px;
      font-weight: 600;
    }
    .icon-shoucang1 {
      font-size: 24px;
    }
    .collection {
      font-size: 12px;
    }
  }
  .title {
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

}
</style>
