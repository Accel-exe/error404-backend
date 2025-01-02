import { chromium } from "playwright";
import fs from 'fs/promises'
import path from 'path'
import { getRandomUserAgent } from "../../services/playwright.js";

export const scapyNames = async (): Promise<Array<string>> => {
    const browser = await chromium.launch()
    await browser.newContext({userAgent: getRandomUserAgent()})
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(60000);
    const names:Array<string> = []
    await page.goto('https://epic7db.com/heroes')

    console.log("Coletando os Nomes")
    const listCaracters = await page.$$('.hero')
    const saveList = await Promise.all(listCaracters.map(async(e) => {
        const name:string | any = await e.getAttribute('data-name')
        console.log(name + ' Coletado')
        names.push(name.replace(/ /g, '-').toLowerCase())
    }))
    
    console.log(`Todos os ${names.length} nomes foram coletados`)
    browser.close()
    return names
}

export const scrapyIcons = async (): Promise<void> => {
    const browser = await chromium.launch()
    const raiz = path.resolve('dev/src/img/epic_seven/icons');
    const names:Array<string> = await scapyNames()
    const imgs: Array<string> = [] 
    
    console.log("Inciando Salvamento de Imagems")
    const saveImages = await Promise.all(names.map(async(e) => {
        await browser.newContext({userAgent: getRandomUserAgent()})
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(240000);

        const response:any = await page.goto(`https://epic7db.com/images/heroes/${e}.webp`)
        const img = await response.body()
        const imagePath = path.join(raiz, `${e}.webp`)
        await fs.writeFile(imagePath, img)
        imgs.push(e)
        console.log(`${e} Salva com sucesso`)
        await page.close()
    }))

    console.log(`todas as ${imgs.length} imagens salvas com sucesso`)
    browser.close()
}