const urls = require('../../urls.json')
const modulePath = `${__dirname}/worker.js`
const cp = require('child_process')
;
(async function main() {
    for(const url of urls){
      console.log(urls.length)
      const worker = cp.fork(modulePath, [])
      worker.on('message', msg => console.log('nova msg', msg))
      worker.on('error', msg => console.log('novo erro', msg))
      worker.send({url})
    }
})()
