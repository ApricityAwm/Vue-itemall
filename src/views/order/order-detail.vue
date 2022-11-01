<template>
  <div class="order-detail">
    <div class="nav">
      <nav-bar class="nav-bar">
        <template #left>
          <i class="iconfont icon-fanhui" @click="back"></i>
        </template>
        <template #center>订单详情</template>
        <template #right>
          <i class="iconfont icon-gengduo"></i>
        </template>
      </nav-bar>
    </div>
    <div class="orderdetail-content">
      <van-contact-card
        type="edit"
        class="content-card"
        :name="currentContact.name"
        :tel="currentContact.tel"
      />
      <div class="detail">
        <template v-if="goodsList.length > 0">
          <template v-for="item in goodsList">
            <van-card
              :key="item.id"
              :num="item.num"
              :price="item.price.toFixed(2)"
              :desc="item.title"
              :thumb="item.show.img"
            />
          </template>
        </template>
        <template v-else>
          <template v-for="item in order.desc">
            <van-card
              :key="item.id"
              :num="item.num"
              :price="item.price.toFixed(2)"
              :desc="item.title"
              :thumb="item.img"
            />
          </template>
        </template>

        <div class="total">实付金额：{{ order.totalPrice.toFixed(2) || total }}</div>
      </div>
    </div>
    <div class="submit-bar">
      <van-button size="small" round class="btn">联系客服</van-button>
      <van-button size="small" round class="btn" color="#00bfc0" plain @click="addOrder"
        >添加订单</van-button
      >
    </div>
  </div>
</template>

<script>
import { queryGoodsById, addOrder, queryOrderById } from '@/api';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data() {
    return {
      info: [],
      goodsList: [],
      order: {},
      currentContact: {
        name: '张三',
        tel: '13000000000',
      },
    };
  },
  mounted() {
    const { info, id } = this.$route.query;
    if (info) {
      this.info = JSON.parse(info);
    }
    if (id) {
      this.queryOrderById(id);
    }

    this.queryGoods();
  },
  computed: {
    total() {
      return '￥' + this.goodsList.reduce((prev, el) => prev + el.num * el.price, 0);
    },
  },
  methods: {
    /*返回 */
    back() {
      this.$router.replace({ name: 'cart' });
    },
    /** 查询商品 */
    async queryGoods() {
      for (const item of this.info) {
        const goods = await queryGoodsById(item.gid);
        goods.show = JSON.parse(goods.show);
        goods.num = item.num;
        this.goodsList.push(goods);
      }
    },
    /** 添加订单 */
    async addOrder() {
      await addOrder({ address: '西安市雁塔区网星软件', info: this.info });
      this.$router.replace({ name: 'order' });
    },
    /** 根据订单id查询 */
    async queryOrderById(id) {
      this.order = await queryOrderById(id);
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
.orderdetail-content {
  margin: 0 8px;
  margin-top: -60px;
  .content-card {
    height: 90px;
    border-radius: 8px;
  }
  .detail {
    margin-top: 16px;
    padding-top: 10px;
    border-radius: 8px;
    background: #fafafa;
    .total {
      padding: 16px;
      text-align: right;
      font-size: 14px;
      font-weight: 600;
    }
  }
}
.submit-bar {
  width: 100%;
  height: 45px;
  position: fixed;
  bottom: 0;
  background: @theme-white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .btn {
    margin-right: 5px;
  }
}
</style>
