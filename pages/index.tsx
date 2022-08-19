import type { NextPage } from 'next'
import Head from 'next/head'
import styled from '@emotion/styled'

const Body = styled.div`
  box-sizing: border-box;
  padding: 0;
  margin: 0;
`
const Panel = styled.div`
  top: 0;
  position: absolute;
  height: 100vh;
  width: 50vw;
`

const RightPanel = styled(Panel)`
  left: 0;
  background: #eee;
`

const LeftPanel = styled(Panel)`
  right: 0;
  background: #ddd;
`

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>IsiLanguage Web Editor</title>
        <meta name="description" content="Editor Web da linguagem IsiLanguage" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <RightPanel></RightPanel>

        <LeftPanel></LeftPanel>
      </Body>
    </div>
  )
}

export default Home
