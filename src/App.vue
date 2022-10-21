<template>
  <div id="app">
    <div :style="{marginBottom: tabBarHeight + 'px'}">
      <router-view></router-view>
    </div>
    <tab-bar ref="tabBarRef"/>
  </div>
</template>

<script>
import { mapState, mapMutations} from 'vuex'
import TabBar from '@/components/tab-bar'

export default {
  components: { TabBar, },
  /** 生命周期--挂在完成后需获取或完成的事 */
  mounted() {
    // 原生标签：this.$refs.tabBarRef    组件标签：this.$refs.tabBarRef.$el  $refs父组件访问子组件的方式之一
    this.setTabBarHeight(this.$refs.tabBarRef.$el.offsetHeight)  //this.$refs.tabBarRef.$el获取组件标签 .offsetHeight获取组件标签高度
    //this.setTabBarHeight通过vuex将获取到的tabBarHeight传入vuex中 并更新
  },
  computed: {
    /**  */
    ...mapState(['tabBarHeight'])
  },
  methods: {
    ...mapMutations(['setTabBarHeight'])
  }
}
</script>


