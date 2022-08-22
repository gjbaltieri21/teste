const { GetLinks, SaveData } = require("../helper/GConnect-helper")
const { worker } = require("../helper/worker-helper")
const {GetUrlData} = require('../doc-methods/puppeteer-methods')

class routes {
  update() {
    return {
      path: "/update",
      method: "POST",
      handler: async (req, res) => {
        try {
          const links = await GetLinks()
          await worker(GetUrlData, links)
          await SaveData()
          return res.response(links)
        } catch (error) {
          res.response('deu ruim mano')
        }
      },
    }
  }
  home() {
    return {
      path: "/",
      method: "GET",
      handler: async (req, res) => {
          return res.view("index")
      },
    }
  }
}

module.exports = routes
