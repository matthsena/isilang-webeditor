import { COLOR_CLASS, HIGHLIGHT_KEYS } from './highlightConfig'

type ColorClasses = "a" | "b" | "c"

const spanBuilder = (key: string, keyClass: ColorClasses): string => {
    if (key.match(/\(/g) && keyClass == "b") {
        const tmpKey = key.replace("(", "")
        return `<span style='color: ${COLOR_CLASS[keyClass]}'>${tmpKey}</span>(`
    }

    return `<span style='color: ${COLOR_CLASS[keyClass]}'>${key}</span>`
}

export const generateHighlight = (plainText: string): string => {
    let code = plainText

    HIGHLIGHT_KEYS.map(({ key, keyClass }) => {
        if (keyClass === "a" || keyClass == "c") {
            const regExp = new RegExp(`(${key}\\s|${key};|${key}$)`, 'g')
            const tokens = [...new Set(plainText.match(regExp))].map((e) => e.replace(";", ""))
            
            if (tokens.length) {
                tokens.map((token) => {
                    code = code.replaceAll(new RegExp(`${token}`, 'g'), spanBuilder(`${token}`, keyClass as ColorClasses))
                })
            }
        } else if (keyClass === "b") {
            const regExp = new RegExp(`${key}\\(`, 'g')
            const tokens = [...new Set(plainText.match(regExp))]

            if (tokens.length) {
                tokens.map((token) => {
                    if (token.match(/\(/g)) {
                        token = token.replace("(", "")
                        code = code.replaceAll(new RegExp(`${token}\\(`, 'g'), spanBuilder(`${token}(`, keyClass as ColorClasses))
                    } else {
                        code = code.replaceAll(new RegExp(`${token}`, 'g'), spanBuilder(`${token}`, keyClass as ColorClasses))
                    }
                })
            }
        }
        // SUBSTITUIÇOES FINAIS
        // // code = code.replaceAll(//g, "(")
        // const numberTokens = [...new Set(plainText.match(/[0-9]/gi))]
        // numberTokens.map((nbToken) => {
        //     code = code.replaceAll(new RegExp(nbToken, 'g'), spanBuilder(nbToken, "c"))
        // })
    })

    return code;
}