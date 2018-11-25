import fs from 'fs'
import {renderFile} from './helpers'

import positioning from './specs/positioning'
import text from './specs/text'

const properties = [
    ...positioning.properties,
    ...text.properties,
]

fs.writeFileSync('./properties.js', renderFile(properties))
