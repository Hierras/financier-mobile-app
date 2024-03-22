import { View, Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { colors } from "../../colors";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SelectDeposit from "../../componetns/FormComponents/SelectDeposit";
import Button from "../../componetns/Button";

export default function Main() {
    const curDeposit = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
    return (
        <View>
            <View>
                <SelectDeposit/>
            </View>
            <View>
                <View><Text>Подсказка</Text></View>
                <View><Text>Кружок</Text></View>
            </View>
            <View>
                <Link href={`/routes/main/add?type=false`} style={[style.buttonContainer, style.buttonIncr]}>
                    <Text style={style.buttonText}>+</Text>
                </Link>
                <Link href={`/routes/main/add?type=true`} style={[style.buttonContainer, style.buttonDecr ]}>
                    <Text style={style.buttonText}>-</Text>
                </Link>
            </View>
            <View>
                <Text>Анализ счёта</Text>
            </View>
            
        </View>
    )
};

const style = StyleSheet.create({
    buttonContainer: {
        marginTop: 40,
        color: colors.white,
        fontSize: 20,
        borderWidth: 2,
        
        width: 200,
        textAlign: 'center',
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 5,
        
    },
    buttonDecr: {
        borderColor: colors.red,
        backgroundColor: colors.red,
    },
    buttonIncr: {
        borderColor: colors.green,
        backgroundColor: colors.green,
    },
    buttonText: {
        fontSize: 20, 
        color: colors.white,
        fontFamily: 'Cuprum',
        textTransform: 'uppercase'
    }
})