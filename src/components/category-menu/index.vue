<template>
  <div class="menu">
    <div class="menu-item" v-for="item in menu" :key="item.id" @click="handleChangeMenu(item.maitKey)">
      <span :class="[item.maitKey === maitKey ? 'active' : '']" >{{item.title}}</span>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    menu: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      maitKey: '3627',
    }
  },
  methods: {
    handleChangeMenu(maitKey) {
      this.maitKey = maitKey
      this.$emit('change', maitKey)
    }
  }
}
</script>

<style lang="less" scoped>
.menu {
  background: @theme-white;
  height: 100%;
  overflow: scroll;
  &-item {
    height: 40px;
    text-align: center;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      display: inline-block;
      width: 80px;
      padding: 4px 5px;
      margin: 0 5px;
      border-radius: 24px;
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
}
.active {
  background: @theme-color;
  color: @theme-white;
}
</style>
