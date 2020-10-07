const puppeteer = require("puppeteer");

let scrape = async () => {
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  await page.goto("https://azureprice.net/");

  const result = await page.evaluate(() => {
    let flavors = []; // Recebe os flavors da Azure
    let t = document.getElementById("table"); // Tabela
    let trs = t.getElementsByTagName("tr"); // Array com a quantidade de TRs que tem na tabela
    let tds = null; // TDs (null por enquanto)

    // Faz um for até a quantidade de TRs da tabela
    for (let i = 1; i < trs.length; i++) {
      tds = trs[i].getElementsByTagName("td"); // Pega as TDs da TR atual do for

      // Objeto dos dados de flavor
      const flavorModel = {
        flavor: "",
        cores: 0,
        memory: 0,
        disks: 0,
      };

      // Percorre as TDs da TR e adiciona a informação correspondente no objeto
      for (let n = 0; n < tds.length; n++) {
        flavorModel.flavor = tds[0].textContent;
        flavorModel.cores = +tds[1].textContent;
        flavorModel.memory = +tds[2].textContent;
        flavorModel.disks = +tds[3].textContent;
      }

      flavors.push(flavorModel); // Adiciona o objeto preenchido no array de flavors
    }

    return flavors; // retorna o array com os flavors
  });

  browser.close();
  return result;
};

scrape().then((value) => {
  console.log(value);
});
