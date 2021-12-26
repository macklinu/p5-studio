import { AppProps } from 'next/app'
import 'src/globalStyles.css'
import 'src/styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
