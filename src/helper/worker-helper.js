const { Cluster } = require("puppeteer-cluster")

const worker = async (GetDataMethod, links) => {
    const pid = process.pid
    try {
        const cluster = await Cluster.launch({
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 10,
        puppeteerOptions: {
            headless: true,
            args: ['--no-sandbox'],
          }
      })
      for (let link of links) {
        await cluster.queue(link, GetDataMethod)
      }
      await cluster.idle()
      await cluster.close()
      console.log(`${pid} has FINISH!!!`)
    } catch (error) {
      console.error(`${pid} has broken!!!`, error)
    }
  }

  module.exports = {worker}