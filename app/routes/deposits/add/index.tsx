import { useNavigation } from "expo-router";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { setCurrentDeposit, setDefaultDeposit } from "../../../redux/walletSlice";
import { useEffect } from "react";
import { ColorsForm, IconsForm, SumForm, TitleForm } from "../../../componetns/FormComponents";

export default function DepositAdd() {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    useEffect(()=>{
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(setCurrentDeposit({key:'full', value:''}));
        });
      
        return unsubscribe;
    },[navigation])
    useEffect(()=>{
        dispatch(setDefaultDeposit());
    }, [])
    return (
        <View style={{alignItems:'center'}}>
            <TitleForm type="deposit"/>
            <SumForm type="deposit"/>
            <ColorsForm type="deposit"/>
            <IconsForm type="deposit"/>
        </View>
    )
};