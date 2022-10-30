<template>
  <div class="detail">
    <nav-bar class="nav-bar" >
      <template #left>
        <i class="iconfont icon-fanhui" @click="back"></i>
      </template>
      <template #center>
      </template>
      <template #right>
        <i class="iconfont icon-zhuanfa"></i>
        <i class="iconfont icon-gengduo" style="margin-left: 5px"></i>
      </template>
    </nav-bar>
    <div v-if="isLoading">
      <van-swipe :autoplay="3000" @change="handelSwipeChange">
        <van-swipe-item class="van-swipe-item" v-for="image  in goodsDetail.itemInfo.topImages" :key="image">
          <img v-lazy="image" height="300" width="100%" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">{{ currentIndex + 1 }}/{{ goodsDetail.itemInfo.topImages .length}}</div>
        </template>
      </van-swipe>
      <div class="detail-content">
        <goods-info :itemInfo="goodsDetail.itemInfo" />
        <goods-option />
        <goods-shop :shopInfo="goodsDetail.shopInfo"/>
        <goods-detail :detailInfo="goodsDetail.detailInfo" />
      </div>
    </div>
  </div>
</template>

<script>
import { queryGoodsDetail } from '@/api';
import NavBar from '@/components/nav-bar';
import GoodsInfo from './components/goods-info';
import GoodsOption from './components/goods-option';
import GoodsShop from './components/goods-shop';
import GoodsDetail from './components/goods-detail';

export default {
  components: { NavBar, GoodsInfo, GoodsOption, GoodsShop, GoodsDetail, },
  mounted() {
    const { iid } = this.$route.query;  // 通过路由获取查询商品详情的参数
    this.queryGoodsDetail( iid );
  },
  data() {
    return {
      goodsDetail: {},
      currentIndex: 0,
      isLoading: false,
    }
  },
  methods: {
    /** 查询商品详情 */
    async queryGoodsDetail(iid) {
      const goodsDetail = await queryGoodsDetail(iid);
      // goodsDetail中的数据为JSON格式 需要用parse转一下，否则无法使用
      goodsDetail.columns = JSON.parse(goodsDetail.columns);
      goodsDetail.detailInfo = JSON.parse(goodsDetail.detailInfo);
      goodsDetail.itemInfo = JSON.parse(goodsDetail.itemInfo);
      goodsDetail.itemParams = JSON.parse(goodsDetail.itemParams);
      goodsDetail.shopInfo = JSON.parse(goodsDetail.shopInfo);
      this.goodsDetail = goodsDetail
      this.isLoading = true;
    },
    /** 改变轮播图指示器值 */
    handelSwipeChange( index ) {
      this.currentIndex = index;
    },
    /** 回反上一级 */
    back() {
      this.$router.back(1);
    }
  }
}
</script>

<style lang="less" scoped>
.nav-bar {
  position: fixed;
  z-index: 99;
  right: 0;
  .iconfont {
    padding: 6px;
    border-radius: 50%;
    color: @theme-white;
    background: rgba(0, 0, 0, 0.35);
    font-size: 12px;
  }
}
.van-swipe-item {
  font-size: 0;
}
.custom-indicator {
  position: absolute;
  right: 10px;
  bottom: 10px;
  padding: 2px 5px;
  border-radius: 10px;
  font-size: 12px;
  color: @theme-white;
  background: rgba(0, 0, 0, 0.35);
}
.detail-content {
  padding: 10px;
}
</style>
