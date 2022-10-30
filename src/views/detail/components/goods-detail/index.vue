<template>
  <div class="goods-detail">
    <div v-for="item in detailInfo.detailImage" :key="item.key">
      <div>
        <div class="tag" v-if="item.list && item.list.length > 0">
          <van-tag color="black" plain>{{item.key}}</van-tag>
        </div>
        <img :src="img" v-for="img in item.list" :key="img" width="100%"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default: () => ({}),
    }
  }
}
</script>

<style lang="less" scoped>
.tag {
  margin: 10px 0;
  text-align: center;
}
</style>
