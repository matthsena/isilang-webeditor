import { useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkCold } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CurrentJavaCode } from '../context/JavaCode'
import styled from '@emotion/styled';

const Highlighter = styled(SyntaxHighlighter)`
position: absolute;
width: 100%;
height: 100%;
top: -0.5rem;
border: none !important;
border-radius: none !important;
`

export default function JavaCodeEditor() {
  const { code } = useContext(CurrentJavaCode)

  return (
    <Highlighter language="java" style={coldarkCold}>
      {code}
    </Highlighter>
  )
}