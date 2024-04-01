import { StyleSheet, Text, View } from "react-native"
import { Circle, Svg } from "react-native-svg";
import { colors } from "../../../colors";
import { Operation } from "../../../redux/walletSlice";
import { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Currency } from "../../../Types/Currencies";

export default function Ring(props: {data:Operation[]}) {
    const deposit = useSelector((state:RootState)=>state.walletSlice.currentDeposit);
    const radius = 110;
    const strokeWidth = 20;
    
    // const [hintCircle, setHintCircle] = useState<ReactElement | null>(null);
    const [dinamicCircles, setDinamicCircles] = useState<ReactElement[] | ReactElement>(
        <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            stroke={colors.grey}
            strokeWidth={strokeWidth}
            fill="none"
        />
    );
    

    // function getHint(id: number) {
    //     console.log(id);
    // }

    useEffect(()=>{
        if (props.data.length) {
            const total = props.data.reduce((acc, c)=>acc+c.total,0);
            const l = 2*Math.PI*radius;
            let startOffset = 0;
            const circles = props.data.map((el)=>{
                const segmentPercentage = el.total/total * 100;
                const length = segmentPercentage/100*l;
               
                const dashArray = `${length} ${l}`;
                const dashOffset = `${startOffset}`;
        
                startOffset -= length;
                return (
                    <Circle
                        cx={radius}
                        cy={radius}
                        r={radius - strokeWidth / 2}
                        stroke={el.color}
                        strokeWidth={strokeWidth}
                        fill="none"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                        key={el.id}
                    />
                )
            })
            setDinamicCircles(circles);
        }
        else {
            setDinamicCircles(
                <Circle
                    cx={radius}
                    cy={radius}
                    r={radius - strokeWidth / 2}
                    stroke={colors.grey}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
            );
        }
        
    }, [props.data])
    return (
        <Svg height={2 * radius} width={2 * radius} style={style.ring}>
            {dinamicCircles}
            <View style={style.container}>
                <Text style={style.text}>Итого</Text>
                <Text style={style.total}>{`${deposit.total} ${Currency[deposit.currency as keyof typeof Currency]}`}</Text>
                <Text style={[style.profit, (deposit.profit > 0) ? {color: colors.green} : {color:colors.red}]}>
                    {
                        (deposit.profit > 0) ? '+'+deposit.profit+' ' : deposit.profit + ' '
                    }
                    {Currency[deposit.currency as keyof typeof Currency]}
                </Text>
            </View>
        </Svg>
    )
}
const style = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Cuprum',
        fontSize: 18,
        color: colors.textgrey
    },
    total: {
        fontFamily: 'Cuprum',
        fontSize: 16,
        color: colors.grey
    },
    profit: {
        fontFamily: 'Cuprum',
        fontSize: 16,
    },
    ring: {
        alignSelf: 'center'
    }
});