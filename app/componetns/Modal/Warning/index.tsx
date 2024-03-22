import { View, Text, StyleSheet, Pressable } from "react-native"
import { colors } from "../../../colors";
import { setModal } from "../../../redux/configureSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Button";
import { clearData } from "../../../redux/walletSlice";



export default function Warning() {

    const data = useSelector((state:RootState)=>state.appSlice.data.modal.warning);

    const dispatch = useDispatch();

    function yesHandler() {
        dispatch(clearData());
        dispatch(setModal(null));
    }
    return (
        <View style={styles.back}>
                <View style={styles.containerHeader}>
                    <Text style={styles.label}>{data.title}</Text>
                    <Pressable style={{marginLeft: 0}} onPress={()=>dispatch(setModal(null))}><FontAwesomeIcon color={colors.red} size={28} icon={faTimes}/></Pressable>
                </View>
                <Button
                    text={data.button}
                    action={()=>yesHandler()}
                    style={{buttonContainer: styles.buttonContainer, buttonText: styles.buttonText}}
                />
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
    buttonContainer: {
        alignSelf: 'center',
        color: colors.white,
        fontSize: 20,
        borderWidth: 2,
        width: 200,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 5,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        elevation: 4, // Для Android
        borderColor: colors.red,
        backgroundColor: colors.red,
        marginTop: 50
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: colors.white,
        fontFamily: 'Cuprum',
    }

});