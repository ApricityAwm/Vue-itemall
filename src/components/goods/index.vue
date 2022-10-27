<template>
  <div class="goods">
    <img v-lazy="item.show.img" />
    <div class="title">{{item.title}}</div>
    <div class="conent">
      <span class="price">{{item.price | formatPrice}}</span>
      <span class="cfav">
        <i class="iconfont icon-shoucang1"></i>
        {{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props : {
    item: {
      type: Object,
      require: true
    }
  },
  filters: {
    formatPrice(price) {
      return '￥' + price.toFixed(2)
    }
  }
}
</script>

<style lang="less" scoped>
.goods {
  width: 100%;
  padding: 8px;
  text-align: center;
  img {
    width: 100%;
    border-radius: 6px;
  }
  .title {
    margin: 8px 0;
    padding: 0 4px;
    font-size: 14px;
    color: @theme-dark-grey;
    text-overflow: ellipsis;
    display: -webkit-box;  /** 对象作为伸缩盒子模型显示 */
    -webkit-box-orient: vertical;  /** 设置或检索伸缩盒子对象的子元素的排列方式 */
    -webkit-line-clamp: 2;  /** 显示的行数 */
    overflow: hidden;  /** 隐藏超出的内容 */
  }
  .conent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    .price {
      color: red;
      font-size: 14px;
    }
    .cfav {
      color: @theme-grey;
    }
  }
}
</style>
