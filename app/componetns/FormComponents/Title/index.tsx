import { View, Text, TextInput, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { Operation, Deposit, setCurrentDeposit, setCurrentOperation } from "../../../redux/walletSlice";
import { colors } from "../../../colors";
import { containerStyles } from "../сontainer";
import { useEffect } from "react";

export default function TitleForm(props: {type:string}) {
    const data = useSelector((state:RootState)=>state.appSlice.data.form.title);

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
    return (
        <View style={containerStyles}>
            <Text style={style.text}>{data.label}</Text>
            <TextInput
                style={style.input}
                placeholder={data.placeholder}
                onChangeText={(text)=>dispatch(setParamFunc({key: 'title', value:text}))}
                placeholderTextColor={colors.grey}
                value={currentActionObj.title}
           />
        </View>
    )
}

const style = StyleSheet.create({
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
        fontSize: 16,
        width: '100%',
        fontFamily: 'Cuprum'
    }

});