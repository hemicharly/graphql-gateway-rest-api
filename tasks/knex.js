const path = require('path')
const childProcess = require('child_process')

const modules = path.join(__dirname, '..', 'node_modules', '.bin')
module.exports = () => new Promise((resolve, reject) => {
  if (process.argv.length < 5) {
    const err = 'Missing arguments.'
    console.log(`\n\x1b[31m%s\x1b[0m ${err}`, 'error')
    reject(err)
    return null
  }

  if (process.argv[4] !== '--command') {
    const err = '"--command" not found.'
    console.log(`\n\x1b[31m%s\x1b[0m ${err}`, 'error')
    reject(err)
    return null
  }

  let args
  try {
    args = process.argv[5]
  } catch (err) {
    args = null
  }

  if (!args) {
    const err = 'Command must be a non-empty string.'
    console.log(`\n\x1b[31m%s\x1b[0m ${err}`, 'error')
    reject(err)
    return null
  }

  args = args.split('knex ').join('')
  const knex = path.join(modules, 'knex')
  const knexCommand = `${knex} ${args}`
  childProcess.exec(knexCommand, (err, stdout) => {
    if (err) {
      reject(err)
      return null
    }

    let output = stdout.split('\n').join('')
    console.log(`\n\x1b[32m%s\x1b[0m`, output)
    resolve(true)
  })
})
