<template>
  <div>
    <van-sticky>
      <nav-bar class="nav-bar" :class="[scrollTop > recommendsTop ? 'nav-bar-color': 'nav-bar-white']">
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

    <div class="swipe">
      <van-swipe :autoplay="3000" class="van-swipe">
        <van-swipe-item v-for="banner in banners" :key="banner.image" class="van-swipe-item">
          <img v-lazy="banner.image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <recommend :recommends="recommends" ref="recommendsRef"/>
    <feature />
    <van-sticky :offset-top="44" @change="(isFixed) => (isShow = isFixed)">
      <tabs :tabs="['最新', '流行', '精选']" @change="changeGoodsType"></tabs>
    </van-sticky>
    <waterfall>
      <waterfall-item>
        <goods v-for="item in goods[type].leftList" :key="item.id" :item="item" />
      </waterfall-item>
      <waterfall-item>
        <goods v-for="item in goods[type].rightList" :key="item.id" :item="item" />
      </waterfall-item>
    </waterfall>
    <div class="loading">
      <van-loading ref="loadingRef" type="spinner" size="24px" color="#00bfc0" vertical>加载中...</van-loading>
    </div>
    <back-top v-show="isShow" @click.native="backTop" />
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
import Goods from '@/components/goods';
import BackTop from '@/components/back-top';

export default {
  components: { NavBar, Recommend, Feature, Tabs, Waterfall, WaterfallItem, Goods, BackTop },
  data() {
    return {
      banners: [],  // 轮播图
      recommends: [], // 热门推荐
      type: 'new', // 商品类型
      goods: {
        new: { page: 1, leftList: [], rightList: []},
        pop: { page: 1, leftList: [], rightList: []},
        sell: { page: 1, leftList: [], rightList: []},
      },
      // 是否加载
      isLoad: false,
      // 滚动高度
      scrollTop: 0,
      isShow: false,
      recommendsTop: 0,
    };
  },
  // 挂载完成后调用
  mounted() {
    this.queryBanner();
    this.queryRecommend();

    this.queryGoods('new');
    this.queryGoods('pop');
    this.queryGoods('sell');

    this.loadMore();
    this.scroll();
    this.recommendsTop = this.$refs.recommendsRef.$el.offsetTop;
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
      this.isLoad = false;  // 第一次加载数据时不执行 等加载后在执行
      const data = await  queryGoods({type, page: this.goods[type].page})
      data.forEach((_, index) => {
        _.show = JSON.parse(_.show);
        // data为数组 foreach循环 后根据索引下标index进行取余  0推入左数组  1推入右
        index % 2 === 0 ? this.goods[type].leftList.push(_) : this.goods[type].rightList.push(_)
      });
      // 页码数加一
      data.length >0 && this.goods[type].page++;
      this.isLoad = true;
    },
    /** 切换商品类型 */
    changeGoodsType(index) {
      if(index === 0) this.type = 'new';
      if(index === 1) this.type = 'pop';
      if(index === 2) this.type = 'sell';
    },
    /** 滚动加载数据 */
    loadMore() {
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        if(entry.isIntersecting && this.isLoad) {
          this.queryGoods(this.type)
        }
      });
      intersectionObserver.observe(this.$refs.loadingRef);
    },
    /** 滚动监听 */
    scroll() {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop;
      });
    },
    /** 滚动返回顶部 */
    backTop() {
      // 缓慢滚动至顶部 scrollIntoView 专用于滚动到开始位置或结束位置的API
      document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
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
  }
}
.nav-bar-white {
  background-color: @theme-white;
  .icon-saoma,
  .icon-msg {
    color: @theme-dark;
  }
}
.nav-bar-color {
  background-color: @theme-color;
  .icon-saoma,
  .icon-msg {
    color: @theme-white;
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
