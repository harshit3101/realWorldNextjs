import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react';
import CountContext from '../comp/context/countContext';

function MyApp({ Component, pageProps }: AppProps) {

  const [count, setCount] = useState(0);

  return (
  <CountContext.Provider value= {{count, setCount}}>
    <div> count in Header is {count}</div>
    <Component {...pageProps} />
  </CountContext.Provider>
  );
}

export default MyApp
