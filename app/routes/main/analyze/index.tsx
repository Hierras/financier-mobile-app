import { Text, View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Operation } from "../../../redux/walletSlice";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { colors } from "../../../colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getDateString } from "../../../func";
import { Currency } from "../../../Types/Currencies";

export function Analyze(props:{data:Operation[]}) {
    const [content, setContent] = useState<React.JSX.Element[] | null>(null);
    const curDeposit = useSelector((state:RootState)=>state.walletSlice.currentDeposit);

    const styles = StyleSheet.create({
        wrapper: {
            width: '100%',
            height: 'auto',
            paddingTop: 5,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: 25,
            backgroundColor: colors.white,
            marginTop: 20,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'row',
    
        },
        container: {
            width: '90%',
            height: 'auto',
            paddingTop: 15,
            paddingBottom: 20,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 25,
            backgroundColor: curDeposit.color,
            shadowColor: colors.black,
            shadowOpacity: 0.25,
            shadowRadius: 4,
            shadowOffset: {width: 0, height: 4},
            elevation: 4, // Для Android
            alignSelf: 'center',
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
            color: colors.black
        },
        closeButton: {
            marginLeft: 'auto', // Перемещает кнопку вправо
            zIndex: 100
    
        },
        profit: {
            fontFamily: 'Cuprum',
            fontSize: 16,
            marginLeft: 10
        },
        date: {
            color: colors.black,
            fontSize: 16,
            fontFamily: 'Cuprum',
            textAlign: 'center'
        }
    });


    useEffect(()=>{
        let sortedData = [...props.data];
        // Сортировка по дате
        for (let i = 0; i < sortedData.length; i++) {
            for (let j = 1; j < sortedData.length; j++) {
                if (Date.parse(sortedData[i].date) < Date.parse(sortedData[j].date)) {
                    let temp = {...sortedData[i]};
                    sortedData[i] = {...sortedData[j]};
                    sortedData[j] = {...temp};
                }
            }
        }
        // Заполнение элементов
        if (!sortedData.length) return;

        const date = new Date(sortedData[0].date);
        let curDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let dataPerDate = [<Text key={getDateString(curDate)} style={styles.date}>{getDateString(curDate)}</Text>];

        for (let key in sortedData) {

            const defaultStyles: StyleProp<ViewStyle> = {
                width: 40,
                height: 40,
                borderColor: sortedData[key].color,
                borderWidth: 3,
                borderRadius: 40,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignSelf: 'center'
            };

            const vDate = new Date(sortedData[key].date);
            const vCurDate = new Date(vDate.getFullYear(), vDate.getMonth(), vDate.getDate());
            if (vCurDate.getTime() !== curDate.getTime()) {
                curDate = new Date(vCurDate.getFullYear(), vCurDate.getMonth(), vCurDate.getDate());
                dataPerDate.push(<Text key={getDateString(curDate)} style={styles.date}>{getDateString(curDate)}</Text>);
            }
            dataPerDate.push(<View key={sortedData[key].id} style={styles.wrapper}>
                <View style={defaultStyles}>
                    <FontAwesomeIcon color={sortedData[key].color} size={16} icon={sortedData[key].icon}/>        
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>{sortedData[key].title}</Text>
                    <View style={styles.textContainer}>
                        <Text style={styles.countText}>
                            {`${sortedData[key].total.toFixed(2)} ${Currency[curDeposit.currency as keyof typeof Currency]}`}  
                        </Text>
                    </View> 
                </View>
            </View>);
        }
        setContent(dataPerDate);
    },[props.data]);
    return (
        <View style={styles.container}>
            {content}
        </View>
    )
}


