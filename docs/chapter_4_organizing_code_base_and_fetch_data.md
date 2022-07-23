
### Chapter 4: Organizing the Code Base and Fetching Data in Next.js

>Organizing our components using the atomic design principle
Organizing our utility functions
Organizing static assets neatly
An introduction to organizing styling files
What lib files are and how to organize them
Consuming REST APIs and Graph Apis on both client and sever side

#### Organizing folder structure

- We should organize our project neatly from the start to avoid complexities later.
- This will help in keeping our code base scalable and maintainable.

Default next.js folder structure.

```
next-js-app

  - node_modules/

  - package.json

  - pages/

  - public/

  - styles/
```

- Next.js allows us to move ``pages/`` under ``src/`` folder. This will make our code base a bit tidier. (Except for the ``public/`` and ``node_modules``)

#### Organizing Components.

- We need to organize our configurations files, components, utlities, styles properly.
- While, there can be many ways of organizing our components, we will use
atomic design approach.

> **Atomic approach** says to divide our components into different levels so as to organize our code base better.
> atoms, molecules, organisms, templates.

```
- src/
  - components/
    - atoms/
    - molecules/
    - organisms/
    - templates/
```

- For example, we can create a ``button`` component in  ``atoms/`` folder.

```
- components/
    - atoms/
      - button/
        - index.tsx
        - button.test.ts
        - button.styled.ts
```
> If you notice, we have created three files. 1 actual component, 1 test file, 1 styles file.

#### Organizing utilities

- These will be common logic needed to use on different pages.
- It will allow us to follow DRY principle.
- Just like above, we can create ``utilities/`` folder.

```
- src/
  - utilities/
    - logging.ts
```

#### Organizing static assests

- static files can be js, images, css, icons, manifest.json , robot.txt and other.
- Similarly, we can create different folders for all assets

```
- public/
  - manifest.json
  - robot.txt
  - aseets/
    - js/
    - css/
    - images/
    - icons/
```

- ``mnaifest.json`` file is used to create PWA (progressive web applications)

#### Lib files

- When we talk about lib, we are refering to scripts that hold logic for third party libraries.
- utilities are generic logic, lib are for library specific logic.
- For example, we want to use GraphQL in our application.
- we can create ``graphql/`` under ``lib/`` directory.

```
- lib/
  - graphql/
    - index.js
    - queries/
        - query1.js
        - query2.js
      - mutations/
        - mutation1.js
        - mutation2.js
```

#### Data Fetching 

- We can use any Node.js Http client which works on server side.
- We can make this call inside ``getStaticProps`` or ``getServerSideProps``.
- Axios is isomorphic http client which works on both client and server side.

> Though it is possible to connect to data base from Next.js app, but it is recommended to use a external app for delegating database handling.

##### Consuming Rest APIs

 ###### Server Side

 - non dynamic

 ```
import axios from "axios";
import Head from "next/head";

export async function getServerSideProps() {
    const res = await axios.get('https://api.adviceslip.com/advice');

    return {
        props: {
            advice: res.data
        }
    }
}

function IndexPage(props: any) {
    let {slip} = props.advice;
    return (
       <>
        <div >Advice id: : {slip.id}</div>
        <div >Advice fetched : {slip.advice}</div>
       </>
    );
}
export default IndexPage;
 ```
 - dynamic
 ```
 import axios from "axios";
import Head from "next/head";

export async function getServerSideProps(params: any) {
    const {id} = params.query;
    const res = await axios.get(`https://api.adviceslip.com/advice/${id}`);

    return {
        props: {
            advice: res.data
        }
    }
}

function IndexPage(props: any) {
    let {slip} = props.advice;
    return (
       <>
        <div >Advice id: : {slip.id}</div>
        <div >Advice fetched : {slip.advice}</div>
       </>
    );
}
export default IndexPage;
 ```

 > Instead of hardcoding url, we can also set url in environment variable using ``.env`` file.
 Next.js has built-in support for .env and .env.local files, so you don't have to install external libraries to access those environment variables. 

 ###### Client Side

 Similar to how we do in react. We can make calls inside component instead of  getServerSideProps and getStaticProps functions.

  - Non dynamic

  ```
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";


function IndexPage() {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {
        setLoading(true);

        setTimeout(() => {
            axios.get(`${process.env.NEXT_PUBLIC_ADVICE_SLIP_ENDPOINT}`)
            .then(res => {setData(res.data);setLoading(false);})
        }, 1000);
    }, []);

    if(loading) {
        return (
            <>
            <div> Client Side</div>
            <div> Loading...</div>
            </>
        );
    } else {
        return (
            <>
             <div> Client Side</div>
             <div >Advice id: : {data?.slip.id}</div>
             <div >Advice fetched : {data?.slip.advice}</div>
            </>
         );
    }
}
export default IndexPage;
  ```

  - Dynamic

  ```
  import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(params:any) {
    const {id} = params.query;

    return {
        props: {
            id
        }
    }
}

function IndexPage({id} : any) {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect( () => {
        setLoading(true);
        setTimeout(() => {
            axios.get(`https://api.adviceslip.com/advice/${id}`)
            .then(res => {setData(res.data);setLoading(false);})
        }, 1000);
    }, []);

    if(loading) {
        return (
            <>
            <div> Client Side</div>
            <div> Loading...</div>
            </>
        );
    } else {
        return (
            <>
             <div> Client Side</div>
             <div >Advice id: : {data?.slip.id}</div>
             <div >Advice fetched : {data?.slip.advice}</div>
            </>
         );
    }
}
export default IndexPage;
  ```

##### Consuming Graph APIs

- GraphQL has been a game-changer in the API world, and it is increasing its popularity thanks to its ease of use, modularity, and flexibility.
- It is a query language for APIs.
- Avoid data over-fetching, get multiple resources in 1 request, avoiding api versioning etc.
- we need these dependencies installed in our next app.

```
yarn add @apollo/client graphql isomorphic-unfetch
```
GraphQL uses browser fetch api and to make it work on server we need to use ``isomorphic-unfetch``.

- For Code Demp, i am using <https://github.com/trevorblades/countries> graph api 
> https://countries.trevorblades.com/graphql

##### Set up client

```
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { useMemo } from "react";

let apolloClient: ApolloClient<any>;

let uri = `${process.env.NEXT_PUBLIC_APOLLO_COUNTRIES_URI}`;

let apolloConfigs = {
    ssrMode: typeof window === 'undefined',
    link: new HttpLink({uri}),
    cache: new InMemoryCache()
}

function createApolloClient() {
    return new ApolloClient(apolloConfigs);
}

export function initApollo(initialState: any): ApolloClient<any> {
    const client = apolloClient || createApolloClient();
    if (initialState) {
    client.cache.restore({
      ...client.extract(),
      ...initialState
    });
  }

  if (typeof window === "undefined") {
    return client;
  }
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function useApollo(initialState: any) {
    return useMemo(
      () => initApollo(initialState),
      [initialState]
    );  
}
```

##### Quering static query (India country data)
```

export const GET_COUNTRY_INDIA = gql`
query Query {
    country(code: "IN") {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;


import { useQuery } from "@apollo/client";
import { GET_COUNTRY_INDIA } from "../lib/apollo/queries";

function IndexPage() {
  const {loading, data} = useQuery(GET_COUNTRY_INDIA, {
    fetchPolicy: 'no-cache'
  })
  
if(loading) {
    return (
        <>
        <div> Client Side</div>
        <div> Loading...</div>
        </>
    );
} else {
    return (
        <>
         <div> Client Side</div>
         <div >Country data : {JSON.stringify(data)} </div>
        </>
     );
}  
}
export default IndexPage;
```

##### Quering dynamic server side country data

```
export const GET_COUNTRY_BY_CODE = gql`
query Query($code: ID!) {
    country(code: $code) {
      name
      native
      capital
      emoji
      currency
      languages {
        code
        name
      }
    }
  }
`;

import { useQuery } from "@apollo/client";
import { GET_COUNTRY_BY_CODE } from "../../lib/apollo/queries";


export async function getServerSideProps(input: any){
    const {code} = input.params;

    return {
        props: {
            code
        }
    };
}

function IndexPage(props: any) {

  const {loading, data} = useQuery(GET_COUNTRY_BY_CODE, {
    fetchPolicy: 'no-cache',
    variables: {
        code: props.code
    }
  })

if(loading) {
    return (
        <>
        <div> Client Side</div>
        <div> Loading...</div>
        </>
    );
} else {
    return (
        <>
         <div> Client Side</div>
         <div >Country data : {JSON.stringify(data)} </div>
        </>
     );
}
    
}
export default IndexPage;
```

> If you notice above code snippets, ``useQuery`` hook from apollo client provides, loading and data properties. We can use these two for creating our components.

- Similar to queries, we can do mutations as well in graphQL. 