<template>
  <div class="cart">
    <div class="nav">
      <nav-bar class="nav-bar">
        <template #left>
          <i class="iconfont icon-fanhui"></i>
        </template>
        <template #center>购物车</template>
        <template #right>
          <span class="nav-bar-editor" @click="isEdit = !isEdit">{{
            isEdit ? '取消' : '编辑'
          }}</span>
        </template>
      </nav-bar>
    </div>
    <template v-if="carts.length > 0">
      <div class="cart-content">
        <van-checkbox-group v-model="selectIds">
          <template v-for="cart in carts">
            <div :key="cart.id" class="cart">
              <van-checkbox checked-color="#ff7500" icon-size="18px" :name="cart.id" />
              <div class="cart-item">
                <div class="title">
                  <span class="title-name">莱斯购自营</span>
                  <span class="title-other">免运费</span>
                </div>
                <div class="info">
                  <img class="info-left" :src="cart.goods.show.img" />
                  <div class="info-right">
                    <div class="info-right-title">{{ cart.goods.title }}</div>
                    <div class="price">
                      <div class="price-left">￥{{ cart.goods.price }}</div>
                      <div class="price-right">
                        <button class="btn" @click="handelDeCrement(cart.id, cart.num)">-</button>
                        <span>{{ cart.num }}</span>
                        <button class="btn" @click="handelInCrement(cart.id, cart.num)">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </van-checkbox-group>
      </div>
    </template>
    <template v-else>
      <van-empty description="购物车中空空如也" />
    </template>
    <van-submit-bar
      :price="total * 100"
      button-text="提交订单"
      label="总计"
      :style="{ bottom: tabBarHeight + 'px', ...style }"
      text-align="left"
    >
      <div class="checkAll">
        <van-checkbox v-model="checked" @click="checkedAll" checked-color="#ff6200"
          >全选</van-checkbox
        >
      </div>
      <template #button>
        <van-button
          color="linear-gradient(to right , #ff9500 ,#ff6200 )"
          round
          size="small"
          class="cart-btn"
          v-if="!isEdit"
          :disabled="selectIds.length === 0"
          @click="linkOrderDetail"
        >
          去结算
          <div class="btn-tag">{{ selectIds.length }}</div>
        </van-button>
        <van-button
          color="red"
          round
          size="small"
          class="cart-btn"
          v-else
          @click="deleteCarts"
          :disabled="selectIds.length === 0"
        >
          删除
          <div class="btn-tag">{{ selectIds.length }}</div>
        </van-button>
      </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { Dialog } from 'vant';
import { queryCarts, queryGoodsById, deleteCarts, updateCarts } from '@/api';
import NavBar from '@/components/nav-bar';
import { mapState } from 'vuex';
export default {
  components: { NavBar },
  data() {
    return {
      carts: [], // 用于保存查询到的购物车数据
      selectIds: [],
      checked: false, // 全选、反选
      isEdit: false, // 是否编辑
    };
  },
  mounted() {
    this.queryCarts();
  },
  computed: {
    ...mapState(['tabBarHeight']),
    /** 过滤出被选中状态的商品 */
    total() {
      return this.carts
        .filter((el) => this.selectIds.includes(el.id))
        .reduce((prev, el) => prev + el.num * el.goods.price, 0);
    },
    style() {
      return this.isEdit ? { '--is-hidden': 'hidden' } : { '--is-hidden': 'visible' };
    },
  },
  methods: {
    /** 查询购物车 */
    async queryCarts() {
      const carts = await queryCarts();
      for (const item of carts) {
        const goods = await queryGoodsById(item.gid);
        goods.show = JSON.parse(goods.show);
        item.goods = goods;
        this.goods = goods;
      }
      this.carts = carts;
    },
    /** 全选/反选 */
    checkedAll() {
      this.selectIds = this.checked ? this.carts.map((el) => el.id) : [];
    },
    /** 删除购物车内商品 */
    async deleteCarts(id) {
      await deleteCarts({ ids: id || this.selectIds });
      this.queryCarts();
      this.selectIds = [];
    },
    /** 商品数量减减 */
    async handelDeCrement(id, num) {
      if (num > 1) {
        await updateCarts({ id, num: --num });
        this.queryCarts();
        return;
      }
      // 提示弹窗
      Dialog.confirm({
        title: '提示',
        message: '确认删除该商品吗？',
      })
        .then(() => {
          this.deleteCarts([id]);
        })
        .catch(() => {
          // on cancel
        });
    },
    /** 商品数量加加 */
    async handelInCrement(id, num) {
      await updateCarts({ id, num: ++num });

      this.queryCarts();
    },
    /** 跳转至订单详情页 */
    linkOrderDetail() {
      // 过滤出购物车中被选中的商品  在通过map方法拿到num和id
      const info = this.carts
        .filter((el) => this.selectIds.includes(el.id))
        .map(({ num, goods }) => ({ num, gid: goods.id }));
      this.$router.replace({ name: 'order-detail', query: { info: info } });
    },
  },
  watch: {
    /** 监听单选的长度  参数1 val为新值*/
    selectIds(val) {
      this.checked = val.length === this.carts.length;
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
.cart-content {
  margin: 0 8px;
  margin-top: -80px;
  .cart {
    padding-left: 8px;
    display: flex;
    align-items: center;
    border-radius: 8px;
    background: white;
    .cart-item {
      flex: 1;
      .title {
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        &-name {
          font-weight: 600;
        }
        &-other {
          font-size: 12px;
          color: @theme-grey;
        }
      }
      .info {
        padding: 10px 16px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        &-left {
          width: 80px;
          height: 80px;
          border-radius: 8px;
        }
        &-right {
          margin-left: 16px;
          flex: 1;
          font-size: 14px;
          color: @theme-dark;
          &-title {
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
          .price {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            &-left {
              color: red;
              font-weight: 600;
            }
            &-right {
              span {
                box-sizing: inline-block;
                padding: 2px 16px;
                margin: 0 4px;
                border-radius: 4px;
                background: @theme-light-grey;
              }
              .btn {
                border: none;
                background: none;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
  }
}
.cart:not(:last-child) {
  margin-bottom: 10px;
}
.cart-btn {
  text-align: center;
  .btn-tag {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    color: #ff6e00;
    background: #ffe8d9;
    font-size: 13px;
    font-weight: 500;
  }
}
.checkAll {
  margin-right: 5px;
  font-size: 12px;
}
.van-submit-bar__text {
  visibility: var(--is-hidden);
}
</style>
