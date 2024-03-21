import { faCheckCircle,  faArrowAltCircleLeft, faPlusCircle, IconDefinition} from "@fortawesome/free-solid-svg-icons";

enum ButtonsEnum {
    Add = "Add",
    Back = "Back",
    Accept = "Accept",
};

export const Buttons: { [key in ButtonsEnum]: {icon: IconDefinition, action: string} } = {
    [ButtonsEnum.Add]: {icon: faPlusCircle, action: 'add'},
    [ButtonsEnum.Back]: {icon: faArrowAltCircleLeft, action: 'back'},
    [ButtonsEnum.Accept]: {icon: faCheckCircle, action: 'accept'}
};