import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lang } from "../lang";
import storage from "../Storage";

export interface initialStateIntf {
    isMenuOpen: boolean,
    modal: string | null,
    defaultCurrency: string | null,
    language: string | null,
    data: any,
    curMove: string
};

let language = null;
let currency = null;

export const setStoragedConfig = createAsyncThunk(
    'app/asyncStorageConfig', 
    async () => {
        const config = [];
        // Загрузка языка
        config[0] = await storage
            .load({
                key: 'langState',
                autoSync: true,
                syncInBackground: true
            })
            .then(ret=>{
                return ret;
            })
            .catch(e=>{
                return null;
            });
        // Загрузка валюты
        config[1] = await storage
            .load({
                key: 'currencyState',
                autoSync: true,
                syncInBackground: true
            })
            .then(ret=>ret)
            .catch(()=>null);
        return config;
    }
)

const initialState: initialStateIntf = {
    isMenuOpen: false,
    modal: null,
    defaultCurrency: currency,
    language,
    data: lang.eng,
    curMove: 'curDepInc'
}
// Слайс управления приложением и настроек
export const appSlice = createSlice({
    name: 'app',
    initialState,
    extraReducers: (builder)=>{
        builder
            .addCase(setStoragedConfig.fulfilled, (state, action)=>{
                state.language = action.payload[0];
                state.data = (state.language === 'ru') ? lang.ru : lang.eng;
                state.defaultCurrency = action.payload[1];
            })
    },
    reducers: {
        openMenu: (state) => {state.isMenuOpen = !state.isMenuOpen},
        setModal: (state, action) => {state.modal = action.payload},
        setLang: (state, actions) => {
            state.language = actions.payload;
            state.data = (state.language === 'ru') ? lang.ru : lang.eng;

            storage.save({
                key: 'langState',
                data: state.language
            });
        },
        setCurrency: (state, actions) => {
            state.defaultCurrency = actions.payload;
            storage.save({
                key: 'currencyState',
                data: state.defaultCurrency
            });
        },
        changeCurMove: (state) => {
            if (state.curMove === 'curDepInc') state.curMove = 'curDepDec';
            else state.curMove = 'curDepInc';
        }
    }
});


export const { openMenu, setLang, setCurrency, setModal, changeCurMove } = appSlice.actions;
export default appSlice.reducer;