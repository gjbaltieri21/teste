import Hapi, { server } from "@hapi/hapi"
import routes from "./routes/api-routes.js"
import ejs from 'ejs'
import vision from '@hapi/vision'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = new Hapi.server({
  port: process.env.PORT || 8000,
})

async function main() {
  await app.register(vision)
  app.views({
    engines: {
      ejs: ejs,
    },
    relativeTo: __dirname,
    path: './templates',
  })
  app.route([new routes().home(), new routes().update()])
  await app.start()
  console.log("Connectado ao servidor...")
  return app
}
main()
