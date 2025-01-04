import { chromium } from "playwright";
import fs from 'fs/promises'
import path from 'path'
import { getRandomUserAgent } from "../../services/playwright.js";

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
    const sourceLogs = path.resolve('dev/src/img/epic_seven/logs/Erro_save_icons.txt')
    const names:Array<string> = await scapyNamesDb()
    const icons: Array<string> = [] 
    const notSaveIcons: Array<string> = []
    
    console.log("Inciando Salvamento de Icones")
    for(const name of names) {
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
        } else {console.log(`Icones do personagem ${name} nao existe`); notSaveIcons.push(`Icones de ${name} nao existe`)}
    }

    console.log(`todas as ${icons.length} Icones salvas com sucesso`)
    if(notSaveIcons.length > 0) {
        const content = notSaveIcons.join('\n')
        await fs.writeFile(sourceLogs, content)
    }
    browser.close()
}

export const scrapySkill = async (): Promise<void> => {
    const browser = await chromium.launch()
    const source = path.resolve('dev/src/img/epic_seven/skills');
    const sourceLogs = path.resolve('dev/src/img/epic_seven/logs/Erro_save_Skills.txt')
    const names: Array<string> = await scapyNamesDb()
    const skils: Array<string> = [] 
    const notSaveSkils: Array<string> = []

    console.log("Inciando Salvamento das Skils")
    for (const name of names) {
        await browser.newContext({userAgent: getRandomUserAgent()})
        const page = await browser.newPage()
        page.setDefaultNavigationTimeout(240000);

        const response:any = await page.goto(`https://epic7db.com/images/skills/${name}_skill_3.webp`)
        const img = await response.body()
        const imagePath = path.join(source, `${name}skill3.webp`)

        if (img) {
            await fs.writeFile(imagePath, img)
            skils.push(name)
            console.log(`Skill de ${name} Salva com sucesso`)
            await page.close()
        } else {console.log(`Skill do personagem ${name} nao existe`); notSaveSkils.push(`Skill de ${name} nao existe`)}        
    }

    console.log(`todas as ${skils.length} Icones salvas com sucesso`)
    if(notSaveSkils.length > 0) {
        const content = notSaveSkils.join('\n')
        await fs.writeFile(sourceLogs, content)
    }
    await browser.close()
}