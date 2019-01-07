import * as R from 'ramda'

const {uniq, take} = R

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

const sanitizeFunctionValueWithArgs = (value, args) =>
    value
        .replace(/(\(.*\))$/, args)
        .replace(/'/g, '"')

const renderPropertyCons =
    ({name, values}) => {
        const mixedCasedName = mixCasifyString(name)
        return `/**
 * @typedef ${mixedCasedName}
 ${values.map(value => `* @property {string} ${propifyString(value)} "${value}"`).join('\n ')}
 */
export const ${mixedCasedName} = value => ({${mixedCasedName}: value})
${values.map(value => {
            const isFunction = value.indexOf('(') !== -1
            return isFunction
                ? `${mixedCasedName}.${propifyString(value)} = a => ${mixedCasedName}(\`${sanitizeValue(value)}\`)`
                : `${mixedCasedName}.${propifyString(value)} = ${mixedCasedName}('${sanitizeValue(value)}')`
        }).join('\n')}
`
    }

const renderValueCons =
    (value) => {
        const isFunction = value.indexOf('(') !== -1
        const isNullaryFunction = value.indexOf('()') !== -1
        const arity = isNullaryFunction ? 0 : value.split(',').length

        const args = ['a', 'b', 'c', 'd', 'e', 'f']
        const argString = `(${take(arity, args).join(', ')})`
        const argStringInterpol = `(${take(arity, args).map(a => `\${${a}}`).join(', ')})`

        return `
${isFunction
            ? `/** @typedef ${propifyString(value)}_${arity}n */\nexport const ${propifyString(value)}_${arity}n = ${argString} => \`${sanitizeFunctionValueWithArgs(value, argStringInterpol)}\``
            : `/** @typedef ${propifyString(value)}_ */\nexport const ${propifyString(value)}_ = '${sanitizeValue(value)}'`}`
    }

const renderFile = (properties, values = []) => `
${uniq(values).map(renderValueCons).join('\n')}
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
