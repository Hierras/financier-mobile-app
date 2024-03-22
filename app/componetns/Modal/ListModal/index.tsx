import { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import { colors } from "../../../colors";
import { setModal } from "../../../redux/configureSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Deposit, setCurrentDeposit } from "../../../redux/walletSlice";
import { Currency } from "../../../Types/Currencies";


export default function ListModal() {
    const deposits = useSelector((state:RootState)=>state.walletSlice.deposits);
    const curDeposit = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
    const data = useSelector((state:RootState)=>state.appSlice.data.modal.depositList);

    const dispatch = useDispatch();
    function radioHandle(deposit:Deposit) {
        dispatch(setCurrentDeposit({key: 'all', value: deposit}))
        dispatch(setModal(null));
    }
    const list = deposits.map((el)=>{
        return <Pressable onPress={()=>radioHandle(el)} style={styles.listElem} key={el.id}>
                <View  style={styles.radio}>
                    <View style={(el.id === curDeposit.id) && styles.innerRadio}></View>
                </View>
                <Text style={styles.title}>{el.title}</Text>
                <Text style={styles.size}>{`${el.total}${Currency[el.currency as keyof typeof Currency]}`}</Text>
        </Pressable>
    });
    return (
        <View style={styles.back}>
                <View style={styles.containerHeader}>
                    <Text style={styles.label}>{data.title}</Text>
                    <Pressable style={{marginLeft: 0}} onPress={()=>dispatch(setModal(null))}><FontAwesomeIcon color={colors.red} size={28} icon={faTimes}/></Pressable>
                </View>
                {
                    (deposits.length) ? <ScrollView style={styles.list}>
                                            {list}
                                        </ScrollView>
                                    : null
                }  
        </View>
    )
}

const styles = StyleSheet.create({
    back: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.main,
        alignItems:'center'
       
    },
    containerHeader: {
        width: '80%',
        marginTop: '60%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    label: {
        fontFamily: 'Raleway',
        color: colors.white,
        fontSize: 20
    },
    list: {
        marginTop: 20,
        width: '80%'
    },
    listElem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center'
    },
    title: {
        flex: 4,
        textAlign: 'left',
        fontFamily: 'Raleway',
        color: colors.white,
        fontSize: 16,
        marginLeft: 20
    },
    size: {
        flex: 1,
        fontFamily: 'Cuprum',
        color: colors.white,
        fontSize: 16,
        textAlign: 'right',
        marginLeft: 0
    },
    radio: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: colors.white,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 0,
    },
    innerRadio: {
        width: 10,
        height: 10,
        backgroundColor: colors.white,
        borderRadius: 20
    }
});