import { createStylesServer, ServerStyles } from '@mantine/next'
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { rtlCache } from '../lib/rtl-cache'

const stylesServer = createStylesServer(rtlCache)

export default class _Document extends Document {
  static async getInitailProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key='styles'
        />,
      ],
    }
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
