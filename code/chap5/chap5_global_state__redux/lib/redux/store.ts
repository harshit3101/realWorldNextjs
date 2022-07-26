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