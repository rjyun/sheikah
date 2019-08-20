<template>
  <div>{{ operator }}</div>
</template>
<script>
export default {
  name: 'RadonOperator',
  props: {
    operator: [Array, Number],
    path: Object,
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/fonts.scss';
</style>
