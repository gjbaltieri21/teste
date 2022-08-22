const fs = require('fs')
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

const GetUrlData = async ({ page, data: url }) => {
  await page.goto(url)
  const xpathStoreName = await page.$x(
    '//*[@id="hd"]/div/div/div[1]/div[2]/div[1]/div/div/div[1]/div[1]/a/span'
  )
  const xpathFollowers = await page.$x(
    '//*[@id="hd"]/div/div/div[1]/div[2]/div[1]/div/div/div[2]/div[2]/span[1]'
  )
  const storeName = await page.evaluate(
    (el) => el.textContent,
    xpathStoreName[0]
  )
  const followers = await page.evaluate(
    (el) => el.textContent,
    xpathFollowers[0]
  )
  const findrating = await page.$eval("*", (el) => el.innerText)
  const rating = findrating.match(/[\d]{0,3}[.][\d][%]/)
  let result = {
    link: url,
    loja: storeName,
    seguidores: followers,
    rating: rating[0],
  }
  writeFile(ratingJSON, result)
  return result
}

module.exports = {GetUrlData}
