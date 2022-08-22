class GoogleSheets {
  async getLinks(connection) {
    const doc = await connection
    const [sheet] = doc.sheetsByIndex
    const urls = []
    try {
      const get = await sheet.getRows()
      for (let i = 0; i < get.length; i++) {
        let url = get[i]._rawData[0]
        if(url.length >= 5){
          urls.push(url)
        }
      }
      return urls
    } catch (error) {
      console.log("deu ruim", error)
    }
  }
  async updateLinks(connection, data){
    const doc = await connection
    const [sheet] = doc.sheetsByIndex

    try {
      const rows = await sheet.getRows()
      for(let i = 0; i < rows.length; i++){
        rows[i].link = data[i].link
        rows[i].loja = data[i].loja,
        rows[i].rating = data[i].rating,
        rows[i].seguidores = data[i].seguidores
        await rows[i].save()
        console.log(`${rows[i].loja} salvo com sucesso!`)
      }
      return
    } catch (error) {
      console.error('deu ruim', error)
    }
  }
}

module.exports = GoogleSheets
