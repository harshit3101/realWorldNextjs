### Chapter 2: Different Rendering Strategies

- Next.js let us decide which page should be rendered at build time and which page should be rendered at run time.
- How to render a page using server side rendering.
- How to render certain components on the client side only.
- How to regenerate  static pages (rendered at build time) using ISR (incremental static rendering)


**Hydration** is a techinique of adding java script to  dom elements after html is rendered in browser

#### Server-side rendering (SSR)
-  Render each request on the server making it dynamic.
- Next.Js inject scripts related to page rendered to make it interactive using **hydration**.
- **Advantages** :
    - Secure Application.
    - SEO improvement.
> to enable ssr for a page, use reserved ``getServerSideProps `` function

- you need to export above function like below 

```
export async function getServerSideProps() {
    let time = new Date().getTime();
    return {
      props: {
        browser: false,
        time: time
      }
    }
  }
  function IndexPage(props) {
    const side = props.browser ? 'client' : 'server';
    return <div>You are currently on the {side}-side and time is {props.time} </div>;
  }
  export default IndexPage;
```

#### Client side Rendering (CSR)
- Next.js allows to create normal react components.
- These pages will be rendered at client side again (NextJs will render them during build time as well).
- Browser specific should be called during CSR to avoid build crash. (For example: inside ``useEffect()`` hook)


you need to write like below

```
import { useEffect, useState } from "react";

function IndexPage() {
  
    let [isBrowser, setIsBrower] = useState(process.browser);
    let [time, setTime] = useState(new Date().getTime());
    
    useEffect(()=> {
        setIsBrower(process.browser);
        setTime(new Date().getTime());
    })

    const side = isBrowser ? 'client' : 'server';
  
    return <div>You are currently on the {side}-side and time is {time} </div>;
  
}
  
export default IndexPage;
```

- we can also use Next.js dynamic function to avoid server side rendering at all.
Example code :

```
import { useEffect, useState } from "react";


const myReactComp = dynamic(

  () => import('../components/myReactComp'),

  { ssr: false }

);

function IndexPage() {
  
    let [isBrowser, setIsBrower] = useState(process.browser);
    let [time, setTime] = useState(new Date().getTime());
    
    useEffect(()=> {
        setIsBrower(process.browser);
        setTime(new Date().getTime());
    })

    const side = isBrowser ? 'client' : 'server';
  
    return (
        <div>You are currently on the {side}-side and time is {time} 
        <myReactComp/>
        </div>
    );
  
}
  
export default IndexPage;
```

#### Static Site Generation (SSG)
- Render each page during build time.
- Useful for pages which are not changed much.
- Just like SSR, these pages will become interactive using React hydration process.
- **Advantages** :
    - Scalable (These static html can be served from cdn).
    - There is no data fetching, so serving pre-rendered file is fast.

- **Problem**:
    - What if we want to modify data after the change. 
    - Welcome ISR (Incremental static regeneration).
    - We can specify in SSG pages using ``revalidate`` property, how long should we wait before re generating it.
    - ISR is hybrid apporach and somewhere between SSR and SSG.

> to enable SSG for a page, use reserved ``getStaticProps `` function

- you need to export above function like below 
```
export async function getStaticProps() {
    let time = new Date().getTime();
  
    return {
      props: {
        browser: false,
        time: time
      },
      revalidate: 20
    }
  }
  
  function IndexPage(props) {
  
    const side = props.browser ? 'client' : 'server';
  
    return <div>You are currently on the {side}-side and time is {props.time} </div>;
  
  }
  
  export default IndexPage;
```



> Using different approach based on requirement, we can decide which page should be rendered at build time (SSG) or run time (SSR).