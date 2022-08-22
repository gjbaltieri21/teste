const config = require("../../config.json")
const credenciais = require("../../credenciais.json")
const GConnect = require("../connect/g-sheets-connect.js")
const GoogleSheets = require("../doc-methods/g-sheets-methods.js")
const fs = require('fs')
const path = require('path')
const ratingJSON = path.join(__dirname, '../../rating.json')

async function GetLinks() {
    const connect = await new GConnect(config, credenciais).connect()
    const links = await new GoogleSheets().getLinks(connect)
    return links
}
async function SaveData() {
    const items = fs.readFileSync(ratingJSON, {encoding:'utf8', flag:'r'})
    const connect = await new GConnect(config, credenciais).connect()
    return await new GoogleSheets().updateLinks(connect, JSON.parse(items))
}      

module.exports = {GetLinks, SaveData}
