import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
              rel="preload"
              href="/_next/static/media/Raleway-Medium.88012bb1.ttf"
              as="font"
              type="font/ttf"
              crossOrigin="anonymous"
          />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
