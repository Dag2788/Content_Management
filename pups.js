const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true}); // default is true
    const page = await browser.newPage();
  await page.goto('https://facebook.com', {waitUntil: 'networkidle2'});
//   await page.pdf({path: 'hn.pdf', format: 'A4'});

await page.type('input[name=email]', '<email>', {delay: 20})
await page.type('input[name=pass]', '<password>', {delay: 20})
await page.click('input[type=submit]', {waitUntil: 'networkidle2'}); // With type
await page.waitForNavigation({ waitUntil: 'networkidle0' }),



// await page.click('class=m9osqain a5q79mjw'); // With type

// await browser.waitForTarget(await page.$(".m9osqain .a5q79mjw"))

// let handles = await page.$('.m9osqain .a5q79mjw');

// await page.click(handles); // With type


await page.waitForSelector("#ssrb_root_start")
let element = await page.$('div.m9osqain.a5q79mjw')
// let value = await page.evaluate(el => el.textContent, element)
await page.click('div.m9osqain.a5q79mjw'); // With type
// await browser.waitUntil('div.notranslate', {visible: true})
await page.waitForSelector('div.oajrlxb2.tdjehn4e', {visible: true}),

await page.type('div.notranslate', " Why is the script not dying lol", {delay: 200})

//await page.evaluate((text) => { ( page.$('div.notranslate')).value = text; }, "Hello from Puppeteer Script");
await page.waitForSelector('div.oajrlxb2.s1i5eluu.qu0x051f', {visible: true}),

await page.click('div.oajrlxb2.s1i5eluu.qu0x051f'); // With type

await browser.close();
})();



