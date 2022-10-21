<template>
  <div class="tab-bar">
    <tab-bar-item  class="tab-bar-item" :class="{avtive: $route.name === menu.name}" v-for="menu in menus" :key="menu.text" @click.native="handleChangeMenu(menu.name)">
      <template #icon>
        <i :class="['iconfont', menu.icon]"></i>
      </template>
      <template #text>
        <span>{{menu.text}}</span>
      </template>
    </tab-bar-item>
  </div>
</template>

<script>
import TabBarItem from '../tab-bar-item'
export default {
  components: { TabBarItem },
  data() {
    return {
      menus: [
        {
          icon: 'icon-iconfonthome0',
          text: '首页',
          name: 'home'
        },
        {
          icon: 'icon-fenlei',
          text: '分类',
          name: 'category'
        },
        {
          icon: 'icon-shangcheng',
          text: '购物车',
          name: 'cart'
        },
        {
          icon: 'icon-user',
          text: '我的',
          name: 'profile'
        },
      ]
    }
  },
  methods: {
    handleChangeMenu(name) {
      if(this.$route.name !== name ) this.$router.replace({ name }); // 点击跳转路由

    }
  }
}
</script>

<style lang="less" scoped>
.tab-bar {
  padding: 8px 0;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  background-color: @theme-white;
  &-item {
    flex: 1;
    text-align: center;
  }
}
.avtive {
  color: @theme-color;
}
</style>
