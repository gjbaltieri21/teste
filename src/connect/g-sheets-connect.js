const { GoogleSpreadsheet } = require( "google-spreadsheet")

class GConnect {
  constructor(config, credenciais) {
    this.config = config
    this.credenciais = credenciais
  }
  async connect() {
    const doc = new GoogleSpreadsheet(this.config.id)
    await doc.useServiceAccountAuth({
      client_email: this.credenciais.client_email,
      private_key: this.credenciais.private_key.replace(/\\n/g, "\n"),
    })
    const res = await doc.loadInfo()
    return doc
  }
}

module.exports = GConnect