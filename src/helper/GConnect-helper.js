const config = require("../../config.json")
const credenciais = require("../../credenciais.json")
const GConnect = require("../connect/g-sheets-connect.js")
const GoogleSheets = require("../doc-methods/g-sheets-methods.js")

async function GetLinks() {
    const connect = await new GConnect(config, credenciais).connect()
    const links = await new GoogleSheets().getLinks(connect)
    return links
}
async function SaveData(data) {
    const connect = await new GConnect(config, credenciais).connect()
    return await new GoogleSheets().updateLinks(connect, JSON.parse(data))
}      

module.exports = {GetLinks, SaveData}