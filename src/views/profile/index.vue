<template>
  <div class="profile">
    <profile-user :user="user" />
    <profile-menu />
    <profile-more />
  </div>
</template>

<script>
import { getUserInfo } from '@/api';
import ProfileUser from './components/profile-user';
import ProfileMenu from './components/profile-menu';
import ProfileMore from './components/profile-more';
export default {
  components: { ProfileUser, ProfileMenu, ProfileMore },
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const user = await getUserInfo();
      this.user = user;
    },
  },
};
</script>

<style lang="less" scoped></style>
