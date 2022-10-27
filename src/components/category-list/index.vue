<template>
  <div class="list">
    <div class="list-item" v-for="item in subCategory" :key="item.id">
      <img v-lazy="item.image" />
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    subCategory: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.list {
    background: @theme-white;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    text-align: center;
    overflow: scroll;
    font-size: 12px;
    line-height: 1.5;
  &-item {
    padding: 3px 0;
    width: calc(100% / 3);
    img {
      width: 50px;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
