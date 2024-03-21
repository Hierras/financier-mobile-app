import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Icons } from "../Types/Icons";
import { Currency } from "../Types/Currencies"; 
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../colors";
import { countCurrency, getCurrencyValue, getDefaultValue, getRates } from "../componetns/axios/getCurrencies";
import storage from "../Storage";

export interface Deposit {
    id: number,
    title: string,
    icon: IconDefinition,
    color: string,
    currency: string,
    total: number,
    increases: Operation[],
    decreases: Operation[],
    profit: number,
};
export const defaultDeposit: Deposit = {
    id: -1,
    title: "",
    icon: Icons[0],
    color: colors.main,
    currency: Currency.RUB,
    total: 0.00,
    increases: [],
    decreases: [],
    profit: 0.00,
};
export interface Operation {
    date: string,
    id: number,
    title: string,
    icon: IconDefinition,
    color: string,
    type: boolean,
    total: number
};

export const defaultOperation: Operation = {
    date: new Date(0).toISOString(),
    id: -1,
    title: "",
    icon: Icons[0],
    color: colors.main,
    type: false,
    total: 0.00
};

interface initialStateInt {
    deposits: Deposit[],
    currentDeposit: Deposit,
    currentOperation: Operation,
    lastDeposit: Deposit,
    lastOperation: Operation,
    total: {count:number, error: null | string, loading: string},
    profit: {count:number, error: null | string, loading: string},
};
const initialState: initialStateInt = {
    deposits: [],
    currentDeposit: defaultDeposit,
    currentOperation: defaultOperation,
    lastDeposit: defaultDeposit,
    lastOperation: defaultOperation,
    profit: {count:0.00, error: null, loading: 'idle'},
    total: {count:0.00, error: null, loading: 'idle'}
};

/* storage deposits */
export const getDepoistStorage = createAsyncThunk(
    'wallet/setDeposits',
    async () => {
        return await storage
                .load({
                    key: 'depositsState',
                    autoSync: true,
                    syncInBackground: true
                })
                .then(ret=>ret)
                .catch(()=>[]);
    }
);
/* Расчёт total */
export const getTotal = createAsyncThunk(
    'wallet/getTotal',
    async (defaultCurrency: null | string, {rejectWithValue})=>{
        return await getRates(defaultCurrency, rejectWithValue);
    }
)
/* Расчёт профита */
export const getProfit = createAsyncThunk(
    'wallet/getProfit',
    async (defaultCurrency: null | string, {rejectWithValue})=>{
        return await getRates(defaultCurrency, rejectWithValue);
    }
)


// Расчёт нового тотала и профита по счёту
function calculateTotalProfit(deposit: Deposit, type: boolean) {
    // берём последнюю запись и добавляем в тотал и профит
    let total = deposit.total;
    let profit = deposit.profit;

    if (!type) {
        total += deposit.increases[deposit.increases.length-1].total;
        profit += deposit.increases[deposit.increases.length-1].total;
    }
    else {
        total -= deposit.decreases[deposit.decreases.length-1].total;
        profit -= deposit.decreases[deposit.decreases.length-1].total;
    }

    return [total, profit];
}

/* Описание actions */
export const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    extraReducers: (builder)=>{
        builder
            .addCase(getTotal.pending, (state)=>{
                state.total.loading = 'pending';
            })
            .addCase(getTotal.fulfilled, (state, action)=>{
                const {rates, defaultCurrency} = action.payload;
                
                let total = 0;
                const deposits = state.deposits;
                for (let key in deposits) {
                    let c1: number | null = getCurrencyValue(rates, defaultCurrency);
                    let c2: number | null = getCurrencyValue(rates, deposits[key].currency);
                    if (defaultCurrency === deposits[key].currency) {
                        c1 = null;
                        c2 = null;
                    }
                    if (defaultCurrency === 'RUB') c1 = null;
                    if (deposits[key].currency === 'RUB') c2 = null;
                    total += countCurrency(c1, c2, deposits[key].total);
                }
                const stateTotal = {count:total, error: null, loading: 'idle'};
                state.total = stateTotal;
            })
            .addCase(getTotal.rejected, (state, action)=>{
                const defaultCurrency = action.payload;
               
                let total = 0;
                for (let key in state.deposits) {
                    if (state.deposits[key].currency === defaultCurrency) {
                        total += state.deposits[key].total;
                    }
                }
                
                const stateTotal = {count:total, error: null, loading: 'idle'};
                state.total = stateTotal;
            })
            .addCase(getProfit.pending, (state)=>{
                state.profit.loading = 'pending';
            })
            .addCase(getProfit.fulfilled, (state, action)=>{
                const {rates, defaultCurrency} = action.payload;
                
                let profit = 0;
                const deposits = state.deposits;
    
                for (let key in deposits) {
                    let c1: number | null = getCurrencyValue(rates, defaultCurrency);
                    let c2: number | null = getCurrencyValue(rates, deposits[key].currency);
                    if (defaultCurrency === deposits[key].currency) {
                        c1 = null;
                        c2 = null;
                    }
                    if (defaultCurrency === 'RUB') c1 = null;
                    if (deposits[key].currency === 'RUB') c2 = null;
                    profit += countCurrency(c1, c2, deposits[key].profit);
                }
                const stateProfit = {count:profit, error: null, loading: 'idle'};
                state.profit = stateProfit;
            })
            .addCase(getProfit.rejected, (state, action)=>{
                const defaultCurrency = action.payload;
                state.profit.loading = 'idle';
                let profit = 0;
                for (let key in state.deposits) {
                    if (state.deposits[key].currency === defaultCurrency) {
                        profit += state.deposits[key].profit;
                    }
                }
                const stateProfit = {count:profit, error: null, loading: 'idle'};
                state.profit = stateProfit;
            })
            .addCase(getDepoistStorage.fulfilled, (state, action)=>{
                state.deposits = action.payload;
                if (action.payload.length)
                    state.currentDeposit = state.deposits[0];
                else state.currentDeposit = defaultDeposit;
            });
    },
    reducers: {
        addDeposit: (state) => {
            state.deposits = [...state.deposits, state.currentDeposit];
            storage.save({
                key: 'depositsState',
                data: state.deposits
            });
        },
        removeDeposit: (state, action) => {
            state.deposits = state.deposits.filter((v)=>v.id !== action.payload);
        
            if (state.currentDeposit.id === action.payload.id) {
                if (state.deposits.length === 0)
                    state.currentDeposit = {...defaultDeposit};
                else
                    state.currentDeposit = {...state.deposits[state.deposits.length-1]};
            }
            storage.save({
                key: 'depositsState',
                data: state.deposits
            });
        },
        increaseDeposit: (state) => {
            const id = 
                state.deposits.findIndex((el)=>el.id === state.currentDeposit.id);
            if (id !== -1) {
                // Добавляем доход
                if (state.deposits[id].increases.length === 0)
                    state.currentOperation.id = 0;
                else
                    state.currentOperation.id =
                        state.deposits[id].increases[
                            state.deposits[id].increases.length-1
                        ].id+1;
                state.currentOperation.date = new Date().toISOString();         
                state.deposits[id].increases = 
                    [...state.deposits[id].increases, state.currentOperation];
                const [total, profit] = calculateTotalProfit(state.deposits[id], false);
                state.deposits[id].total = total;
                state.deposits[id].profit = profit;
            }
            storage.save({
                key: 'depositsState',
                data: state.deposits
            });
        },
        decreaseDeposit: (state) => {
            const id = 
                state.deposits.findIndex((el)=>el.id === state.currentDeposit.id);
            if (id !== -1) {
                // Добавляем расход
                if (state.deposits[id].decreases.length === 0)
                    state.currentOperation.id = 0;
                else
                    state.currentOperation.id =
                        state.deposits[id].decreases[
                            state.deposits[id].decreases.length-1
                        ].id+1;
                state.currentOperation.date = new Date().toISOString();  
                state.deposits[id].decreases = 
                    [...state.deposits[id].decreases, state.currentOperation];

                const [total, profit] = calculateTotalProfit(state.deposits[id], true);
                state.deposits[id].total = total;
                state.deposits[id].profit = profit;
                storage.save({
                    key: 'depositsState',
                    data: state.deposits
                });
            }
        },

        setCurrentDeposit: (state, action: PayloadAction<{ key: string; value: any }>) => {
            const {key, value} = action.payload;

            if (key === 'full') {
                if (state.deposits.length > 0)
                    state.currentDeposit = state.deposits[
                        state.deposits.length-1
                    ];
                else state.currentDeposit = {...defaultDeposit};
            }
            else if (key === 'all') {
                state.lastDeposit = {...state.currentDeposit};
                state.currentDeposit = {...value};
                
            }
            else state.currentDeposit[key] = value;         
        },
        setCurrentOperation: (state, action: PayloadAction<{ key: string; value: any }>) => {
            const {key, value} = action.payload;

            if (key === 'full') {
                if (state.currentOperation.type){

                    if (state.currentDeposit.decreases.length > 0)
                        state.currentOperation =
                            state.currentDeposit.decreases[
                                state.currentDeposit.decreases.length-1
                            ]
                    else state.currentOperation = {...defaultOperation};
                }
                else{
                    if (state.currentDeposit.increases.length > 0)
                        state.currentOperation =
                            state.currentDeposit.increases[
                                state.currentDeposit.increases.length-1
                            ]
                    else state.currentOperation = {...defaultOperation};
                }
            }
            else if (key === 'all') {
                state.lastOperation = {...state.currentOperation};
                state.currentOperation = {...value};
            }
            else state.currentOperation[key] = value;     
        },
        setDefaultDeposit: (state) =>{
            state.currentDeposit = {...defaultDeposit};
        },
        setDefaultOperation: (state) =>{
            state.currentOperation = {...defaultOperation};
        },
        setLastDeposit: (state) => {
            state.lastDeposit = {...state.currentDeposit};
        },
        setLastOperation: (state) => {
            state.lastOperation = {...state.currentOperation};
        },
        clearData: (state) => {
            state.currentDeposit = {...defaultDeposit};
            state.currentOperation = {...defaultOperation};
            state.deposits = [];
            state.lastDeposit = {...defaultDeposit};
            state.lastOperation = {...defaultOperation};
            storage.remove({
                key: 'depositsState',
            });
        }
    },
});

export const {
    setLastDeposit, 
    setLastOperation, 
    setDefaultOperation,
    setDefaultDeposit, 
    addDeposit, 
    setCurrentOperation,
    setCurrentDeposit,
    removeDeposit,
    clearData,
    increaseDeposit, decreaseDeposit} = walletSlice.actions;
export default walletSlice.reducer; 