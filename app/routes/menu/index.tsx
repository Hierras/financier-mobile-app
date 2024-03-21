import {  useEffect, useRef } from "react";
import { View, Text, FlatList, Animated, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { colors } from "../../colors";
import { FontAwesomeIcon, Props } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { openMenu, setStoragedConfig } from "../../redux/configureSlice";

import { Currency } from "../../Types/Currencies";
import { Link } from "expo-router";
import { getDepoistStorage, getProfit } from "../../redux/walletSlice";

export default function Menu() {
    const isOpen = useSelector((state: RootState) => state.appSlice.isMenuOpen);
    const total = useSelector((state: RootState)=>state.walletSlice.total.count);
    const profit = useSelector((state: RootState)=>state.walletSlice.profit);
    const defaultCurrency = useSelector((state:RootState)=>state.appSlice.defaultCurrency);

    const dispatch = useDispatch<AppDispatch>();

    const flowAnim = useRef(new Animated.Value(-1000)).current;


    if (isOpen) {
        Animated.timing(flowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
        }).start();
    }
    else{
        Animated.timing(flowAnim, {
            toValue: -1000,
            duration: 1500,
            useNativeDriver: true,
          }).start();
    }

    const data = useSelector((state:RootState)=>state.appSlice.data.menu);
    return (
        <Animated.View style={
            [styles.menuContainer, {transform: [{ translateX: flowAnim }]}]
            }>
            <View >
                <View><Text style={styles.title}>{data.title}</Text></View>
                <View style={styles.resultBlock}>
                    <View>
                        <Text style={styles.resultLineText}>
                            {data.money}
                            <Text>{total.toFixed(2)} {Currency[defaultCurrency as keyof typeof Currency]}</Text>
                        </Text>
                    </View>
                    <View style={styles.resultLine}>
                        <Text style={styles.resultLineText}>
                            {data.profit}
                            <Text style={
                                (profit.count > 0) ? styles.resultLineSpecTextGreen :
                                    styles.resultLineSpecTextRed
                            }>
                                {profit.count.toFixed(2)} {Currency[defaultCurrency as keyof typeof Currency]}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.navbar}>
                    <FlatList
                        data={data.navs}
                        renderItem={({item}) => {
                            return <Link onPress={()=>dispatch(openMenu())} style={styles.navbarElem} href={item.link}>{item.text}</Link>
                        }}
                    />
                </View>
            </View>
            <Pressable onPress={()=>dispatch(openMenu())}>
                <FontAwesomeIcon {...IconProps}/>
            </Pressable>
            
        </Animated.View>
    );
  }

const styles = StyleSheet.create({
    menuContainer: {
        position: 'absolute',
        height: '100%',
        paddingLeft: 24,
        paddingRight: 24,
        paddingTop: 50,
        width: '90.63%',
        backgroundColor: colors.main,
        zIndex: 999,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row',  
    },
    titleBlock: {

    },
    title: {
        fontSize: 36,
        fontFamily: 'Lobster',
        color: colors.white
    },
    resultBlock: {
        marginTop: 20
    },
    resultLine: {
        marginTop: 5
    },
    resultLineText: {
        fontFamily: 'Cuprum',
        color: colors.white,
        fontSize: 18
    },
    resultLineSpecTextGreen: {
        color: colors.green
    },
    resultLineSpecTextRed: {
        color: colors.red
    },
    navbar: {
    },
    navbarElem: {
        color: colors.white,
        fontFamily: 'Roboto',
        fontSize: 18,
        marginTop: 30
    }
});

const IconProps: Props = {
    icon: faTimes,
    color: colors.white,
    size: 24
}