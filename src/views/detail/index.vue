<template>
  <div></div>
</template>

<script>
import { queryGoodsDetail } from '@/api'
export default {
  mounted() {
    const { iid} = this.$route.query;
    this.queryGoodsDetail( iid );
  },
  methods: {
    /** 查询商品详情 */
   async queryGoodsDetail(iid) {
    const goodaDetail = await queryGoodsDetail(iid)
      console.log(goodaDetail);
   }
 }
}
</script>

<style lang="less" scoped>

</style>
