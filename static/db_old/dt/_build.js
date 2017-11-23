console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
console.log('--------------------------------------------')
console.log('-----------      DEEPTENSOR       ----------')
console.log('-------  Conversion mysql -> json  ---------')
console.log('--------------------------------------------')

const path = require("path")
const src = './../../../../src'
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@@', path.join(path.resolve(__dirname), src))
const hook = require('@@/es6export/es6export')

const Cs = require('@@/cs/Cs.js')
const {tblsDel$, tblMySQLToJSON$} = require('@@/database/engine/Converter')

const CS = new Cs({app: 'deeptensor', debug: true, write: true})
CS.res('Modules are loaded')

async function run$(tblNames, opts={}) {
    await tblsDel$(opts, tblNames, 'JSON')
    for(let tblName of tblNames)
        await tblMySQLToJSON$(opts, tblName)
    CS.res(`All tables are converted from MySQL to JSON`)
}
run$(['plan', 'events', 'journals', 'papers', 'team'], {
    userName: 'root',
    userPassword: 'fraksos',
    dbName: 'deeptensor',
    dbPath: __dirname
})
    .catch (err => CS.err(`Can't convert tables to JSON`, '', '', err))
    .then  (res => process.exit())
