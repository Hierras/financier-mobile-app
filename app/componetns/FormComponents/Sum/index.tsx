import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { Operation, Deposit, setCurrentDeposit, setCurrentOperation } from "../../../redux/walletSlice";
import { colors } from "../../../colors";
import DropDownPicker from "react-native-dropdown-picker";
import { useEffect, useState } from "react";
import { Currency } from "../../../Types/Currencies";
import { ddlStyles, moneyMask } from "../../../func";
import MaskInput from "react-native-mask-input";
import { containerStyles } from "../сontainer";
export default function SumForm(props: {type:string}) {
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
    
    const data = useSelector((state:RootState)=>state.appSlice.data.form.sum);

    const dispatch = useDispatch();

    let currentActionObj: Deposit | Operation;
    let setParamFunc: Function;
    switch (props.type) {
        case 'operation': {
            currentActionObj = useSelector((state:RootState)=>state.walletSlice.currentOperation);
            setParamFunc = setCurrentOperation;
            break;
        }
        default: {
            currentActionObj = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
            setParamFunc = setCurrentDeposit;
        }
    }
    const [numString, setNumString] = useState(String(currentActionObj.total.toFixed(2)));
    function numericHandler(masked:string) {
        let newNumb = parseFloat(masked);
        if (isNaN(newNumb)) {
            setNumString('0.00');
            newNumb = parseFloat(numString);
        }
        else 
            setNumString(masked);
        
        dispatch(setParamFunc({key: 'total', value: newNumb}));
    }
    useEffect(()=>{
        dispatch(setParamFunc({key: 'currency', value}));
    }, [value])
    useEffect(()=>{
        setValue(defaultCurrency);
    }, [defaultCurrency])
    return (
        <View style={[containerStyles, {zIndex:99}]}>
            <Text style={style.text}>Сумма</Text>
            <View style={style.container}>
                
                    <MaskInput
                        style={[style.input, (props.type === 'operation') ? {width: '100%'} : null]}
                        placeholder={data.placeholderTotal}
                        onChangeText={(masked)=>numericHandler(masked)}
                        placeholderTextColor={colors.grey}
                        value={numString}
                        keyboardType="numeric"
                        mask={moneyMask}
                    />
                
                {
                    (props.type !== 'operation') ? 
                        <View style={{width: '40%'}}>
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
                                placeholder={data.placeholder}
                                />
                        </View>
                        :
                        null
                }
                
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
    },
    text: {
        fontFamily: 'Cuprum'
    },
    input: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderRadius: 0,
        borderColor: colors.main,
        zIndex: 99,
        textAlign:'right',
        fontSize: 16,
        width: '55%',
        fontFamily: 'Cuprum'
    }

});