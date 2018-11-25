import {globalValues} from './globals'

export default {
    properties: [
        {
            name: 'bottom',
            values: ['auto', ...globalValues], // length, percentage
        },
    ],
}