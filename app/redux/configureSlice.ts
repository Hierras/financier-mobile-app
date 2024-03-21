import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { lang } from "../lang";
import storage from "../Storage";

export interface initialStateIntf {
    isMenuOpen: boolean,
    defaultCurrency: string | null,
    language: string | null,
    data: any
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
    defaultCurrency: currency,
    language,
    data: lang.eng
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
        }
    }
});


export const { openMenu, setLang, setCurrency } = appSlice.actions;
export default appSlice.reducer;