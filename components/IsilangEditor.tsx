import { useState, useEffect } from 'react'
import styled from "@emotion/styled";
import { generateHighlight } from '../services/highlight'

const EditorInput = styled.textarea`
    font-family: sans-serif;
    padding: 1rem;
    position: absolute;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    z-index: 2;
    background: transparent;
    border: none;
    overflow: auto;
    outline: none;
    resize: none;
    font-size: 16px;
    color: transparent;
    caret-color: black;
`

const EditorHighlights = styled.div`
    font-family: sans-serif;
    padding: 1rem;
    position: absolute;
    width: calc(100% - 2rem);
    height: calc(100% - 2rem);
    width: 100%;
    height: 100%;
    z-index: 1;
    background: #fff;
    white-space: pre-wrap;
    font-size: 16px;
    color: #000;
`

export default function IsiLangEditor() {
    const [plainText, setPlainText] = useState('')
    const [highlightText, setHighlightText] = useState('')

    function checkTab(e: any) {
        const value = plainText;

        if (e.key == 'Tab') {
            e.preventDefault();
            const cursorPosition = e.target.selectionStart;
            const cursorEndPosition = e.target.selectionEnd;

            let tmpValue = `${value.substring(0, cursorPosition)}\t${value.substring(cursorEndPosition)}`

            setPlainText(tmpValue)
        }
    }

    useEffect(() => {
        const code = generateHighlight(plainText)

        setHighlightText(code)
    }, [plainText])


    return (
        <>
            <EditorInput spellCheck={false} value={plainText} onKeyDown={e => checkTab(e)} onChange={e => setPlainText(e.target.value)}></EditorInput>
            <EditorHighlights
                dangerouslySetInnerHTML={{
                    __html: highlightText
                }}>
            </EditorHighlights>
        </>
    )
}