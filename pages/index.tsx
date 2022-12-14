import type { NextPage } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'
import { useContext, useState } from 'react'
import IsiLangEditor from '../components/IsilangEditor'
import JavaCodeEditor from '../components/JavaCodeEditor'
import { CurrentJavaCode } from '../context/JavaCode'
import httpRequest from '../services/httpRequest'

const Body = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`
const Panel = styled.div`
  top: 3rem;
  position: absolute;
  height: calc(100vh - 3rem);
  width: 50vw;
  overflow: hidden;
`

const RightPanel = styled(Panel)`
  left: 0;
  background: #eee;
`

const LeftPanel = styled(Panel)`
  right: 0;
  background: #ddd;
`

const Navbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 3rem;
  background: #394859;
  z-index: 999;
`

const RunButton = styled.button`
  background: #59E340;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  color: #000;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &:hover {
    cursor: pointer;
    background: #95E886;
  }
`
const AlertMsg = styled.h3`
  position: fixed;
  bottom: 0;
  left: 2rem;
  width: calc(100vw - 5rem);
  z-index: 999;
  border-radius: 1rem;
  padding: 0.5rem;
  font-family: sans-serif;
  font-size: 1.25rem;
`

const ErrorMsg = styled(AlertMsg)`
  background: #E34234;
  color: #fff;
`

const WarningMsg = styled(AlertMsg)`
  background: #E3CB4B;
  color: #000;
`

const Home: NextPage = () => {
  const { plainText, setJavaCode } = useContext(CurrentJavaCode)
  const [currentError, setCurrentError] = useState<string | null>(null)
  const [currentWarning, setCurrentWarning] = useState<string | null>(null)

  const generateJavaCode = () => {
    httpRequest(plainText)
      .then((res) => {
        setJavaCode(res.data)
        setCurrentError(null)

        if (res.warning) {
          setCurrentWarning(res.warning)
        } else {
          setCurrentWarning(null)
        }
      }).catch((error) => {
        setCurrentError(error.message)
      })
  }

  return (
    <div>
      <Head>
        <title>IsiLanguage Web Editor</title>
        <meta name="description" content="Editor Web da linguagem IsiLanguage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <Navbar>
          <RunButton onClick={generateJavaCode}>
            Gerar c??digo Java
          </RunButton>
        </Navbar>

        <RightPanel>
          <IsiLangEditor />
        </RightPanel>

        <LeftPanel>
          <JavaCodeEditor />
        </LeftPanel>

        {currentError &&
          (<ErrorMsg>
            {currentError}
          </ErrorMsg>)}

          {currentWarning &&
          (<WarningMsg>
            {currentWarning}
          </WarningMsg>)}
      </Body>
    </div>
  )
}

export default Home
