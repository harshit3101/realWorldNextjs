import { useMemo } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
let store: any;


const reducer_count = (state = 0, action: { type: any, payload: any  }) => {
    switch (action.type) {

      case 'INCREMENT': {
        return state + 1;
      
      }
      case 'DECREMENT': {
        return state - 1; 
      }
      default:
        return state;
    }
};

const reducer_CSS = (state = false, action: { type: any, payload: any }) => {
 
  switch (action.type) {
    case 'GLOBAL_CSS': {
      let flag = action.payload;
      return flag;
    }
   
    default:
      return state;
  }
};

const rootReducers = combineReducers({
  count: reducer_count,
  global:reducer_CSS
});

function initStore(preloadedState: any) {
    return createStore(
      rootReducers,
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