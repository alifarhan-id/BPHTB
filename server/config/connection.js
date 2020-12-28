const promise = require('bluebird')
const options = {
    promiseLib: promise,
    error(error, e) {
        if (e.cn) {
            console.log('CN:', e.cn);
            console.log('EVENT:', error.message || error)
        }
    }
}
const pgp = require('pg-promise')(options)
const connectionString = 'postgres://postgres:Elektro12@127.0.0.1:5432/bphtb_mataram';
const db = pgp(connectionString)

db.connect()
    .then(obj => {
        obj.done();
    })
    .catch(error => {
        console.log('ERROR: ', error.message || error)
    })

module.exports = db;