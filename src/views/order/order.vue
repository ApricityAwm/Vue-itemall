<template>
  <div class="order">
    <van-sticky>
      <nav-bar class="nav-bar">
        <template #left>
          <i class="iconfont icon-fanhui" @click="back"></i>
        </template>
        <template #center>订单列表</template>
        <template #right>
          <i class="iconfont icon-gengduo"></i>
        </template>
      </nav-bar>
    </van-sticky>
    <van-tabs v-model="status" sticky offset-top="44" animated color="#00bfc0" @change="queryOrder">
      <template v-for="tab in tabs">
        <van-tab :title="tab" :key="tab">
          <template v-for="order in orders">
            <div :key="order.id" class="order-item" @click="handelLinkOrderDetail(order.id)">
              <template v-for="orderDesc in order.desc">
                <van-card
                  :key="orderDesc.id"
                  :num="orderDesc.num"
                  :price="orderDesc.price.toFixed(2)"
                  :desc="orderDesc.title"
                  :thumb="orderDesc.img"
                />
              </template>
              <div class="order-bar">
                <van-button
                  v-if="status === 0"
                  color="#00bfc0"
                  size="mini"
                  round
                  plain
                  hairline
                  @click.stop="payOrder(order.id)"
                  >去支付</van-button
                >
                <van-button
                  v-if="status === 0"
                  color="blue"
                  size="mini"
                  round
                  plain
                  hairline
                  @click.stop="cancelOrder(order.id)"
                  >取消</van-button
                >
                <van-button
                  v-if="status === 1 || status === 2"
                  color="red"
                  size="mini"
                  round
                  plain
                  hairline
                  @click.stop="delOrder(order.id)"
                  >删除</van-button
                >
              </div>
            </div>
          </template>
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script>
import { queryOrder, payOrder, cancelOrder, delOrder } from '@/api';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data() {
    return {
      status: 0,
      tabs: ['待付款', '已完成', '取消'],
      orders: [],
    };
  },
  mounted() {
    this.queryOrder();
    this.status = this.$route.query.status || 0;
  },
  methods: {
    /** 返回 */
    back() {
      this.$router.replace({ name: 'cart' });
    },
    /** 查询订单 */
    async queryOrder() {
      this.orders = await queryOrder({ status: this.status });
    },
    /** 支付订单 */
    async payOrder(id) {
      await payOrder(id);
      this.status = 1;
      await this.queryOrder();
    },
    /** 取消订单 */
    async cancelOrder(id) {
      await cancelOrder(id);
      this.status = 2;
      await this.queryOrder();
    },
    /** 删除订单 */
    async delOrder(id) {
      await delOrder(id);
      await this.queryOrder();
    },
    /** 跳转至相关订单详情 */
    async handelLinkOrderDetail(id) {
      this.$router.push({ name: 'order-detail', query: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.nav {
  &-bar {
    background: @theme-color;
    color: @theme-white;
    &-editor {
      font-size: 14px;
    }
  }
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100px;
    background: @theme-color;
  }
}
.order-item {
  padding: 10px 0;
  background: #fafafa;
}
.order-item:not(:last-child) {
  margin-bottom: 10px;
}
.order-bar {
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
}
</style>
