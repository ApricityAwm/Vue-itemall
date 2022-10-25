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
    <div class="swipe">
      <van-swipe :autoplay="3000" class="van-swipe">
        <van-swipe-item v-for="banner in banners" :key="banner.image" class="van-swipe-item">
          <img v-lazy="banner.image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <recommend :recommends="recommends"/>
    <feature />
    <tabs :tabs="['最新', '流行', '精选']" @change="changeGoodsType"></tabs>
    <waterfall>
      <waterfall-item></waterfall-item>
      <waterfall-item></waterfall-item>
      <waterfall-item></waterfall-item>
    </waterfall>
    <div style="height: 1000px"></div>
  </div>
</template>

<script>
import { queryBanner,queryRecommend, queryGoods } from '@/api';
import NavBar from '@/components/nav-bar';
import Recommend from "@/components/recommend";
import Feature from "@/components/feature";
import Tabs from "@/components/tabs";
import Waterfall from '@/components/waterfall';
import WaterfallItem from '@/components/waterfall-item';

export default {
  components: { NavBar, Recommend, Feature, Tabs, Waterfall, WaterfallItem},
  data() {
    return {
      banners: [],  // 轮播图
      recommends: [], // 热门推荐
      type: 'new', // 商品类型
      goods: {
        new: { page: 1, leftList: [], rightList: []},
        pop: { page: 1, leftList: [], rightList: []},
        sell: { page: 1, leftList: [], rightList: []},
      }
    };
  },
  // 挂载完成后调用
  mounted() {
    this.queryBanner();
    this.queryRecommend();
    this.queryGoods('new')
    this.queryGoods('pop')
    this.queryGoods('sell')
  },
  methods: {
    /** 查询轮播数据 */
    async queryBanner() {
      this.banners = await queryBanner();
    },
    /** 查询热门数据 */
    async queryRecommend() {
      this.recommends = await queryRecommend();
    },
    /** 查询商品数据 */
    async queryGoods(type) {
      const data = await  queryGoods({type, page: this.goods[type].page})
      data.forEach((_, index) => {
        // data为数组 foreach循环 后根据索引下标index进行取余  0推入左数组  1推入右
        index % 2 === 0 ? this.goods[type].leftList.push(_) : this.goods[type].rightList.push(_)
      });
      // 页码数加一
      data.lenght >0 && this.goods[type].page++;
    },
    /** 切换商品类型 */
    changeGoodsType(index) {
       if(index === 0) this.type = 'new';
      if(index === 1) this.type = 'pop';
      if(index === 2) this.type = 'sell';
    }
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
.swipe {
  padding: 6px;
  .van-swipe,
  .van-swipe-item {
    border-radius: 8px;
      img {
        width: 100%;
        height: 185px;
        border-radius: 8px;
    }
  }
}

</style>
