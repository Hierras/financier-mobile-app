import { createNumberMask } from "react-native-mask-input";
import { countCurrency, getDefaultValue } from "./componetns/axios/getCurrencies";
import { store } from "./redux/store";
import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const moneyMask = createNumberMask({
    delimiter: '',
    separator: '.',
    precision: 2,
});

export const ddlStyles = StyleSheet.create({
    textStyle:{fontFamily: "Roboto", fontSize: 16, color: colors.main},
    style:{
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: colors.main,
        zIndex: 99,
    },
    dropDownContainerStyle: {
        backgroundColor: colors.white,
        borderWidth: 0,
        borderTopWidth: 2,
        borderColor: colors.main,
        zIndex: 99,
    },
    listItemLabelStyle: {
        color: colors.main,
        zIndex: 99
    },
    arrowIconStyle: {
        borderColor: colors.main
    }
});
// async function totalCalcule(sum: number, currency: string) {
    
    
//     return countCurrency(
//         rates[store.getState().appSlice.defaultCurrency as keyof typeof rates], 
//         rates[currency as keyof typeof rates],
//         sum
//     )
//   }

// async function getTotal() {
//     let total = 0;
//     const deposits = store.getState().walletSlice.deposits;
//     for (let key in deposits) {
//       total += await totalCalcule(
//         deposits[key].total,
//         deposits[key].currency
//       );
//     }
//   }