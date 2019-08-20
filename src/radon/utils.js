import { generateId } from '@/utils'

export function RadonMarkupInterpreter() {
  return {
    validateScript: script => true,
    pushOperator: (template, stage, retrieveIndex) => radonToMarkup(),
    parseTemplate: template => radonToMarkup(),
  }
}

export function isValidScript() {
  return false
}

export function radonToMarkup() {
  const markup = [

    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asArray',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asBoolean',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asFloat',
          output_type: 'float',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asInteger',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asMap',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asString',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'hash',
          output_type: 'string',
        },
      ],
      selected: {
        hierarchical_type: 'operator_option',
        label: 'asString',
        output_type: 'string',
        arguments: [],
      },
      output_type: 'string',
    },
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'hash',
          output_type: 'string',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'length',
          output_type: 'int',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'match',
          output_type: 'generic',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'parseJson',
          output_type: 'bytes',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'parseXml',
          output_type: 'map',
          meta: {
            static_type: 'map<string, bytes>',
          },
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asBoolean',
          output_type: 'boolean',
          meta: {
            static_type: 'map<string, bytes>',
          },
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asInteger',
          output_type: 'integer',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'toLowerCase',
          output_type: 'string',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'toUpperCase',
          output_type: 'string',
          meta: {},
        },
      ],
      selected: {
        hierarchical_type: 'operator_option',
        label: 'parseJson',
        output_type: 'bytes',
        meta: {},
      },
    },
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asArray',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asBoolean',
          output_type: 'array',
          meta: {},
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asFloat',
          output_type: 'float',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asInteger',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asMap',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'asString',
          output_type: 'array',
        },
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'hash',
          output_type: 'string',
        },
      ],
      selected: {
        hierarchical_type: 'operator_option',
        label: 'asMap',
        output_type: 'map',
        arguments: [],
      },
      output_type: 'string',
    },
    {
      markup_type: 'select',
      hierarchical_type: 'operator',
      options: [
        {
          markup_type: 'option',
          hierarchical_type: 'operator_option',
          label: 'entries',
          output_type: 'array',
          meta: {
            static_type: 'array<array<bytes>>',
          },
        },
      ],
    },
  ]
  return {
    id: generateId(),
    radRequest: {
      not_before: 0,
      retrieve: [
        {
          url: '',
          kind: 'HTTP-GET',
          script: markup,
        },
      ],
      aggregate: {
        script: markup,
      },
      consensus: {
        script: markup,
      },
    },
  }
}
