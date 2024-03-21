import { useState } from "react";
import { View, StyleSheet, Text } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { colors } from "../../../colors";

export default function SelectDeposit() {
    const deposits = useSelector((state:RootState)=>state.walletSlice.deposits);
    const curDeposit = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(curDeposit.id);

    const itemsList = deposits.map((deposit, i)=>{
        return {
            value: deposit.id,
            label: deposit.title
        }
    });
    const [items, setItems] = useState(itemsList);
    
    const data = useSelector((state:RootState)=>state.appSlice.data.main);

    const dispatch = useDispatch();
    return (
        <View>
            <Text>{data.selectDeposit.label}</Text>
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
    )
}
const ddlStyles = StyleSheet.create({
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