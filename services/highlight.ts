import {COLOR_CLASS, HIGHLIGHT_KEYS } from './highlightConfig'

type ColorClasses = "a" | "b" | "c"

const spanBuilder = (key: string, keyClass: ColorClasses): string => {
    return `<span style='color: ${COLOR_CLASS[keyClass]}'>${key}</span>`
}

export const generateHighlight = (plainText: string): string => {
    let code = plainText

    HIGHLIGHT_KEYS.map(({key, keyClass}) => {
        const regExp = new RegExp(`(${key}\\s|${key};)`, 'g')
        const tokens = [...new Set(plainText.match(regExp))].map((e) => e.replace(";", ""))

        if (tokens.length) {
            tokens.map((token) => {
                code = code.replaceAll(new RegExp(`${token}`, 'g'), spanBuilder(`${token}`, keyClass as ColorClasses))
            })
        }
    })

    return code;
}