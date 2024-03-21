import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../../../colors";
import { useDispatch } from "react-redux";
import { setLang } from "../../../redux/configureSlice";


export default function SelectLang() {

    const dispatch = useDispatch();

    return (
            <View style={style.container}>
                <Pressable style={style.button} onPress={()=>dispatch(setLang('ru'))}>
                    <Text style={style.flag}>🇷🇺</Text>
                    <Text style={style.text}>Russian</Text>
                </Pressable>
                <Pressable  style={style.button} onPress={()=>dispatch(setLang('eng'))}>
                    <Text style={style.flag}>🇺🇸</Text>
                    <Text style={style.text}>English</Text>
                </Pressable>
            </View>
    )
};

const style = StyleSheet.create({
    wrapper: {
        width: '100%',
        height: '100%',
        backgroundColor: colors.main   
    },
    container: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center'
    },
    button: {

    },
    flag: {
        textAlign: 'center',
        fontSize: 28
    },
    text: {
        color: colors.white,
        fontFamily: 'Cuprum',
        textAlign: 'center',
        fontSize: 28
    }
});