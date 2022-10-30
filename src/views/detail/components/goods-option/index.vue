<template>
  <van-cell-group>
    <van-cell is-link title="选择" title-class="title" value-class="value" value="颜色、款式" />
    <van-cell is-link title="配送" title-class="title" value-class="value" value="广东省 深圳市 南山区" />
    <van-cell is-link title="运费" title-class="title" value-class="value" value="此商品包邮" />
    <van-cell is-link title="说明" title-class="title" value-class="value" value="7天无理由退货·正品保障·顺丰包邮" />
  </van-cell-group>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.title {
  flex: 0;
  flex-basis: 50px;
}

.value {
  font-size: 12px;
  text-align: left;
}

.van-cell-group {
  border-radius: 8px;
  margin-top: 10px;
}

.van-cell:first-child {
  border-radius: 8px 8px 0 0;
}

.van-cell:last-child {
  border-radius: 0 0 8px 8px;
}
</style>
