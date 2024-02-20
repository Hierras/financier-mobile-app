import {  useRef } from "react";
import { View, Text, FlatList, Animated, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { colors } from "../colors";
import { FontAwesomeIcon, Props } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { openMenu } from "../redux/configureSlice";



export default function Menu() {
    const isOpen = useSelector((state: RootState) => state.appSlice.isMenuOpen);
    const dispatch = useDispatch();


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
    return (
        <Animated.View style={
            [styles.menuContainer, {transform: [{ translateX: flowAnim }]}]
            }>
            <View >
                <View><Text style={styles.title}>Финансист</Text></View>
                <View style={styles.resultBlock}>
                    <View>
                        <Text style={styles.resultLineText}>Средства: <Text>[Общие средства]₽</Text></Text>
                    </View>
                    <View style={styles.resultLine}>
                        <Text style={styles.resultLineText}>
                            Прибыль: <Text style={styles.resultLineSpecText}>[Прибыль]₽</Text>
                        </Text>
                    </View>
                </View>
                <View style={styles.navbar}>
                    <FlatList
                        data={[
                            {key: '📋 Главная', to: '/'},
                            {key: '💰 Счета'},
                            {key: '💼 Ценные бумаги'},
                            {key: '💸 Автоплатежи'},
                            {key: '📊 Отчёты (в разработке)'},
                            {key: '🔨 Настройки'},
                            {key: '📱 О нас'},
                        ]}
                        renderItem={({item}) => <Text style={styles.navbarElem}>{item.key}</Text>}
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
    resultLineSpecText: {
        color: colors.green
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