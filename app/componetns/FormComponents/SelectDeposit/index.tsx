import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { colors } from "../../../colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { setModal } from "../../../redux/configureSlice";

export default function SelectDeposit() {
    const curDeposit = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
    const data = useSelector((state:RootState)=>state.appSlice.data.main);
    const dispatch = useDispatch();
    return (
        <View>
            <View style={ddlStyles.wrapper}>
                <Text style={ddlStyles.label}>{data.selectDeposit.label}</Text>
                <Pressable onPress={()=>dispatch(setModal('lm'))} style={ddlStyles.style}>
                    <View><Text style={ddlStyles.textStyle}>{curDeposit.title}</Text></View>
                    <View style={ddlStyles.arrowIconStyle}><FontAwesomeIcon color={colors.main} size={16} icon={faAngleDown}/></View>
                </Pressable>
            </View>
        </View>
        
    )
}
const ddlStyles = StyleSheet.create({
    wrapper: {
        width: '90%',
        height: 'auto',
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 50,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        elevation: 4, // Для Android
        marginTop: 20,
        alignSelf: 'center',
        zIndex: 99,

    },
    textStyle:{fontFamily: "Raleway", fontSize: 14, color: colors.textgrey, margin: 0, padding: 0},
    style:{
        borderWidth: 1,
        backgroundColor: 'transparent',
        borderRadius: 10,
        borderColor: colors.main,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dropDownContainerStyle: {
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.main,
        padding: 0
    },
    listItemLabelStyle: {
        color: colors.main,
    },
    arrowIconStyle: {
        marginLeft: 'auto',
        marginRight: 10,
    },
    label: {
        color: colors.main,
        fontFamily: 'Cuprum',
        fontSize: 14
    }
});