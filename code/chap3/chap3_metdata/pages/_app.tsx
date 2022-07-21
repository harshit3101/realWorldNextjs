import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DataContext from '../components/dataContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState('bro bro');
  
  return (

    <DataContext.Provider value= {{data}}>
        <div>
          This is shared on all pages
        </div>
        <Component {...pageProps} />

    </DataContext.Provider>

  );
}

export default MyApp
