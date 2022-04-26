const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://codequiz.azurewebsites.net');
    await page.waitFor(1000);
debugger
    // Click on book link
  await page.click('[type="button"]');
  // await navigationPromise
   // we need to use waitForResponse because we are dealing with AJAX - no page navigation
   //await page.waitForResponse(response => response.status() === 200)
    // Scrap logic
    await page.waitFor(5000);
    const result = await page.evaluate(() => {
       
        const tds = Array.from(document.querySelectorAll('table tr'))
        const tds1 = Array.from(document.querySelectorAll('table tr td'))
        return tds1.map(td=>td.innerHTML)
  
    });

    browser.close();
    return result;
};

scrape().then((value) => {
    const St=[];
    let t=0;
    for(let i =0;i<=value.length-1;i++){
       if(t==i){
        const result = {
            FundName:"",
            Nav:""
        }
    
        result.FundName =value[t];
        result.Nav=value[t+1];
        St.push(result);
        t=i+5;
       }
    }
    console.log(St);
   
});