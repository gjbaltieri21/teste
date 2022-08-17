import * as puppeteer from "puppeteer"

async function getData(url) {
  const browser = await puppeteer.launch({ headless: true, args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu'
  ], })
  const page = await browser.newPage()
  await page.setDefaultNavigationTimeout(0)
  await page.goto(url, { waitUntil: "load" })
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
  await browser.close()
  return { link: url, loja: storeName, seguidores: followers, rating: rating[0] }
}
export default getData
