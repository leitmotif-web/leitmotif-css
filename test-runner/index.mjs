import spawn from 'child_process'
import os from 'os'
import Promise from 'bluebird'
import glo from 'glob'
const glob = Promise.promisify(glo)

const numCPUs = os.cpus().length

const FILENAME = typeof __filename !== 'undefined' ? __filename : (/^ +at (?:file:\/*(?=\/)|)(.*?):\d+:\d+$/m.exec(Error().stack) || '')[1]
const DIRNAME = typeof __dirname !== 'undefined' ? __dirname : FILENAME.replace(/[\/\\][^\/\\]*?$/, '')

const loadProcess = filename => (new Promise((resolve, reject) => {
  const childProcess = spawn.spawn('node', ['--experimental-modules', filename])
  const data = []
  childProcess.stdout.on('data', d => data.push(d))
  childProcess.stderr.on('data', err => reject(err.toString()))
  childProcess.on('exit', () => {
    console.info(data.join(''))
    resolve()
  })
})).catch(() => {})

glob(`${DIRNAME}/${process.argv[2]}`)
  .map(loadProcess, {
    concurrency: numCPUs,
  })
