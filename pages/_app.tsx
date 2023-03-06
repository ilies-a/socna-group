import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ReduxWrapper from '@/components/redux-wrapper/redux-wrapper.component'
import PreloadWrapper from '@/components/preload-wrapper/preload-wrapper.component'

export default function App({ Component, pageProps }: AppProps) {
  return <ReduxWrapper>
    <PreloadWrapper>
      <Component {...pageProps} />   
    </PreloadWrapper>   
  </ReduxWrapper>

}
