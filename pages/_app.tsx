import type { AppProps } from 'next/app'
import JavaCodeContext from '../context/JavaCode'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <JavaCodeContext>
      <Component {...pageProps} />
    </JavaCodeContext>
  )
}

export default MyApp
