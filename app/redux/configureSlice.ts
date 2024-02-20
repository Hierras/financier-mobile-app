import { createSlice } from "@reduxjs/toolkit";

export interface initialState {
    isMenuOpen: boolean,
    page: PageIntf,
}

const initialState = {
    isMenuOpen: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        openMenu: (state) => {state.isMenuOpen = !state.isMenuOpen}
    }
});

export const { openMenu } = appSlice.actions;
export default appSlice.reducer;