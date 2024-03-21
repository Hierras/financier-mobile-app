import { View, Text, StyleSheet, Button, Pressable } from "react-native";
import { colors } from "../../../colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import DropDownPicker from "react-native-dropdown-picker";
import { Currency } from "../../../Types/Currencies";
import { useState } from "react";
import { setCurrency } from "../../../redux/configureSlice";


export default function SelectCurrency() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);

    const itemsList = Object.keys(Currency).map((key, i)=>{
        return {
            value: key,
            label: `${key}, ${Currency[key]}`
        }
    });
    const [items, setItems] = useState(itemsList);
    

    const data = useSelector((state:RootState)=>state.appSlice.data.welcome);
    const dispatch = useDispatch();
    return (
        <View style={style.container}>
            <Text style={style.text}>{data.text}</Text>
            <View style={style.dropdownContainer}>
                <DropDownPicker 
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    textStyle={{fontFamily: "Roboto", fontSize: 20, color: colors.white}}
                    style={
                        {
                            borderWidth: 0,
                            backgroundColor: 'transparent',
                            borderBottomWidth: 2,
                            borderRadius: 0,
                            width: "50%",
                            borderColor: colors.green,
                        }
                    }
                    dropDownContainerStyle={{
                        width: "50%",
                        backgroundColor: colors.main,
                        borderWidth: 0,
                        borderTopWidth: 2,
                        borderColor: colors.green,
                        
                    }}
                    listItemLabelStyle={{
                        color: colors.white
                    }}
                    showTickIcon={false}
                    arrowIconStyle={{
                        borderColor: colors.white
                    }}
                    placeholder={data.placeholder}
                />
            </View>
            <Pressable
                style={style.buttonContainer} 
                onPress={()=>dispatch(setCurrency(value))}
            >
                <Text style={style.buttonText}>{data.button}</Text>
            </Pressable>
           
        </View>
    )
};

const style = StyleSheet.create({
    container: {
        height: '100%',
        width: "80%",
        marginTop: '50%',
        display: 'flex',
        alignSelf: 'center'
    },
    dropdownContainer: {
        alignSelf: 'center'
    },
    text: {
        color: colors.white,
        fontFamily: 'Cuprum',
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 25
    },
    buttonContainer: {
        alignSelf: 'center',
        marginTop: 40,
        color: colors.white,
        fontSize: 20,
        borderWidth: 2,
        borderColor: colors.green,
        width: 200,
        backgroundColor: colors.green,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 5,
        
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.white,
        fontFamily: 'Cuprum',
        textTransform: 'uppercase'
    }
});