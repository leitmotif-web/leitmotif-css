const propifyString = value =>
    value
        .replace(/[\s\-]([a-z])/g, value => value.toUpperCase())
        .replace(/[\-\s,]/g, '')

const mixCasifyString = value =>
    value
        .replace(/-([a-z])/g, value => value.toUpperCase())
        .replace(/-/g, '')

const renderPropertyCons =
    ({name, values}) => {
        const mixedCasedName = mixCasifyString(name)
        return `const ${mixedCasedName} = value => ({${mixedCasedName}: value})
${values.map(value => `${mixedCasedName}.${propifyString(value)} = ${mixedCasedName}('${value}')`).join('\n')}
`}

const renderFile = properties => `
${properties.map(renderPropertyCons).join('\n')}

module.exports = {
${properties.map(({name}) => `  ${mixCasifyString(name)},`).join('\n')}
}
`

export {
    propifyString,
    mixCasifyString,
    renderPropertyCons,
    renderFile,
}
