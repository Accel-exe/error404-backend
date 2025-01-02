import { chromium } from "playwright";
import fs from 'fs/promises'
import path from 'path'
import { getRandomUserAgent } from "../../services/playwright.js";
import { error } from "console";

export const scapyNamesDb = async (): Promise<Array<string>> => {
    const browser = await chromium.launch()
    await browser.newContext({userAgent: getRandomUserAgent()})
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(60000);
    const names:Array<string> = []
    await page.goto('https://epic7db.com/heroes')

    console.log("Coletando os Nomes")
    const listCaracters = await page.$$('.hero')
    for(const e of listCaracters) {
        const name:string | any = await e.getAttribute('data-name')

        names.push(name.replace(/ /g, '-').toLowerCase())
        console.log(name + ' Coletado')
    }
    
    console.log(`Todos os ${names.length} nomes foram coletados`)
    browser.close()
    return names
}

export const scrapyIconsDb = async (): Promise<void> => {
    const browser = await chromium.launch()
    const source = path.resolve('dev/src/img/epic_seven/icons');
    const names:Array<string> = await scapyNamesDb()
    const icons: Array<string> = [] 
    const notSaveIcons: Array<string> = []
    
    console.log("Inciando Salvamento de Icones")
    for(const name in names) {
        await browser.newContext({userAgent: getRandomUserAgent()})
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(240000);

        console.log(`Navegando ate a pagina do personagem ${name}`)
        const response:any = await page.goto(`https://epic7db.com/images/heroes/${name}.webp`)
        const img = await response.body()
        const imagePath = path.join(source, `${name}.webp`)

        if (img) {
            await fs.writeFile(imagePath, img)
            icons.push(name)
            console.log(`${name} Salva com sucesso`)
            await page.close()
        } else {console.log(`Imagem do personagem ${name} nao existe`); notSaveIcons.push(`Imagem de ${name} nao existe`)}
    }

    console.log(`todas as ${icons.length} Icones salvas com sucesso`)
    if(notSaveIcons.length > 0) {
        for(const error of notSaveIcons) {
            console.log(error)
            console.log(`Total de imagens nao salvas ` + notSaveIcons.length)
        }  
    }
    browser.close()
}