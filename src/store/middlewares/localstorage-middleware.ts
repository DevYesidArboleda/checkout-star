import { Action, Dispatch, MiddlewareAPI } from "@reduxjs/toolkit";
import { RootState } from "..";


export const localStorageMiddleware = ( state: MiddlewareAPI ) => { 
  return (next: Dispatch ) => (action: Action) => {

    next(action);

    if ( action.type === 'catalogue' ) {
      const { catalogo } = state.getState() as RootState;
        localStorage.setItem('catalog', JSON.stringify( catalogo ));
      return;
    }  

  }
}