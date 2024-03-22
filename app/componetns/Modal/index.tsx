import { ReactComponentElement } from "react";
import { View, Text } from "react-native"
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ListModal from "./ListModal";
import Warning from "./Warning";
export function Modal() {
    let content;
    const modal = useSelector((state: RootState)=>state.appSlice.modal);
    switch (modal){
        case 'lm': {
            content = <ListModal/>
            break;
        }
        case 'w': {
            content = <Warning/>
            break;
        }
        default: {
            content = <View></View>
        }
    }
    return (
        <>{content}</>
        
    )
}