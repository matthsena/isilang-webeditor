import { useState, useEffect, useContext } from 'react'
import styled from "@emotion/styled";
import { generateHighlight } from '../services/highlight'
import httpRequest from '../services/httpRequest'
import { CurrentJavaCode } from '../context/JavaCode'

const EditorInput = styled.textarea`
    font-family: Roboto Mono, monospace;
    line-height:1.5em;
    padding: 1.25rem 1rem;
    tab-size: 4;
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
    font-family: Roboto Mono, monospace;
    line-height:1.5em;
    padding: 1.25rem 1rem;
    tab-size: 4;
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
    const { setJavaCode } = useContext(CurrentJavaCode)

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

    const generateJavaCode = () => {
        httpRequest(plainText)
            .then((res) => {
                setJavaCode(res)
            }).catch((error) => {
                console.error(error)
            })
    }

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