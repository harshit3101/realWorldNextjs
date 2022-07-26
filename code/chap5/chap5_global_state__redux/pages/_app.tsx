import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { useStore } from '../lib/redux/store';
import Header from '../components/header';


function MyApp({ Component, pageProps }: AppProps) {

  const reduxStore = useStore(pageProps.initialReduxState)

  return (
  <Provider store={reduxStore}>
    <Header/>
    <Component {...pageProps} />
  </Provider>
  );
}

export default MyApp
