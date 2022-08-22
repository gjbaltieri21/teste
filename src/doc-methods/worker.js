const { Cluster } = require("puppeteer-cluster")
const Gconnect = require("../connect/g-sheets-connect")
const GoogleSheets = require("../doc-methods/g-sheets-methods")
const config = require("../../config.json")
const credenciais = require("../../credenciais.json")
const ratingJSON = "rating.json"
const path = require('path')
const ratingJSON = path.join(__dirname, '../../rating.json')

async function writeFile(path, data) {
  let readFile = fs.readFileSync(path, { encoding: "utf-8" })
  readFile = JSON.parse(readFile)
  readFile.push(data)
  return fs.writeFileSync(path, JSON.stringify(readFile, null, 2), {
    encoding: "utf8",
  })
}

async function GetLinks() {
  const connect = await new Gconnect(config, credenciais).connect()
  const links = await new GoogleSheets().getLinks(connect)
  return links
}

const worker = async (GetDataMethod, GetLinkMethod) => {
  const pid = process.pid
  try {
    const links = await GetLinkMethod()
    const cluster = await Cluster.launch({
      concurrency: Cluster.CONCURRENCY_CONTEXT,
      maxConcurrency: 10,
      args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ]
    })
    for (let link of links) {
      await cluster.queue(link, GetDataMethod)
    }
    await cluster.idle()
    await cluster.close()
    const items = fs.readFileSync(ratingJSON, {encoding:'utf8', flag:'r'})
    const connect = await new Gconnect(config, credenciais).connect()
    await new GoogleSheets().updateLinks(connect, JSON.parse(items))
    console.log(`${pid} has FINISH!!!`)
  } catch (error) {
    console.error(`${pid} has broken!!!`, error)
  }
}
