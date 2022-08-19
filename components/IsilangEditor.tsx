import { useState } from 'react'
import styled from "@emotion/styled";

const EditorInput = styled.textarea`
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
`

const EditorHighlights = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: red;
`


export default function IsiLangEditor() {
    const [plainText, setPlainText] = useState('')

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

    return (
        <>
            <EditorInput value={plainText} onKeyDown={e => checkTab(e)} onChange={e => setPlainText(e.target.value)}></EditorInput>
            <EditorHighlights></EditorHighlights>
        </>
    )
}