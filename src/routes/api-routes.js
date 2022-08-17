import GConnect from "../connect/g-sheets-connect.js"
import GoogleSheets from "../doc-methods/g-sheets-methods.js"
import config from "../../config.json" assert { type: "json" }
import credenciais from "../../credenciais.json" assert { type: "json" }
import getData from '../doc-methods/puppeteer-methods.js'

class routes {
  update() {
    return {
      path: "/update",
      method: "GET",
      handler: async (req, res) => {
        const connect = new GConnect(config, credenciais).connect()
        const getlink = await new GoogleSheets().getLinks(connect)
        let data = []
        console.log(getlink)
        for (let i = 0; i < getlink.length; i++) {
          const aliData = await getData(getlink[i])
          data.push(aliData)
        }
        const setData = await new GoogleSheets().updateLinks(connect, data)
        console.log("setdata", setData)
        return res.response(data)
      }
    }
  }
  home() {
    return {
      path: "/",
      method: "GET",
      handler: async (req, res) => {
        return res.view('index')
      }
    }
  }
}

export default routes
