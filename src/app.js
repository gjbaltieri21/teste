const Hapi = require( "@hapi/hapi")
const routes = require( "./routes/api-routes.js")
const ejs = require( 'ejs')
const vision = require( '@hapi/vision')
const path = require( 'path')

  const app = new Hapi.server({
  port: process.env.PORT || 7000})

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
