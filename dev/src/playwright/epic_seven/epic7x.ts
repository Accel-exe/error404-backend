import { chromium } from "playwright";
import fs from 'fs/promises'
import path from 'path'
import { getRandomUserAgent } from "../../services/playwright.js";
import { scapyNamesDb } from "./epic7db.js";


const scapyNamesx = async (): Promise<Array<string>> => {
    const browser = await chromium.launch()
    await browser.newContext({userAgent: getRandomUserAgent()})
    const page = await browser.newPage()
    page.setDefaultNavigationTimeout(60000)
    const names: Array<string> = []
    await page.goto('https://epic7x.com/characters/')

    console.log("Iniciando busca dos nomes")
    const divCaracters = await page.$$('.pure-u-1.pure-u-md-1-2.pure-u-lg-1-4.mt-10')

    for(const pg of divCaracters) {
        const divName = await pg.$('.pure-u-1.text-center')
        const tagName: string | any = await divName?.$('span')
        const name: string = await tagName.innerText()
        names.push(name.replace(/ /g, '-').toLowerCase())
        console.log(name + ' Coletado')
    }

    console.log(`Todos os ${names.length} foram coletados`)
    await browser.close()
    return names
}

export const scapyImgsx = async (): Promise<void> => {
    const browser = await chromium.launch()
    const source = path.resolve('dev/src/img/epic_seven/caracters')
    const sourceLogs = path.resolve('dev/src/img/epic_seven/logs/Erro_Save_imgs.txt')
    const names: Array<string> = await scapyNamesDb()
    const imgs: Array<string> = []
    const notSaveImgs: Array<string> = []

    console.log("Iniciando Salvamento das Imagens")
    for(const name of names) {
        await browser.newContext({userAgent: getRandomUserAgent()})
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(380000);

        console.log("Navegando ate a pagina do personagem " + name)
        await page.goto(`https://epic7x.com/character/${name}/`)
        const imgDiv = await page.$('#app div section div > div:last-child img')
        const imgSrc:string | any = await imgDiv?.getAttribute('src')
        
        console.log(`Verificando se a url da imagem do personagem ${name} existe` )
        if (imgSrc) {
        console.log("Navegando ate a url da imagem do personagem " + name)
        const response:any = await page.goto(imgSrc)
        const img = await response.body()
        const imagePath = path.join(source, `${name}.png`)
        
        console.log("Verificando se existe a imagem do personagem " + name)
        if (img) {
        console.log("Baixando a imagem do personagem " + name)
        await fs.writeFile(imagePath, img)
        imgs.push(name)
        console.log(`Imagem do personagem ${name} Salva com sucesso`)
        await page.close()
        } else {console.log(`Imagem do personamge ${name} nao encontrada`); notSaveImgs.push(`Imagem de ${name} nao encontrada`)}
        } else {console.log(`Url do personagem ${name} nao encontrada`); notSaveImgs.push(`URL de ${name} nao encontrada`)}
    }
    
    console.log(`todas as ${imgs.length} Imagens salvas com sucesso`)
    if (notSaveImgs.length > 0) {
            const content = notSaveImgs.join('\n')
            await fs.writeFile(sourceLogs, content)
    }

    browser.close()
}