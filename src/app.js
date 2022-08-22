const Hapi = require( "@hapi/hapi")
const routes = require( "./routes/api-routes.js")
const ejs = require( 'ejs')
const vision = require( '@hapi/vision')
const path = require( 'path')

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log('Master process is running');
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = new Hapi.server({
  port: 7000 || process.env.PORT})

  async function main() {
    await app.register(vision)
    app.views({
      engines: {
        ejs: ejs,
      },
      relativeTo: path.join(__dirname),
      path: './templates',
    })
    app.route([new routes().home(), new routes().update()])
    await app.start()
    console.log("Connectado ao servidor...")
    return app
  }
  main()
}

// async function main() {
//   await app.register(vision)
//   app.views({
//     engines: {
//       ejs: ejs,
//     },
//     relativeTo: path.join(__dirname),
//     path: './templates',
//   })
//   app.route([new routes().home(), new routes().update()])
//   await app.start()
//   console.log("Connectado ao servidor...")
//   return app
// }
// module.exports = main()
