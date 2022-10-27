<template>
  <div class="category">
    <van-sticky>
      <nav-bar class="nav-bar" >
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
    </van-sticky>
    <div :style="{ height }" class="container">
      <i-menu class="menu" :menu="category" @change="queryCategorySub"/>
      <i-list class="list" :subCategory="subCategory" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { queryCategory, queryCategorySub } from '@/api'

import NavBar from '@/components/nav-bar';
import IMenu from '@/components/category-menu';
import IList from '@/components/category-list';

export default {
  components: { NavBar, IMenu, IList },
  computed: {
    /**  */
    ...mapState(['tabBarHeight']),
    height() {
      return `calc(100vh - ${this.tabBarHeight}px - 44px)`
    }
  },
  mounted() {
    this.queryCategory();
    this.queryCategorySub('3627');
  },
  data() {
    return {
      // 一级分类数据
      category: [],
      // 二级分类数据
      subCategory: [],
    };
  },
  methods: {
    /** 查询一级分类数据 */
    async queryCategory() {
      this.category = await queryCategory()
    },

    /** 查询二级分类数据 */
    async queryCategorySub(maitKey) {
      this.subCategory = await queryCategorySub(maitKey)
    },
  }
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
.container {
  display: flex;
  .menu {
    width: 100px;
  }
  .list {
    flex: 1;
  }
}
</style>
