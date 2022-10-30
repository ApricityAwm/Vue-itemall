<template>
  <div class="detail">
    <nav-bar class="nav-bar" :style="{ background: scrollTop > swipeHeight ? '#0bbfc0' : '' }">
      <template #left>
        <i
          class="iconfont icon-fanhui"
          @click="back"
          :style="{
            background: scrollTop > swipeHeight ? '' : 'rgba(0, 0, 0, 0.35)',
          }"
        ></i>
      </template>
      <template #center>
        <div class="nav-bar-center" :style="{ display: scrollTop > swipeHeight ? 'flex' : 'none' }">
          <span
            :class="{
              active: scrollTop >= swipeHeight && scrollTop < goodsDetailOffsetTop,
            }"
            >商品</span
          >
          <span :class="{ active: scrollTop >= goodsDetailOffsetTop }">详情</span>
        </div>
      </template>
      <template #right>
        <i
          class="iconfont icon-zhuanfa"
          :style="{
            background: scrollTop > swipeHeight ? '' : 'rgba(0, 0, 0, 0.35)',
          }"
        ></i>
        <i
          class="iconfont icon-gengduo"
          style="margin-left: 5px"
          :style="{
            background: scrollTop > swipeHeight ? '' : 'rgba(0, 0, 0, 0.35)',
          }"
        ></i>
      </template>
    </nav-bar>
    <div v-if="isLoading">
      <van-swipe ref="swipeRef" :autoplay="3000" @change="handelSwipeChange">
        <van-swipe-item
          class="van-swipe-item"
          v-for="image in goodsDetail.itemInfo.topImages"
          :key="image"
        >
          <img v-lazy="image" height="300" width="100%" />
        </van-swipe-item>
        <template #indicator>
          <div class="custom-indicator">
            {{ currentIndex + 1 }}/{{ goodsDetail.itemInfo.topImages.length }}
          </div>
        </template>
      </van-swipe>
      <div class="detail-content">
        <goods-info :itemInfo="goodsDetail.itemInfo" />
        <goods-option />
        <goods-shop :shopInfo="goodsDetail.shopInfo" />
        <goods-detail :detailInfo="goodsDetail.detailInfo" ref="goodsDetailRef" />
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-button
          @click="show = !show"
          text="加入购物车"
          color="#0a0c19"
          class="btn"
        />
        <van-goods-action-button
          @click="show = !show"
          text="立即购买"
          color="#14c1bb"
          class="btn"
        />
      </van-goods-action>
      <van-sku
        v-model="show"
        :sku="sku"
        :goods="goods"
        :goods-id="1"
        @buy-clicked="handelBuy"
        @add-cart="handelAddCart"
      >
        <!-- 自定义 sku actions -->
        <template #sku-actions="props">
          <div class="van-sku-actions">
            <van-button
              square
              size="large"
              @click="props.skuEventBus.$emit('sku:addCart')"
              color="#0a0c19"
            >
              加入购物车
            </van-button>
            <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
            <van-button
              square
              size="large"
              @click="props.skuEventBus.$emit('sku:buy')"
              color="#14c1bb"
            >
              立即购买
            </van-button>
          </div>
        </template>
      </van-sku>
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
  components: { NavBar, GoodsInfo, GoodsOption, GoodsShop, GoodsDetail },
  data() {
    return {
      goodsDetail: {},
      currentIndex: 0,
      isLoading: false,
      swipeHeight: 0,
      goodsDetailOffsetTop: 0,
      scrollTop: 0,
      show: false,
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: true, // 是否无规格商品
        hide_stock: true, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: 'https://img01.yzcdn.cn/1.jpg',
      },
    };
  },
  mounted() {
    const { iid } = this.$route.query; // 通过路由获取查询商品详情的参数
    this.queryGoodsDetail(iid);
    this.scroll();
  },
  watch: {
    isLoading() {
      this.$nextTick(() => {
        this.swipeHeight = this.$refs.swipeRef.$el.offsetHeight;
        this.goodsDetailOffsetTop = this.$refs.goodsDetailRef.$el.offsetTop;
      });
    },
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
      this.goodsDetail = goodsDetail;
      this.isLoading = true;
    },
    /** 改变轮播图指示器值 */
    handelSwipeChange(index) {
      this.currentIndex = index;
    },
    /** 回反上一级 */
    back() {
      this.$router.back(1);
    },
    /**  */
    scroll() {
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      });
    },
    handelBuy(data) {
      console.log('立即购买', data);
    },
    handelAddCart(data) {
      console.log('加入购物车', data);
    },
  },
};
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
.nav-bar-center {
  display: flex;
  align-items: center;
  span {
    flex: 1;
    font-size: 12px;
    color: @theme-white;
    &::after {
      margin: 0 auto;
      content: '';
      display: block;
      width: 20%;
      height: 2px;
    }
  }
}
.active {
  &::after {
    background: @theme-white;
  }
}
.btn {
  height: 30px;
}
</style>
