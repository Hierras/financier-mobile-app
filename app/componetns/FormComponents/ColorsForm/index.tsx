import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { chooseColors, colors } from "../../../colors";
import { useDispatch, useSelector } from "react-redux";
import { Deposit, Operation, setCurrentDeposit, setCurrentOperation } from "../../../redux/walletSlice";
import { RootState } from "../../../redux/store";
import { containerStyles } from "../сontainer";

export default function ColorsForm(props: {type:string}) {
    const dispatch = useDispatch();

    let currentActionObj: Deposit | Operation;
    let setParamFunc: Function;
    switch (props.type) {
        case 'operation': {
            currentActionObj = useSelector((state:RootState)=>state.walletSlice.currentOperation);
            setParamFunc = setCurrentOperation;
            break;
        }
        default: {
            currentActionObj = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
            setParamFunc = setCurrentDeposit;
        }
    }
    const allColors = chooseColors;
    const content = [];
    for (let key in allColors) {
        const defaultStyles: StyleProp<ViewStyle> = {
            width: 24,
            height: 24,
            backgroundColor: allColors[key as keyof typeof allColors],
            borderRadius: 24
        };
        let styles = [defaultStyles];
        if (allColors[key as keyof typeof allColors] === currentActionObj.color) {
            styles = [{
                transform: [{scale: 1.2}],
            }, ...styles];
        }
        content.push(
            <View key={key}><Pressable 
                
                style={styles}
                onPress={()=>dispatch(setParamFunc({key: 'color', value: allColors[key as keyof typeof allColors]}))}
            >
            </Pressable></View>
        );
    }
    return (
        <View style={[containerStyles, {
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 20,
            paddingBottom: 20,
        }]}>
            {content}
        </View>
    )
}