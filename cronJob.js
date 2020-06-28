const cron = require("node-cron");
const puppeteer = require('puppeteer');
const axios = require('axios');
const express = require("express");


app = express();

cron.schedule("* * * * *", function() {
    console.log("running a task every minute");
    (async () => {

        const browser = await puppeteer.launch({headless: false, defaultViewport: {
          width: 1700,
          height: 1000,
          isMobile: false,
        }}); // default is true
        const page = await browser.newPage();
    
        await page.setBypassCSP(true);
    
         const res = await axios.get('http://localhost:8080/api/task')
         .then(function (response) {
           // handle success
           console.log(response.data[0]);
           return response.data
         })
         .catch(function (error) {
           // handle error
           console.log(error);
           return error
         })
         .then(function (response) {
          // handle success
          return response
        });
      
    console.log(res[0].task)
    
        
    await page.goto('https://facebook.com', {waitUntil: 'networkidle2'});
    
    // Sign in
    await page.type('input[name=email]', '5126899985', {delay: 20})
    await page.type('input[name=pass]', '6maiden6', {delay: 20})
    await page.click('input[type=submit]', {waitUntil: 'networkidle2'}); // With type
    await page.waitForNavigation({ waitUntil: 'networkidle0' }),
    
    // Wait until page has loaded
    await page.waitForSelector("#ssrb_root_start")

    // Make sure "What's in your mind?" box is available
    await page.$('div.m9osqain.a5q79mjw')
    // Click "What's in your mind?" box to open it.
    await page.click('div.m9osqain.a5q79mjw'); 
    // Wait for the close button on the dialog to be visible.
    await page.waitForSelector('div.oajrlxb2.tdjehn4e', {visible: true}),
    
    // Populate data to post.
    await page.type('div.notranslate', '  '  + "Using cron job " + '\n' + res[0].task + '\n' + res[0].status, {delay: 200})
    
    // Wait for Submit button to be visible
    await page.waitForSelector('div.oajrlxb2.s1i5eluu.qu0x051f', {visible: true}),

    // Submit Post
    await page.click('div.oajrlxb2.s1i5eluu.qu0x051f'); // With type

    // Allow submit to happen
    await page.waitFor(3000)

    // Duplicate post logic
    const exists = !!(await page.$('div.oajrlxb2.s1i5eluu'));
    console.log(exists)
    if (exists){
    await page.click('div.oajrlxb2.s1i5eluu')
    }

    // Finish and close browser
    await page.waitFor(3000)
    await browser.close();
    })();
  });

app.listen(3128);



