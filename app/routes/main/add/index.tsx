import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentOperation } from "../../../redux/walletSlice";
import { useEffect } from "react";
import { ColorsForm, IconsForm, SumForm, TitleForm } from "../../../componetns/FormComponents";
import { RootState } from "../../../redux/store";

export default function DepositAdd() {
    const curOperation = useSelector((state:RootState)=>state.walletSlice.currentOperation);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const loc = useLocalSearchParams();
    useEffect(()=>{
        const unsubscribe = navigation.addListener('beforeRemove', () => {
            dispatch(setCurrentOperation({key:'full', value:''}));
        });
      
        return unsubscribe;
    },[navigation]);
    useEffect(()=>{
        for (let i in loc) {
            dispatch(setCurrentOperation({key: i, value: loc[i]}));
        }
    },[]);
    return (
        <View style={{alignItems:'center'}}>
            <TitleForm type="operation"/>
            <SumForm type="operation"/>
            <ColorsForm type="operation"/>
            <IconsForm type="operation"/>
        </View>
    )
};