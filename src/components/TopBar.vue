<template>
  <div class="top-bar">
    <router-link v-for="tab in tabs" :key="tab.link" class="link" :to="tab.link">{{
      tab.name
    }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    tabs: Array,
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.top-bar {
  border-bottom: 1px solid $grey-0;
  display: flex;
  flex-flow: row wrap;
  height: 64px;
  justify-content: flex-start;
  padding-left: 24px;

  .link {
    color: $grey-1;
    font-weight: bold;
    height: 64px;
    line-height: 25px;
    padding: 16px 24px;
    text-decoration: none;

    &.router-link-active {
      border-bottom: 2px solid $blue-6;
      color: $blue-6;
    }
  }
}
</style>
