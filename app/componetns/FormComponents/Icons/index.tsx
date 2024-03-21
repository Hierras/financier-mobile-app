import { View, Text, TextInput, StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

import { Operation, Deposit, setCurrentDeposit, setCurrentOperation } from "../../../redux/walletSlice";
import { colors } from "../../../colors";
import { containerStyles } from "../сontainer";
import { Icons, IconsEnum } from "../../../Types/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";


export default function IconsForm(props: {type:string}) {
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
    
    const allIcons = Icons;
    const content = []; 
    for (let key in allIcons) {
        const defaultStyles: StyleProp<ViewStyle> = {
            width: 40,
            height: 40,
            borderColor: currentActionObj.color,
            borderWidth: 3,
            borderRadius: 40,
            alignItems: 'center',
            
            justifyContent: 'center',
        };
        let styles = [defaultStyles];
        if (allIcons[key as unknown as IconsEnum] === currentActionObj.icon) {
            styles = [{
                transform: [{scale: 1.2}],
            }, ...styles];
        }
        content.push(
            <Pressable 
                key={key}
                style={styles}
                onPress={()=>dispatch(setParamFunc({key: 'icon', value: allIcons[key as unknown as IconsEnum]}))}
            >
                <FontAwesomeIcon icon={allIcons[key as unknown as IconsEnum]} 
                    style={defaultStyles}
                    color={currentActionObj.color}
                    size={24}
                />
            </Pressable>
        );
    }

    return (
        <View style={[containerStyles, {
            display: 'flex',
            justifyContent: 'space-between',
            alignContent: 'space-between',
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: 250,
            paddingTop: 20,
            paddingBottom: 20
        }]}>
            {content}
        </View>
    )
}