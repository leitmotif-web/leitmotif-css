import {globalValues} from './globals'

export default {
    properties: [
        {
            name: 'hanging-punctuation',
            values: ['none', 'first', 'last', 'force-end', 'allow-end', 'first force-end', 'first allow-end', 'first last', 'last force-end', 'last allow-end', 'first force-end last', 'first allow-end last', ...globalValues],
        },
        {
            name: 'hyphens',
            values: ['none', 'manual', 'auto', ...globalValues],
        },
        {
            name: 'letter-spacing',
            values: ['normal', ...globalValues], // integer, length
        },
        {
            name: 'line-break',
            values: ['auto', 'loose', 'normal', 'strict', ...globalValues],
        },
        {
            name: 'overflow-wrap',
            values: ['normal', 'break-word', ...globalValues],
        },
        {
            name: 'tab-size',
            values: [...globalValues], // integer, length
        },
        {
            name: 'text-align',
            values: ['auto', 'start', 'end', 'left', 'right', 'center', 'justify', 'justify-all', 'match-parent', ...globalValues],
            /** Character-based alignment in a table column
            text-align: ".";
            text-align: "." center;
             */
        },
        {
            name: 'text-align-last',
            values: ['auto', 'start', 'end', 'left', 'right', 'center', 'justify', ...globalValues],
        },
        {
            name: 'text-indent',
            values: ['each-line', 'hanging', 'hanging each-line', ...globalValues], // length, percentage, needs composability with length values
        },
        {
            name: 'text-justify',
            values: ['none', 'auto', 'inter-word', 'inter-character'],
        },
        {
            name: 'text-size-adjust',
            values: ['none', 'auto', ...globalValues], // percentage
        },
        {
            name: 'text-transform',
            values: ['capitalize', 'uppercase', 'lowercase', 'none', 'full-width'],
        },
        {
            name: 'white-space',
            values: ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line'],
        },
        {
            name: 'word-break',
            values: ['normal', 'break-all', 'keep-all', 'break-word'],
        },
        {
            name: 'word-spacing',
            values: ['normal', ...globalValues], // length, percentage
        },
    ],
}