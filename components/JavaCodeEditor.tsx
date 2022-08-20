import { useContext } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { CurrentJavaCode } from '../context/JavaCode'
import styled from '@emotion/styled';

const Highlighter = styled(SyntaxHighlighter)`
position: absolute;
width: 100%;
height: 100%;
top: -0.5rem;
right: 0;
padding: 0 !important;
border: none !important;
border-radius: none !important;
`

export default function JavaCodeEditor() {
    const { code } = useContext(CurrentJavaCode)

    return (
        <Highlighter language="java" style={materialDark}>
            {`
            import java.util.Scanner;
            public class MainClass{ 
              public static void main(String args[]){
                   Scanner _key = new Scanner(System.in);
            double  potencia;
            double  logaritmo;
            double  logaritmo2;
            double  raiz;
            double  raiz2;
            double  potencia2;
            potencia = 5^3+7;
            raiz = sqrt(5);
            logaritmo = log9(20);
            potencia2 = potencia^3+7;
            raiz = sqrt(potencia);
            logaritmo = log9(raiz);
              }}
            
            `}
    </Highlighter>

     
        // <></>
        // // <Highlighter language="java" style={docco}>
        // //     {code}
        // // </Highlighter>
    )
}