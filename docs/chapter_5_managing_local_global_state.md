### Chapter 5: Managing Local and Global States in Next.js

- To make UI interactive, we need to manage state in out web app.
- For an example, theme switch on UI.
- In React, 
    - Local state in components using ``useState`` hook.
    - Global state in components using ``createContext`` ``useContext`` hook.
- Need global state management solution because data flow in react is unidirectional.
- Mostly, libraries like Redux is used for managing global state. 
- They makes is to easy to visualize state changes and debugging app state changes become easy by using good extensions lie "redux dev tools"
- we also use Apollo Client (and its in-memory cache)

##### Local state management
- The state which is component scoped.
- Using ``useState``hook
```
import type { NextPage } from 'next'
import { useState } from 'react'

const Home: NextPage = ({ initialCount = 0 } : any) => {

const [count, setCount] = useState(initialCount);

  return (
    <div>
        count in component is : {count}
        <br/>
      <button
        onClick={() => setCount(count+1)}>
            Increment +
      </button>

      <br/>
      <button
        onClick={() => setCount(count-1)}>
            Decrement +
      </button>

    </div>
  )
}

export default Home
```

##### Global state management

- To maintain same state for all components globally in one place.
    ###### Using React Context APi

    ```
    import { createContext } from "react";

    const countContext = createContext<any>({});

    export default countContext;


    import type { NextPage } from 'next'
    import { useContext, useState } from 'react'
    import countContext from '../comp/context/countContext';

    const Home: NextPage = ({ initialCount = 0 } : any) => {

    const {count, setCount} = useContext(countContext);

    return (
        <div>
            count in component is : {count}
            <br/>
        <button
            onClick={() => setCount(count+1)}>
                Increment +
        </button>

        <br/>
        <button
            onClick={() => setCount(count-1)}>
                Decrement +
        </button>

        </div>
    )
    }

    export default Home

    ```

    ###### Using Redux store manager

    ```
    --- store.ts
    import { useMemo } from 'react';
    import { createStore, applyMiddleware } from 'redux';
    import { composeWithDevTools } from 'redux-devtools-extension';
    let store: any;
    const initialState : any = {count: 0};

    const reducer = (state = initialState, action: { type: any; }) => {
        switch (action.type) {

        case 'INCREMENT': {
            return {
            count: state.count+ 1
            };
        }
        case 'DECREMENT': {
            return {
                count: state.count-1
            };
        }
        default:
            return state;
        }
    };

    function initStore(preloadedState = initialState) {
        return createStore(
        reducer,
        preloadedState,
        composeWithDevTools(applyMiddleware())
        );
    }

    export const initializeStore = (preloadedState: any) => {
        let _store = store ?? initStore(preloadedState);
        if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        });
        store = undefined;  
        }
        //Return '_store' when initializing Redux on the server-side
        if (typeof window === 'undefined') return _store;
        if (!store) store = _store;
    
        return _store;
    
    };

    export function useStore(initialState: any) {
        return useMemo(
        () => initializeStore(initialState), [initialState]
        );  
    }

    ---- page.tsx
    import type { NextPage } from 'next';
    import { useDispatch } from 'react-redux';
    import { useStoreSelector } from '../lib/redux/selectors/selector';


    const Home: NextPage = ({ initialCount = 0 } : any) => {
    const disPatcher= useDispatch();
    const {count} = useStoreSelector();

    return (
        <div>
            count in component is {count} :
            <br/>
        <button
            onClick={() => disPatcher({type: 'INCREMENT'})}>
                Increment +
        </button>

        <br/>
        <button
            onClick={() => disPatcher({type: 'DECREMENT'})}>
                Decrement +
        </button>

        </div>
    )
    }

    export default Home

    ```
- If use case is simple, better to use context to avoid complexities of redux.
- But, if we want to manage a single store state for our app, then using redux it becomes easy to debug using dev extension tool.