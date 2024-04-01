import { View, Text, Pressable, StyleSheet, ViewStyle, StyleProp, ScrollView } from "react-native";
import { Link } from "expo-router";
import { colors } from "../../colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import SelectDeposit from "../../componetns/FormComponents/SelectDeposit";
import Ring from "../../componetns/charts/Ring";
import Button from "../../componetns/Button";
import { changeCurMove } from "../../redux/configureSlice";
import { Analyze } from "./analyze";

export default function Main() {
    const dispatch = useDispatch();

    const operationType = useSelector((state:RootState)=>state.appSlice.curMove);
    const operation = useSelector((state:RootState) => 
        (operationType === 'curDepInc') ? state.walletSlice.currentDeposit.increases : state.walletSlice.currentDeposit.decreases);
        
    function changeTypeHandler() {
        dispatch(changeCurMove());
    }
    const noButtonStyle: StyleProp<ViewStyle> = {
        borderColor: colors.red,
        backgroundColor: colors.red,
    };
    const yesButtonStyle: StyleProp<ViewStyle> = {
        borderColor: colors.green,
        backgroundColor: colors.green,
    };
    // Опредление стилей
    let leftStyle, rightStyle, leftText, rightText, link;
    let data = useSelector((state:RootState)=>state.appSlice.data.main.buttons);
    if (operationType === 'curDepInc'){
        leftStyle = {...style.buttonContainer, ...yesButtonStyle};
        rightStyle = {...style.buttonContainer, ...noButtonStyle};
        leftText = data.yes.left;
        rightText = data.yes.right; 
        link = `/routes/main/add?type=false`;
    }
    else {
        leftStyle = {...style.buttonContainer, ...noButtonStyle};
        rightStyle = {...style.buttonContainer, ...yesButtonStyle};
        leftText = data.no.left;
        rightText = data.no.right;
        link = `/routes/main/add?type=true`;
    }
    return (
        <ScrollView style={{marginBottom: 70}}>
            <View style={style.selectContainer}>
                <SelectDeposit/>
            </View>
            <View  style={style.ringContainer}>
                <Ring data={operation}/>
            </View>
            <View style={style.buttonWrapper}>
                <Link href={link} style={leftStyle}>
                    <Text style={style.buttonText}>{leftText}</Text>
                </Link>
                <Button
                    text={rightText}
                    style={{buttonContainer: rightStyle, buttonText: style.buttonText}}
                    action={()=>changeTypeHandler()}

                />
            </View>
            {
                (operation.length) ? <View style={style.analyzeContainer}><Analyze data={operation}/></View> : null
            }
        </ScrollView>
    )
};

const style = StyleSheet.create({
    buttonWrapper: {
        width: '90%',
        height: 'auto',
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 35,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        elevation: 4, // Для Android
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 15,
        marginBottom: 20
    },
    buttonContainer: {
        color: colors.white,
        fontSize: 20,
        borderWidth: 2,
        width: 140,
        textAlign: 'center',
        paddingBottom: 3,
        paddingTop: 3,
        borderRadius: 10,
        
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
        textAlign: 'center'
    },
    selectContainer: {
        marginTop: 15
    },
    analyzeContainer: {
        marginBottom: 20
    },
    ringContainer: {
        marginTop: 20
    }
})