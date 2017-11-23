console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n')
console.log('--------------------------------------------')
console.log('-----------      DEEPTENSOR       ----------')
console.log('-------  Conversion mysql -> json  ---------')
console.log('--------------------------------------------')

const path = require("path")
const src = './../../../src'
const moduleAlias = require('module-alias')
moduleAlias.addAlias('@@', path.join(path.resolve(__dirname), src))
const hook = require('@@/es6export/es6export')

const Cs = require('@@/cs/Cs.js')
const {tblsDel$, tblMySQLToJSON$} = require('@@/database/engine/Converter')

const CS = new Cs({app: 'deeptensor', debug: true, write: true})
CS.res('Modules are loaded')

async function run$(tblNames, filters, sorters, opts={}) {
    await tblsDel$(opts, tblNames, 'JSON')
    for(let tblName of tblNames)
        await tblMySQLToJSON$(opts, tblName, filters[tblName], sorters[tblName])
    CS.res(`All tables are converted from MySQL to JSON`)
}

const tblNames = ['plan', 'events', 'journals', 'conferences', 'papers', 'team']
const filters = {
    events: r => {
        return r.active
    },
    team: r => {
        return r.active
    },
}
const sorters = {
    papers: rs => {rs.sort((r1, r2) => { // r1 , r2 if < 0
        //console.log('date ', r1.date,  r2.date, r1.date > r2.date)
        if(r1.date)
            return r2.date ? r1.date < r2.date : 1
        if(r2.date)
            return r1.date ? r1.date < r2.date : -1
        if(r1.year > r2.year)
            return -1
        if(r1.year < r2.year)
            return 1
    })},
    team: rs => {rs.sort((r1, r2) => {
        if(r1.order < r2.order)
            return -1
        return 1
    })},
}
run$(tblNames, filters, sorters, {
    userName: 'root',
    userPassword: 'fraksos',
    dbName: 'deeptensor',
    dbPath: __dirname,
})
    .catch (err => CS.err(`Can't convert tables to JSON`, '', '', err))
    .then  (res => process.exit())
