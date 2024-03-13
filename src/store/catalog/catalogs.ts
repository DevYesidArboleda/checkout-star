import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SimpleCatalog } from "../../../interfaces";

interface CatalogState {
  [key: string]: SimpleCatalog;
}

const getInitialState = () : CatalogState => {
  if ( typeof localStorage === 'undefined' ) return {};
  const catalogue = JSON.parse( localStorage.getItem( 'catalog' ) ?? '{}' );
  
  return catalogue;
}

const initialState: CatalogState = {
  ...getInitialState(),
  //"101624": { id: "101624", name: "Labial Permanente" },
};

const catalogsSlices = createSlice({
  name: "Catalogo",
  initialState,
  reducers: {
    toggleCatalog(state, action: PayloadAction<SimpleCatalog>) {
      const catalog = action.payload;
      const { id } = catalog;

      if (!!state[id]) {
        //delete state[id];
        state[id] = { ...state[id], ...catalog };
        // return;
      } else {
        state[id] = catalog;
      }

      localStorage.setItem("catalog", JSON.stringify(state));
    },
    resetCatalog(state) {
      // Reinicia el estado del catálogo
      localStorage.clear()
      return {};
    },
  },
});

export const { toggleCatalog, resetCatalog } = catalogsSlices.actions;

export default catalogsSlices.reducer;
