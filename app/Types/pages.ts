import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { Buttons } from "./buttons";

enum PageEnum {
    Main = "Main",
    MainAdd = "MainAdd",
    Deposit = "Deposit",
    DepositAdd = "DepositAdd",
    Settings = "Settings"
};

export interface PageIntf {
    url: string,
    back: string,
    title: any,
    param: boolean,
    buttons: {icon: IconDefinition, action: string}[]
};


const pagesList: PageIntf[] = [
    {
        url: '/',
        back: '/',
        title: {
            ru: "Общий баланс",
            eng: "Total balance"
        },
        param: true,
        buttons: []
    },
    {
        url: '/routes/main/add',
        back: '/',
        title: {
            ru: ["Новый доход", "Новый расход"],
            eng: ["New income", "New cost"]
        },

        param: false,
        buttons: [Buttons.Accept, Buttons.Back]
    },
    {
        url: '/routes/deposits/',
        back: '/',
        title: {
            ru: "Счета",
            eng: "Deposits"
        },
        param: false,
        buttons: [Buttons.Add, Buttons.Back]
    },
    {
        url: '/routes/deposits/add',
        back: '/routes/deposits/',
        title: {
            ru: "Новый счёт",
            eng: "New deposit"
        },
        param: false,
        buttons: [Buttons.Accept, Buttons.Back]
    },
    {
        url: '/routes/settings',
        back: '/',
        title: {
            ru: 'Найстройки',
            eng: 'Settings',
        },
        param: false,
        buttons: []
    }
]

export const Pages: {[key in PageEnum]: PageIntf} = {
    [PageEnum.Main]: pagesList[0],
    [PageEnum.MainAdd]: pagesList[1],
    [PageEnum.Deposit]: pagesList[2],
    [PageEnum.DepositAdd]: pagesList[3],
    [PageEnum.Settings]: pagesList[4]
    
};