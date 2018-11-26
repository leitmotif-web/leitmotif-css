import * as R from 'ramda'
import fs from 'fs'
import convert from 'xml-js'
import {renderFile} from './helpers'

const {uniq} = R

function castArray() {
    if (!arguments.length) return []
    const value = arguments[0]
    return Array.isArray(value) ? value : [value]
}

const cleanupPropertyValueXml = (acc, propValue) => ({
    ...acc,
    [propValue._attributes.type]: castArray(propValue.entry).map(entry => entry._attributes.value),
})

const xmlFiles = [
    './lib/schemastore/src/schemas/css/css-module-animations.xml',
    './lib/schemastore/src/schemas/css/css-module-background-borders.xml',
    './lib/schemastore/src/schemas/css/css-module-basic-box.xml',
    './lib/schemastore/src/schemas/css/css-module-basic-ui.xml',
    './lib/schemastore/src/schemas/css/css-module-color.xml',
    './lib/schemastore/src/schemas/css/css-module-counter-styles.xml',
    './lib/schemastore/src/schemas/css/css-module-flex-box.xml',
    './lib/schemastore/src/schemas/css/css-module-fonts.xml',
    './lib/schemastore/src/schemas/css/css-module-generated-content.xml',
    './lib/schemastore/src/schemas/css/css-module-grid-layout.xml',
    './lib/schemastore/src/schemas/css/css-module-image-values-replaced-content.xml',
    './lib/schemastore/src/schemas/css/css-module-layout.xml',
    './lib/schemastore/src/schemas/css/css-module-lists.xml',
    './lib/schemastore/src/schemas/css/css-module-multi-column.xml',
    // './lib/schemastore/src/schemas/css/css-module-namespaces.xml',
    './lib/schemastore/src/schemas/css/css-module-paged-media.xml',
    './lib/schemastore/src/schemas/css/css-module-regions.xml',
    './lib/schemastore/src/schemas/css/css-module-ruby.xml',
    // './lib/schemastore/src/schemas/css/css-module-selectors.xml',
    './lib/schemastore/src/schemas/css/css-module-shapes.xml',
    './lib/schemastore/src/schemas/css/css-module-speech.xml',
    './lib/schemastore/src/schemas/css/css-module-svg-filters.xml',
    './lib/schemastore/src/schemas/css/css-module-svg-gradients.xml',
    // './lib/schemastore/src/schemas/css/css-module-svg-interactivity.xml',
    './lib/schemastore/src/schemas/css/css-module-svg-masking.xml',
    './lib/schemastore/src/schemas/css/css-module-svg-painting.xml',
    './lib/schemastore/src/schemas/css/css-module-svg-text.xml',
    // './lib/schemastore/src/schemas/css/css-module-syntax.xml',
    './lib/schemastore/src/schemas/css/css-module-tables.xml',
    './lib/schemastore/src/schemas/css/css-module-text.xml',
    './lib/schemastore/src/schemas/css/css-module-transforms.xml',
    './lib/schemastore/src/schemas/css/css-module-transitions.xml',
    // './lib/schemastore/src/schemas/css/css-module-values.xml',
    // './lib/schemastore/src/schemas/css/css-module-will-change.xml',
    './lib/schemastore/src/schemas/css/css-module-writing-modes.xml',
    // './lib/schemastore/src/schemas/css/css-vendor-moz.xml',
    // './lib/schemastore/src/schemas/css/css-vendor-ms.xml',
    // './lib/schemastore/src/schemas/css/css-vendor-o.xml',
    // './lib/schemastore/src/schemas/css/css-vendor-webkit.xml',
]

const defsFromXml = xml => {
    const xmlDef = JSON.parse(convert.xml2json(fs.readFileSync(xml).toString(), {
        compact: true,
        spaces: 4
    }))

    const cleanedUpPropertyValues = castArray(xmlDef.CssModule.CssPropertyValue || []).reduce(cleanupPropertyValueXml, {})

    const cleanupPropertyXml = prop => {
        const attributes = prop._attributes

        const entries = prop.entry
            ? castArray(prop.entry).map(entry => entry._attributes.value)
            : attributes.type
                ? castArray(attributes.type.split(','))
                    .map(type => type.trim())
                    .reduce((acc, type) => [
                        ...acc,
                        ...cleanedUpPropertyValues[type] ? cleanedUpPropertyValues[type] : [],
                    ], [])
                : []

        return ({
            name: attributes.name,
            restriction: attributes.restriction,
            values: uniq(entries),
        })
    }

    return castArray(xmlDef.CssModule.CssProperty || []).map(cleanupPropertyXml)
}

const defs = xmlFiles.reduce((acc, current) => [
    ...acc,
    ...defsFromXml(current),
], [])

const propertyMap = defs.reduce((propertyMap, item) => {
    const entry = propertyMap.get(item.name) || {values: []}
    propertyMap.set(item.name, {
        ...item,
        ...entry,
        values: [
            ...entry.values,
            ...item.values,
        ],
    })
    return propertyMap
}, new Map())

fs.writeFileSync('./properties.js', renderFile(Array.from(propertyMap).map(([_, a]) => a)))
