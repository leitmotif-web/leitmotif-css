#!/usr/bin/env node

import path from 'path'
import parseOpts from 'minimist'
import glob from 'glob'

const resolvePath = path.resolve
const opts = parseOpts(process.argv.slice(2))
const cwd = process.cwd()

opts._.map(arg => {
  const files = glob.sync(arg)

  if (!Array.isArray(files)) {
    throw new TypeError('unknown error: glob.sync did not return an array or throw. Please report this.')
  }

  files.map(async file => await import(resolvePath(cwd, file)))
})
