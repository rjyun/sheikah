<template>
  <div v-if="transactions => 1" :class="`transaction ${border ? 'border' : ''}`">
    <div class="amount">
      <font-awesome-icon :class="`icon ${origin.toLowerCase()}`" :icon="arrowIcon" />
      <span :class="`number ${origin.toLowerCase()}`">{{ amount }}</span>
      <span class="wit">WIT</span>
    </div>

    <div class="address">
      <p class="origin">
        <span class="label">{{ origin }}</span> <span class="number">{{ address }}</span>
      </p>
    </div>

    <div class="">
      <p class="date">{{ date }}</p>
      <p class="block">Confirmed in block #{{ block }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  props: {
    address: String,
    amount: String,
    block: [String, Number],
    border: Boolean,
    date: String,
  },
  computed: {
    origin() {
      return this.amount.includes('+') ? 'From' : 'To'
    },
    arrowIcon() {
      return this.amount.includes('+') ? 'angle-right' : 'angle-left'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction {
  padding: 8px 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 24px;

  &.border {
    border-bottom: 1px solid lightgray;
  }

  .amount,
  .address {
    display: flex;
    align-items: center;
  }

  .amount {
    .icon {
      margin-right: 8px;
    }

    .number {
      font-size: 16px;
      font-weight: 500;
    }

    .from {
      color: $green;
    }

    .to {
      color: $red-3;
    }

    .wit {
      margin-left: 8px;
      color: $grey-5;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .address {
    .origin {
      font-size: 16px;
      color: $grey-5;
      font-weight: 600;

      .label {
        margin-right: 8px;
        font-weight: 600;
        color: $grey-3;
      }

      &.from {
        color: $green;
      }

      &.to {
        color: $red-3;
      }
    }

    .address-number {
      color: $grey-5;
      font-size: 16px;
    }
  }

  .date {
    color: $grey-5;
    font-size: 16px;
    font-weight: 600;
    text-align: right;
  }

  .block {
    color: $grey-5;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
