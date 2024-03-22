import {Text, Pressable, ViewStyle, TextStyle} from 'react-native';

export default function Button(props: {text: string, action: Function, style: {buttonContainer: ViewStyle, buttonText: TextStyle}}) {

    return (
        <Pressable style={props.style.buttonContainer} onPress={()=>props.action()}>
            <Text style={props.style.buttonText}>{props.text}</Text>
        </Pressable> 
    )
}