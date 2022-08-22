const { GetLinks, SaveData } = require("../helper/GConnect-helper")
const { worker } = require("../helper/worker-helper")
const {GetUrlData} = require('../doc-methods/puppeteer-methods')

const fs = require('fs')
const path = require('path')
const ratingJSON = path.join(__dirname, '../../rating.json')

class routes {
  update() {
    return {
      path: "/update",
      method: "POST",
      handler: async (req, res) => {
        try {
          const links = await GetLinks()
          await worker(GetUrlData, links)
          const items = fs.readFileSync(ratingJSON, {encoding:'utf8', flag:'r'})
          console.log('items', items)
          await SaveData(items)
          return res.response('fim')
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
