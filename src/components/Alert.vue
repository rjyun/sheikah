<template>
  <div v-if="message" class="alert" :class="[type, { closed }]">
    <div v-if="message" class="message">
      <p class="text">{{ message }}</p>
      <font-awesome-icon class="icon cross" icon="times" @click="close" />
    </div>
    <div v-if="description" class="description">
      <p class="text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Alert',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      validator: function(value) {
        return ['success', 'error', 'info', 'warning'].includes(value)
      },
    },
    description: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      closed: false,
    }
  },
  methods: {
    close() {
      this.closed = true
      this.$emit('close')
    },
  },
  computed: {
    ...mapState({
      clearError: state => {
        return state.wallet.clearError
      },
    }),
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.alert {
  width: 100%;
  padding: 8px 16px;
  transition: opacity 0.2s;
  border-radius: 4px;
  margin-bottom: 16px;

  .message {
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;

    .cross {
      color: #616161;
      font-size: 12px;
      cursor: pointer;
    }

    .text {
      font-size: 14px;
      font-weight: bold;
    }
  }

  .description {
    .text {
      font-size: 13px;
    }
  }

  &.closed {
    display: none;
  }

  &.error {
    background-color: $red-01;

    .text {
      color: $red-0;
    }
  }

  &.success {
    background-color: $green-01;

    .text {
      color: $green;
    }
  }

  &.info {
    background-color: $grey-0;

    .text {
      color: $grey-3;
    }
  }

  &.warning {
    background-color: $orange-01;

    .text {
      color: $orange;
    }
  }
}
</style>
