import * as R from 'ramda'

const {uniq} = R

const propifyString = value =>
    value
        .replace(/[\s\-]([a-z])/g, value => value.toUpperCase())
        .replace(/[\-\s,]/g, '')
        .replace(/(\(.*\))$/, '') // function call examples in values
        .replace(/^(\d)/, '_$1') // numbers in font-weight
        .replace(/['"]/g, '') // quotes in font-family presets, fontFeatureSettings

const mixCasifyString = value =>
    value
        .replace(/-([a-z])/g, value => value.toUpperCase())
        .replace(/-/g, '')

const sanitizeValue = value =>
    value
        .replace(/(\(.*\))$/, '(${a})')
        .replace(/'/g, '"')

const renderPropertyCons =
    ({name, values}) => {
        const mixedCasedName = mixCasifyString(name)
        return `const ${mixedCasedName} = value => ({${mixedCasedName}: value})
${values.map(value => {
            const isFunction = value.indexOf('(') !== -1
            return isFunction
                ? `${mixedCasedName}.${propifyString(value)} = a => ${mixedCasedName}(\`${sanitizeValue(value)}\`)`
                : `${mixedCasedName}.${propifyString(value)} = ${mixedCasedName}('${sanitizeValue(value)}')`
        }).join('\n')}
`
    }

const renderFile = properties => `
${properties.map(renderPropertyCons).join('\n')}

export default {
${properties.map(({name}) => `  ${mixCasifyString(name)},`).join('\n')}
}
`

export {
    propifyString,
    mixCasifyString,
    renderPropertyCons,
    renderFile,
}
