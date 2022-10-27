<template>
  <div class="tab">
    <div v-for="(tab, index) in tabs" :class="{active: activeIndex === index}" :key="tab" class="tab-item" @click="handleSwitchTab(index)">{{tab}}</div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      activeIndex : 0,
    }
  },
  methods: {
    handleSwitchTab(index) {
      this.$emit('change', index);
      this.activeIndex = index;
    }
  }
}
</script>

<style lang="less" scoped>
.tab {
  height: 40px;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: @theme-white;
  font-size: 14px;
  color: @theme-dark-grey;
  &-item {
    flex: 1;
    position: relative;
    &::after {
      position: absolute;
      transition: width 0.3s;
      width: 0;
      content: '';
      display: block;
      height: 2px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 2px;
      margin-top: 5px;
    }
  }
}
.active {
  color: @theme-color;
  font-weight: 600;
  &::after {
    width: 25%;
    background: @theme-color;
  }
}

</style>
