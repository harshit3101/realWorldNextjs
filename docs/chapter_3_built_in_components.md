### Chapter 3: Next.js Built-In Components

- File based Routing system, out of the box.
- Client side navigation.
- Automatically Optimizing images.
- Managing metadata.
- How _app.js and _document.js used to add common functionality.

#### Routing System

- Next.js uses file based routing.
- Components created under ``/pages`` directory are available to routing system.
- We can use folder name or file name as path. (There shouldn't be conflicts).
- We can also create dynamic paths by naming files like this ([slug].js).

> A page in Next.js, is a React component exported from any of the .js, .jsx, .ts, or .tsx files inside the pages/ folder.

- Let's say we create index.tsx, about.tsx and [name].tsx (inside dynamic folder) under pages directory.
  - Then, <http://localhost:3000/> will render file at **/index.tsx**.
  - and <http://localhost:3000/about> will render file at **/about.tsx**.
  - and <http://localhost:3000/dynamic/{name}> will render file at **dynamic/[name].tsx**.
  
> **index.tsx** is created by default when use create-next-app tool.

```
pages/
  - index.tsx
  - about.tsx
  - dynamic/
      - index.tsx
      - [name].tsx
```

##### How to use route variables inside pages 

- To fetch it in page, We can use getServerSideProps function to dynamically get the [name] variable from the URL.
```

export async function getServerSideProps({params}) {
    // const name = params.name;

    const {name} = params;

    return {
        props: {
            name
        }
    };
}


function IndexPage(props) {
  
    return <div >You are {props.name}.</div>;
  
}
  
export default IndexPage;

```

What if we want to fetch it inside component not in page.

- To fetch dynamic variable in component, we can use ``useRouter`` hook.
It works just like any other react hook. In below example, we are taking query param from useRouter.

```

import { useRouter } from 'next/router';

function IndexPage() {

    const {query} = useRouter();
  
    return <div >You are {query.firstName} {query.last}.</div>;
  
}
  
export default IndexPage;
```

#### Client side navigation

- We use ``Link`` component provided by Next. 
- Next is very powerful, it prefetches data for those **Link** which are visible in viewport. (can be disabled using property ``preload={false}``)

```
import Link from "next/link";

function IndexPage() {


  return (
    <>
     <div >
      Welcome Harshit to Chapter 3
    </div>
    <br/>
    <div>
      <a href='/about'> About_emp_0_using a</a>
      <br/>
      <Link href='/about'>About_emp_1</Link>
      <br/>
      <Link href='/about/Harshit'>About_dynamic_emp_1</Link>
      <br/>
      <Link href='/about2/Garg/Harshit'>About2_dynamic_emp_1</Link>
      <br/>
      <Link href='/about2/Branson/Richard'>About2_dynamic_emp_2</Link>
      <br/>
      <Link href={{
        pathname: '/about2/[last]/[first]',
        query:{
          last: 'Dhoni',
          first: 'MS'
        }
      }}>About2_dynamic_emp_3</Link>
    </div>
    </>
  );

}

export default IndexPage;

```

- Another way to navigate is using ``useRouter`` hook. Yes, the same hook which we saw in previous section.

```
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PrivateComponent from '../components/Private';
import useAuth from '../hooks/auth';

function MyPage() 
  const router = useRouter();
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      router.push('/login')
    }
  }, [loggedIn]);

  return loggedIn ? <PrivateComponent /> : null;

}
export default MyPage;
```
> No prefetching here and it is not recommended to be used as default way f navigation.

#### Serving static assets

- Next.js makes is very easy to serve static assets. It provides ``/public`` folder, where every file is considered and served as a static asset.
- Try adding a ``test.txt`` file under directory ``/public``. You will be able to access it at <http://localhost:3000/test.txt>
- You can organize your js, css and files as per best practices. (By putting them in separate folder)

#### Automatic Image Optimization

- Cumulative Layout Shift (CLS), after image load complete Ui layout shifts which makes bad user experience.
- just like Link comp, Next.js provides a optimized component for use to display images. ``Image``.
- This optimization works on-demand, resizes, and renders the image only when the browser makes the request.
- Images are converted into **Webp** format if browser supports, else returned in same format.
- Next.js also provides a way to configure external image data source, images from this data source will be optimized by Next.Js.

```
module.exports = {
  images: {
    domains: ['domain.external.source']
  }
};
```
- This optimization is happening on the same server which can affect performance, we can do this using external services (For example: Cloudinary, etc.)
- We can update ``next.config.js`` file.
```
module.exports = {
  images: {
    loader: 'external',
    domains: ['domain.external.source']
  }
};
```

#### Handling metadata

- Metadata provides some basic information about the website. (Like a preview).
- This is not important for running a website, but this can surely help in improving SEO score.
- To update anything in ``<head>`` section of html page, Next.js provides ``Head`` component.
- Using **Head**, we can dynamically change metadata, links, scripts.

```
import Head from "next/head";
import { useContext } from "react";
import dataContext from "../../components/dataContext";

function IndexPage() {

   const {data} = useContext(dataContext);
  
    return (
       <>
         <Head>
        <title> About index </title>
        </Head>
        
        <div >You are Harshit.</div>

        <div> {data} from Context</div>
       </>
    );
  
}
  
export default IndexPage;
```
What if we want some common meta data on each page?

- Instead of adding above Head in each page, we can use files ``_app.js`` & ``_document.js`` provided by Next.js. These are present under ``pages/`` folder.

*_app.js*
```
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  return <Component {...pageProps} />

}

export default MyApp
```

- Let's try to update it. look at below example, we are adding a global context and div

```
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

```

>One important thing to remember when customizing the _app.js page is that it is not meant for running data fetching using getServerSideProps or getStaticProps, as other pages do.

>If, for some reason, you absolutely need to fetch data on the server side every time you want to render a page, you can still use the built-in getInitialProps function, but it has a cost. You'll lose automatic static optimization in dynamic pages, as Next.js will need to perform server-side rendering for every single page.
>If that cost is acceptable for your web app, you can use it.

- _app.js is used to customize, how each page will be rendered. But what if we want to customize ``<html>`` or ``<body>``. We can use ``_document.js`` file.
- Internally, Next.js uses ``Document`` class for creating this page. (This is created and internally).
- But we need to modify it, then we need to create ``_document.js`` file  under ``pages\`` directory.

```
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

```

> Components **Html**, **Head**, **Main**, **NextScript** && in file is mandatory in same order, otherwise your app will break.

> Checkout code examples under ``code`` package.
Run using yarn dev