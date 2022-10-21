<template>
  <div>
    <nav-bar class="nav-bar">
      <template #left>
        <i class="iconfont icon-saoma"></i>
      </template>
      <template #center>
        <div class="nav-bar-seach">
          <i class="iconfont icon-iconseach"></i>
          <span>搜索</span>
        </div>
      </template>
      <template #right>
        <i class="iconfont icon-msg"></i>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar'
export default {
  components: { NavBar, }
}
</script>

<style lang="less" scoped>
.nav-bar {
  background-color: @theme-white;
  &-seach {
    height: 26px;
    padding-left: 14px;
    display: flex;
    align-items: center;
    border-radius: 13px;
    text-align: left;
    background-color: @theme-light-grey;
    font-size: 12px;
    color: @theme-grey;
    .icon-iconseach {
      margin-right: 4px;
      font-size: 14px;
    }
    .icon-saoma,
    .icon-msg {
      color: @theme-dark;
    }
  }
}

</style>
