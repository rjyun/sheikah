<template>
  <div class="radon-operator">
    <Select
      :value="selectedOption"
      @input="option => updateTemplate(selectedOption.id, option.value)"
      :options="operatorOptions"
      type="operator"
    />

    <div class="with-arguments" v-if="hasArguments">
      <div v-for="(argument, index) in selectedOperator.arguments" :key="argument.label + index">
        <div v-if="argument.markup_type === 'input'" class="input-container">
          <Input
            class="input-operator"
            :placeholder="argument.label"
            :value="argument.value"
            @input="value => updateTemplate(argument.id, value)"
          />
        </div>

        <div
          :style="{ display: 'flex', flexDirection: 'column' }"
          v-if="argument.markup_type === 'select'"
        >
          <p>{{ argument.label }}</p>
          <Select
            class="argument-options"
            :value="selectedArgument[index]"
            :options="argumentOptions[index]"
            type="operator"
          />
        </div>
        <div v-if="argument.markup_type === 'subscript'" class>
          Subscipts are not supported yet.
        </div>
      </div>
    </div>
    <div class="icon-container">
      <font-awesome-icon class="icon sort-down" icon="sort-down" />
    </div>
  </div>
</template>

<script>
import Select from '@/components/Select'
import Input from '@/components/Input'

export default {
  name: 'RadonOperator',
  props: {
    operator: {
      required: true,
    },
  },
  components: {
    Input,
    Select,
  },
  methods: {
    updateTemplate(id, value) {
      this.$store.commit('updateTemplate', { id, value })
    },
  },
  computed: {
    selectedOption() {
      return {
        id: this.operator.id,
        primaryText: this.operator.selected.label,
        value: this.operator.selected.label,
        secondaryText: Array.isArray(this.operator.selected.output_type)
          ? this.operator.selected.output_type[0]
          : this.operator.selected.output_type,
      }
    },
    hasArguments() {
      return !!this.selectedOperator.arguments.length
    },
    selectedOperator() {
      return this.operator.selected
    },

    selectedArgument: {
      get() {
        const selectedArg = this.hasArguments
          ? this.operator.selected.arguments.map(argument => {
              return {
                primaryText: argument.label,
                secondaryText: argument.output_type,
              }
            })
          : []
        return selectedArg
      },
      // eslint-disable-next-line
      set(inputValue) {
        // this.$store.commit('updateTemplate', {
        //   // add id and value
        // })
        return inputValue
      },
    },
    operatorOptions() {
      return this.operator.options.map(option => {
        return {
          primaryText: option.label,
          value: option.label,
          secondaryText: option.output_type,
        }
      })
    },
    argumentOptions() {
      return this.hasArguments
        ? this.operator.selected.arguments.map(argument => {
            return argument.options
              ? argument.options.map(option => {
                  return {
                    primaryText: option.label,
                    secondaryText: option.output_type,
                  }
                })
              : []
          })
        : []
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.radon-operator {
  border-radius: 5px;
  margin-bottom: 8px;
}
.with-arguments {
  background-color: $grey-0;
  padding: 8px;
}
.input-container {
  display: flex;
  justify-content: center;
  .input-operator {
    width: 90px;
    height: 30px;
  }
}
.icon-container {
  text-align: right;
  .icon {
    font-size: 25px;
    margin-right: 16px;
  }
}
</style>
