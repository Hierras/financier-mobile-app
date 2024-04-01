import { View, Text, Pressable, StyleSheet, StyleProp, ViewStyle} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Link } from "expo-router";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { removeDeposit, setCurrentDeposit } from "../../redux/walletSlice";
import { Currency } from "../../Types/Currencies";
import { colors } from "../../colors";
export default function DepositsList() {
    const deposits = useSelector((state:RootState)=>state.walletSlice.deposits);
    const data = useSelector((state:RootState)=>state.appSlice.data.deposits);
    const dispatch = useDispatch();

    const depositsList = deposits.map(el=>{
        const defaultStyles: StyleProp<ViewStyle> = {
            width: 40,
            height: 40,
            borderColor: el.color,
            borderWidth: 3,
            borderRadius: 40,
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center'
        };
        function depositOnClick(e:Event) {
            console.log(e.target);
        }
        return <Link 
                    key={el.id}
                    style={styles.wrapper}
                    href={`/routes/main/`} 
                    onPress={()=>dispatch(setCurrentDeposit({key:'all', value:el}))}
                >
                    <View style={styles.container}>
                        <View style={defaultStyles}>
                            <FontAwesomeIcon color={el.color} size={16} icon={el.icon}/>        
                        </View>
                        <View style={styles.infoContainer}>
                            <Text style={styles.title}>{el.title}</Text>
                            <View style={styles.textContainer}>
                                    <Text style={styles.labelText}>{`${data.size} `}</Text>
                                    <Text style={styles.countText}>{el.total.toFixed(2) + ' ' + Currency[el.currency as keyof typeof Currency]}</Text>
                                    {
                                        (el.profit !== 0 && el.profit !== undefined) ? 
                                            <Text style={[styles.profit, (el.profit > 0) ? {color: 'green'} : {color: 'red'}]}>
                                                {(el.profit > 0) ? '+' : ''}
                                                {el.profit.toFixed(2)}
                                            </Text>
                                        : null
                                    } 
                            </View> 
                        </View>
                        <Pressable onPress={() => dispatch(removeDeposit(el.id))} style={styles.closeButton}>
                            <FontAwesomeIcon color={colors.red} size={28} icon={faTimes}/>
                        </Pressable>
                    </View>
                </Link>
    });
    return (
        <View>
            {depositsList}        
        </View>
    )
}   

const styles = StyleSheet.create({
    wrapper: {
        width: '90%',
        height: 'auto',
        paddingTop: 5,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 25,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOpacity: 0.25,
        shadowRadius: 4,
        shadowOffset: {width: 0, height: 4},
        elevation: 4, // Для Android
        marginTop: 20,
        alignSelf: 'center',
        

    },
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    iconContainer: {
        backgroundColor: 'red'
    },
    title: {
        fontSize: 16,
        fontFamily: 'Raleway',
        
    },
    infoContainer: {
        marginLeft: 10,
        width: 240
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'space-between',
    },
    labelText: {
        fontFamily: 'Cuprum',
        fontSize: 16,
        color: colors.textgrey
    },
    countText: {
        fontFamily: 'Cuprum',
        fontSize: 16,
        color: colors.grey
    },
    closeButton: {
        marginLeft: 'auto', // Перемещает кнопку вправо
        zIndex: 100

    },
    profit: {
        fontFamily: 'Cuprum',
        fontSize: 16,
        marginLeft: 10
    }
});