import {deepStrictEqual, equal} from 'assert'
import GConnect from '../connect/g-sheets-connect.js'
import api from '../app.js'
import credenciais from '../../credenciais.json' assert { type: "json" }
import config from "../../config.json" assert { type: "json" }
import GoogleSheets from '../doc-methods/g-sheets-methods.js'

let app = {}

describe('Suite de testes para rotas', function () {
    this.beforeAll(async () => {
        this.timeout(Infinity)
        app = await api
    })
    it('Retorna status 200 ao acessar GET - "/"', async () => {
        const {statusCode} = await app.inject({
            url: '/',
        })
        deepStrictEqual(statusCode, 200)
    })
    it('Deve retornar os links da planilha do Google Sheets', async ()=> {
        const result = await new GoogleSheets().getLinks(new GConnect(config, credenciais).connect())
        const expect = []
        equal(typeof result, typeof expect)
    })
})
