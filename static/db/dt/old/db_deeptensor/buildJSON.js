console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
console.log('--------------------------------------------')
console.log('----------- DIKOBRAZ : DEEPTENSOR ----------')
console.log('-------  Conversion mysql -> json  ---------')
console.log('--------------------------------------------')

const path = require("path")
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@@', path.join(path.resolve(__dirname), './../../src'))
const hook = require('@@/es6export/es6export')

const Cs = require('@@/cs/Cs.js')
const {tblsDel$, tblExcelToMySQL$, tblMySQLToJSON$} = require('@@/database/engine/Converter')

const CS = new Cs({app: 'deeptensor', debug: true, write: true})
CS.res('Modules are loaded')

const tblNames = ['plan', 'events', 'journals', 'papers', 'team', 'imgs', 'components']
const opts = {
    userName: 'root',
    userPassword: 'fraksos',
    dbName: 'deeptensor',
    dbPath: __dirname
}
Promise.resolve()
    .then  (res => tblsDel$(opts, tblNames, 'JSON'))
    .then  (res => tblMySQLToJSON$(opts, 'imgs'))
    .then  (res => tblMySQLToJSON$(opts, 'team'))
    .then  (res => tblMySQLToJSON$(opts, 'journals'))
    .then  (res => tblMySQLToJSON$(opts, 'papers'))
    .then  (res => tblMySQLToJSON$(opts, 'plan'))
    .then  (res => tblMySQLToJSON$(opts, 'events'))
    .then  (res => tblMySQLToJSON$(opts, 'components'))
    .then  (res => CS.res(`Tables are converted to JSON`))
    .catch (err => {
        CS.err(`Can't convert tables to JSON`, '', '', err)
        throw err
    })
    .then  (res => process.exit())
