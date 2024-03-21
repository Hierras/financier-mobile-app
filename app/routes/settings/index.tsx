import { Text, View, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Currency } from "../../Types/Currencies";
import { colors } from "../../colors";
import { ddlStyles } from "../../func";
import DropDownPicker from "react-native-dropdown-picker";
import { setCurrency, setLang } from "../../redux/configureSlice";
import { clearData, getTotal } from "../../redux/walletSlice";

export default function Settings() {
    // Выбор валют
    const defaultCurrency = useSelector((state:RootState)=>state.appSlice.defaultCurrency);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(defaultCurrency);
    const itemsList = Object.keys(Currency).map((key, i)=>{
        return {
            value: key,
            label: `${key}, ${Currency[key as keyof typeof Currency]}`
        }
    });
    const [items, setItems] = useState(itemsList);
    // Выбор языка
    const lang = useSelector((state: RootState)=>state.appSlice.language);
    const [openLang, setOpenLang] = useState(false);
    const [valueLang, setValueLang] = useState(lang);
    const [itemsLang, setItemsLang] = useState(
        (lang === 'eng') ?
            [
                {value: 'ru',label: `Russian`},
                {value: 'eng',label: `English`},
            ]
            :
            [
                {value: 'ru',label: `Русский`},
                {value: 'eng',label: `Английский`},
            ]
    );

    const dispatch = useDispatch<AppDispatch>();
    const data = useSelector((state: RootState)=>state.appSlice.data);
    useEffect(()=>{
        dispatch(setCurrency(value));
        dispatch(getTotal(defaultCurrency));
    }, [value]);
    useEffect(()=>{
        dispatch(setLang(valueLang));
        setItemsLang(
            (valueLang === 'eng') ?
            [
                {value: 'ru',label: `Russian`},
                {value: 'eng',label: `English`},
            ]
            :
            [
                {value: 'ru',label: `Русский`},
                {value: 'eng',label: `Английский`},
            ] 
        )
    }, [valueLang]);
    return (
        <View style={style.wrapper}>
            <View style={style.configContainer}>
                <View style={style.langContainer}>
                    <Text style={style.langLabel}>{data.setting.labelLang}</Text>
                    <View style={style.langDDList}>
                        <DropDownPicker 
                            open={openLang}
                            value={valueLang}
                            items={itemsLang}
                            setOpen={setOpenLang}
                            setValue={setValueLang}
                            setItems={setItemsLang}
                            textStyle={ddlStyles.textStyle}
                            style={[ddlStyles.style, {zIndex: 100}]}
                            dropDownContainerStyle={[ddlStyles.dropDownContainerStyle, {zIndex: 100}]}
                            listItemLabelStyle={ddlStyles.listItemLabelStyle}
                            showTickIcon={false}
                            arrowIconStyle={ddlStyles.arrowIconStyle}
                        />
                    </View>
                </View>    
                <View style={style.currencyContainer}>
                    <Text style={style.currencyLabel}>{data.setting.labelCurrency}</Text>
                    <View style={style.currencyDDList}>
                        <DropDownPicker 
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            textStyle={ddlStyles.textStyle}
                            style={ddlStyles.style}
                            dropDownContainerStyle={ddlStyles.dropDownContainerStyle}
                            listItemLabelStyle={ddlStyles.listItemLabelStyle}
                            showTickIcon={false}
                            arrowIconStyle={ddlStyles.arrowIconStyle}
                        />
                    </View>
                </View>
            </View>
            <View style={style.clearContainer}>
                <Pressable style={style.buttonContainer} onPress={()=>dispatch(clearData())}>
                    <Text style={style.buttonText}>{data.setting.button}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    wrapper: {
        width: '80%',
        display: 'flex',
        alignSelf: 'center',
        marginTop: 30
    },
    configContainer: {
    },
    langContainer: {
    },
    langLabel: {
        fontFamily: 'Cuprum',
        fontSize: 16
    },
    langDDList: {
        
    },
    currencyContainer: {
        marginTop: 30
    },
    currencyLabel: {
        fontFamily: 'Cuprum',
        fontSize: 16
    },
    currencyDDList: {
    },
    clearContainer: {
        marginTop: 50
    },
    buttonContainer: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: 20,
        borderWidth: 2,
        borderColor: colors.red,
        width: 200,
        backgroundColor: colors.red,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 5,
        
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.white,
        fontFamily: 'Cuprum',
    }
});