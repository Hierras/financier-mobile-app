import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../colors";
import SelectLang from "./select-lang";
import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import SelectCurrency from "./select-currency";
import { setStoragedConfig } from "../../redux/configureSlice";
import { getDepoistStorage, getProfit, getTotal } from "../../redux/walletSlice";

export default function WelcomeLayout() {
    
    const deposits = useSelector((state:RootState)=> state.walletSlice.deposits);
    const lang = useSelector((state: RootState)=> state.appSlice.language);
    const currency = useSelector((state: RootState)=> state.appSlice.defaultCurrency);
    let content: ReactElement;
    if (lang !== null) content = <SelectCurrency/>;
    else content = <SelectLang/>;
    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(setStoragedConfig());
        dispatch(getDepoistStorage()); 
    },[])
    return (
        <>
        {
            (lang !== null && currency !== null) ? <></>
            : 
            <View style={style.wrapper}>
                {content}     
            </View>
        }
        </>
        
        
    )
};

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.main   
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center'
    },
    button: {

    },
    flag: {
        textAlign: 'center',
        fontSize: 28
    },
    text: {
        color: colors.white,
        fontFamily: 'Cuprum',
        textAlign: 'center',
        fontSize: 28
    }
});