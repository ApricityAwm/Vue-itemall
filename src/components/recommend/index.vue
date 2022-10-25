<template>
  <div class="recommend">
    <div v-for="recommend in recommends" :key="recommend.id" class="recommend-item">
      <img :src="recommend.image" />
      <div>{{recommend.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default: () => [],
  }
  }
}
</script>

<style lang="less" scoped>
.recommend {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: @theme-grey;
  line-height: 25px;
  &-item {
    flex: 1;
    text-align: center;
    img {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      text-align: center;
    }
  }
}
</style>
