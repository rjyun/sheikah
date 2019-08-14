import {
  OPERATOR_INFOS as RadonOperatorInfos,
  TYPESYSTEM as RadonTypeSystem,
  TYPES as RadonTypes,
} from '@/radon'
import { getOutput, isValidScript } from '@/radon/utils'
import { match, generateId } from '@/utils'

export default {
  state: {
    templates: {
      // fabada: {
      //   id: 'fabada',
      //   name: 'chicho',
      //   description: 'es redondo y bonito',
      //   radRequest: {
      //     not_before: 0,
      //     retrieve: [
      //       {
      //         url: '',
      //         kind: 'HTTP-GET',
      //         script: [0x45],
      //       },
      //     ],
      //     aggregate: {
      //       script: [0x50],
      //     },
      //     consensus: {
      //       script: [0x50],
      //     },
      //   },
      // },
    },
    currentTemplate: {},

  },
  mutations: {
    pushOperator (state, { path }) {
      if (path.stage === 'retrieve' && state.currentTemplate.radRequest.retrieve[path.retrieveIndex].script.length === 0) {
        state.currentTemplate.radRequest.retrieve[path.retrieveIndex].script.push(67)
      } else {
        const currentScript = Number.isInteger(parseInt(path.retrieveIndex))
          ? state.currentTemplate.radRequest[path.stage][path.retrieveIndex].script
          : state.currentTemplate.radRequest[path.stage].script
        const scriptTypes = currentScript.map(getOutput)
        if (scriptTypes[0] === 'Self') {
          console.log(`ERROR pushing a new operator in stage ${path.stage} in stageIndex ${path.retrieveIndex}`)
        } else {
        // TODO: check if first operator in aggregate phase is Self and then search the type in retrieval stage
          const cleanScriptTypes = scriptTypes.map((item, index, array) => {
            if (item === 'Self') {
              return array[index - 1]
            } else {
              return item
            }
          })

          const outputType = cleanScriptTypes[cleanScriptTypes.length - 1]
          const operatorsObject = RadonTypeSystem[RadonTypes[outputType]]
          const newOperatorCode = parseInt(Object.entries(operatorsObject)[0][0])
          const newOperatorInfo = RadonOperatorInfos[newOperatorCode]
          const numberOfOperatorArguments = newOperatorInfo.arguments.length

          if (numberOfOperatorArguments === 0) {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? state.currentTemplate.radRequest[path.stage][path.retrieveIndex].script.push(newOperatorCode)
              : state.currentTemplate.radRequest[path.stage].script.push(newOperatorCode)
          } else {
            Number.isInteger(parseInt(path.retrieveIndex))
              ? state.currentTemplate.radRequest[path.stage][path.retrieveIndex].script.push([newOperatorCode])
              : state.currentTemplate.radRequest[path.stage].script.push(newOperatorCode)
          }
        }
      }
    },
    updateRetrieveSource (state, { source, index }) {
      state.currentTemplate.radRequest.retrieve[index].url = source.url
      state.currentTemplate.radRequest.retrieve[index].kind = source.kind
    },
    deleteSource (state, { index }) {
      state.currentTemplate.radRequest.retrieve.splice(index, 1)
      state.currentTemplate.radRequest.retrieve.map(source => {
        if (index < source.index) {
          return source.index--
        }
      })
    },
    pushRetrieve (state) {
      state.currentTemplate.radRequest.retrieve.push({
        url: '',
        kind: 'HTTP-GET',
        script: [],
      })
    },
    updateArgumentInput (state, { path, input, operator, argIndex }) {
      operator[argIndex] = input
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    selectHashFunction: function (state, { path, hashFunctionCode, operator, argIndex }) {
      operator[argIndex] = hashFunctionCode
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = [...state.currentTemplate.radRequest[`${path.stage}`]]
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = { ...this[`${path.stage}`] }
      }
    },
    updateOperatorReduceArgument: function (state, { path, reduceArgument, operator, argIndex }) {
      operator[argIndex] = reduceArgument
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = [...state.currentTemplate.radRequest[`${path.stage}`]]
      } else {
        state.currentTemplate.radRequest[`${path.stage}`].script[path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = { ...state.currentTemplate.radRequest[`${path.stage}`] }
      }
    },
    updateFilterArgument: function (state, { path, filterArgument, operator, argIndex }) {
      operator[argIndex] = [operator[argIndex][0], filterArgument]
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = [...state.currentTemplate.radRequest[`${path.stage}`]]
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
        state.currentTemplate.radRequest[`${path.stage}`] = { ...state.currentTemplate.radRequest[`${path.stage}`] }
      }
    },
    updateOperatorFilterArgument: function (state, { path, filterFunctionCode, operator, argIndex }) {
      operator[argIndex] = [filterFunctionCode, '']
      if (Number.isInteger(parseInt(path.retrieveIndex))) {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex][path.scriptIndex] = operator
      } else {
        state.currentTemplate.radRequest[`${path.stage}`][path.scriptIndex] = operator
      }
    },
    updateOperatorCodeSelect: function (state, { path, operatorCode }) {
      let args = RadonOperatorInfos[operatorCode].arguments.map(argument => {
        return match(argument.kind, [
          {
            options: [
              RadonTypes.Boolean,
            ],
            result: true,
          },
          {
            options: [
              RadonTypes.Int,
            ],
            result: 0,
          },
          {
            options: [
              RadonTypes.Float,
            ],
            result: 0.0,
          },
          {
            options: [
              RadonTypes.String,
            ],
            result: '',
          },
          {
            options: [
              RadonTypes.Map,
              RadonTypes.Mixed,
              RadonTypes.Array,
              RadonTypes.Null,
              RadonTypes.Result,
              RadonTypes.Self,
              RadonTypes.MapFunction,
            ],
            result: [],
          },
          {
            options: [RadonTypes.FilterFunction],
            result: [0, 0],
          },
          {
            options: [RadonTypes.HashFunction],
            result: 0,
          },
          {
            options: [RadonTypes.ReduceFunction],
            result: 0,
          },
        ])
      })
      if (path.stage === 'retrieve') {
        state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!isValidScript('')) {
          state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script.splice(
            path.scriptIndex + 1,
            state.currentTemplate.radRequest[`${path.stage}`][path.retrieveIndex].script.length,
          )
        }
        state.currentTemplate.radRequest[`${path.stage}`] = { ...state.currentTemplate.radRequest[`${path.stage}`] }
      } else {
        state.currentTemplate.radRequest[`${path.stage}`].script[path.scriptIndex] = [
          parseInt(operatorCode),
          ...args,
        ]
        if (!isValidScript('')) {
          state.currentTemplate.radRequest[`${path.stage}`].script.splice(
            path.scriptIndex + 1,
            state.currentTemplate.radRequest[`${path.stage}`].script.length,
          )
        }
        state.currentTemplate.radRequest[`${path.stage}`] = { ...state.currentTemplate.radRequest[`${path.stage}`] }
      }
    },
    setTemplates: function (state, { templates }) {
      console.log('ttttttt', templates)
      if (templates) {
        state.templates = templates
        console.log('..............', state.templates)
      }
    },
    createTemplate: function (state) {
      console.log('----', Object.keys(state.templates).length)
      state.currentTemplate = {
        creationDate: Date.now(),
        id: generateId(),
        name: `Template ${Object.keys(state.templates).length + 1}`,
        description: '',
        radRequest: {
          not_before: 0,
          retrieve: [
            {
              url: '',
              kind: 'HTTP-GET',
              script: [0x45],
            },
          ],
          aggregate: {
            script: [0x50],
          },
          consensus: {
            script: [0x50],
          },
        },
      }
    },
    setCurrentTemplate: function (state, { id }) {
      console.log('id', id)
      console.log('templates--', state.templates)
      state.currentTemplate = state.templates[id]
    },
  },
  actions: {
    saveTemplate: async function (context, params) {
      console.log('Saving Template...')
      let templates = context.state.templates
      console.log('Context Templates ------->', context.state.templates)
      templates[context.state.currentTemplate.id] = context.state.currentTemplate
      console.log('Templatessss ------->', templates)
      const request = await this.$walletApi.saveItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
        value: templates,
        creationDate: Date.now(),
      })
      if (request.result) {
        console.log(request.result)
      } else {
        console.log(request)
      }
    },
    getTemplates: async function (context, params) {
      console.log('Getting Templates')
      const request = await this.$walletApi.getItem({
        walletId: context.rootState.wallet.walletId,
        sessionId: context.rootState.wallet.sessionId,
        key: 'templates',
      })
      if (request.result) {
        context.commit('setTemplates', { templates: request.result.value })
      } else {
        console.log(request)
      }
    },
    deleteTemplate: async function (context, { id }) {
      // delete context.state.templates[id]
      // context.state.templates = { ...context.state.templates }
      context.state.templates.$delete(id)
    },
  },
}
