<template>
  <div class="waterfall">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.waterfall {
  display: flex;
  > * { // > * less语法 紧挨着的子元素
    flex: 1;
  }
}
</style>
