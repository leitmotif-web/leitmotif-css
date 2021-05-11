import * as R from 'ramda'
import fs from 'fs'
import convert from 'xml-js'
import {renderFile} from './helpers.mjs'

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
    './lib/xml-specs/css-module-animations.xml',
    './lib/xml-specs/css-module-background-borders.xml',
    './lib/xml-specs/css-module-basic-box.xml',
    './lib/xml-specs/css-module-basic-ui.xml',
    './lib/xml-specs/css-module-color.xml',
    './lib/xml-specs/css-module-counter-styles.xml',
    './lib/xml-specs/css-module-flex-box.xml',
    './lib/xml-specs/css-module-fonts.xml',
    './lib/xml-specs/css-module-generated-content.xml',
    './lib/xml-specs/css-module-grid-layout.xml',
    './lib/xml-specs/css-module-image-values-replaced-content.xml',
    './lib/xml-specs/css-module-layout.xml',
    './lib/xml-specs/css-module-lists.xml',
    './lib/xml-specs/css-module-multi-column.xml',
    // './lib/xml-specs/css-module-namespaces.xml',
    './lib/xml-specs/css-module-paged-media.xml',
    './lib/xml-specs/css-module-regions.xml',
    './lib/xml-specs/css-module-ruby.xml',
    // './lib/xml-specs/css-module-selectors.xml',
    './lib/xml-specs/css-module-shapes.xml',
    './lib/xml-specs/css-module-speech.xml',
    './lib/xml-specs/css-module-svg-filters.xml',
    './lib/xml-specs/css-module-svg-gradients.xml',
    // './lib/xml-specs/css-module-svg-interactivity.xml',
    './lib/xml-specs/css-module-svg-masking.xml',
    './lib/xml-specs/css-module-svg-painting.xml',
    './lib/xml-specs/css-module-svg-text.xml',
    // './lib/xml-specs/css-module-syntax.xml',
    './lib/xml-specs/css-module-tables.xml',
    './lib/xml-specs/css-module-text.xml',
    './lib/xml-specs/css-module-transforms.xml',
    './lib/xml-specs/css-module-transitions.xml',
    // './lib/xml-specs/css-module-values.xml',
    // './lib/xml-specs/css-module-will-change.xml',
    './lib/xml-specs/css-module-writing-modes.xml',
    // './lib/xml-specs/css-vendor-moz.xml',
    // './lib/xml-specs/css-vendor-ms.xml',
    // './lib/xml-specs/css-vendor-o.xml',
    // './lib/xml-specs/css-vendor-webkit.xml',
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

const [propertyMap, valueMap] = defs.reduce(([propertyMap, valueMap], item) => {
    const entry = propertyMap.get(item.name) || {values: []}
    const values = [
        ...entry.values,
        ...item.values,
    ]
    propertyMap.set(item.name, {
        ...item,
        ...entry,
        values,
    })
    return [propertyMap, [...valueMap, ...values]]
}, [new Map(), []])

fs.writeFileSync('./dist/properties.mjs', renderFile(Array.from(propertyMap).map(([_, a]) => a), valueMap))
